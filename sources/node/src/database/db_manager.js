const Sequelize = require('sequelize');
const fs = require('fs');

const AdminModel = require(__dirname + '/admin')
const UserModel = require(__dirname + '/user')
const GroupModel = require(__dirname + '/group')
const SpamModel = require(__dirname + '/spam')
const ClearPeriodModel = require(__dirname + '/clear_period')
const ParentChildInGroupModel = require(__dirname + '/parent_child_in_group')

const dbDialect = 'sqlite'
const dbPath = __dirname + '/db/tgDB.sqlite'
const dbConfigFilePath = __dirname + '/db/db_config.json'
const dbConfig = getDatabaseConfig()

const sequelize = new Sequelize(
    dbConfig.dbName, dbConfig.username, dbConfig.password, {
        
        dialect: dbDialect,
        operatorsAliases: false,
        storage: dbPath
});

const Admin = AdminModel.createModel(sequelize, Sequelize)
const User = UserModel.createModel(sequelize, Sequelize)
const Group = GroupModel.createModel(sequelize, Sequelize)
const Spam = SpamModel.createModel(sequelize, Sequelize)
const ClearPeriod = ClearPeriodModel.createModel(sequelize, Sequelize)
const ParentChildInGroup = ParentChildInGroupModel.createModel(sequelize, Sequelize)

let _created = false

class Database {

    static get created() {
        return _created 
    }

    async init() {
        if (Database.created) {
            return
        }
        
        const UserGroup = sequelize.define('UserGroup', {
            warnsNumber: {type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0}
        })
        
        User.belongsToMany(Group, {through: UserGroup})
        Group.belongsToMany(User, {through: UserGroup})
    
        Spam.belongsToMany(Group, {through: "SpamGroup"})
        Group.belongsToMany(Spam, {through: "SpamGroup"})
    
        Group.hasMany(ClearPeriod)
        
        await sequelize.sync({force: true})
        _created = true
    }

    async is_admin(adminTgId) {
        const admin = await Admin.findByTgId(adminTgId) 
        if (admin != null) {
            return true
        }

        return false
    }
    
    async add_admin(adminTgId) {
        const [admin,_] = await Admin.findOrCreate({
            where: {
                tgId: adminTgId
            }
        })

        return admin
    }

    async remove_admin(adminTgId) {
        await Admin.destroy({
            where: {
              tgId: adminTgId
            }
        })
    }
    
    async get_admins() {
        return (await Admin.findAll())
    }
    
    async set_admins(adminTgIds) {
       await Admin.destroy({
            where: {},
            truncate: true
        })
    
        for (let i = 0; i < adminTgIds.length; i++) {
            await Admin.create({tgId: adminTgIds[i]})
        }
    }

    async is_spam(groupTgId, text) {
        const group = await Group.findByTgId(groupTgId)
        const spam = await Spam.findByText(text)

        return (await group.hasSpam(spam))
    }

    async has_spam(groupTgId, texts) {
        for (let i = 0; i < texts.length; i++) {
            const check = await this.is_spam(groupTgId, texts[i]);
            
            if (check) {
                return true
            }
        }

        return false
    }
    
    async add_spam(groupTgId, text) {
        const group = await Group.findByTgId(groupTgId)
        const [spam,_] = await Spam.findOrCreate({
            where: {
                text: text
            }
        })

        await group.addSpam(spam)
    }
    
    async remove_spam(groupTgId, text) {
        const group = await Group.findByTgId(groupTgId)
        const spam = await Spam.findByText(text)

        await group.removeSpam(spam)
    }
    
    async get_spams(groupTgId) {
        const group = await Group.findByTgId(groupTgId)
        
        return (await group.getSpams())
    }
    
    async set_spams(groupTgId, texts) {
        const group = await Group.findByTgId(groupTgId)

        const spams = []
        for (let i = 0; i < texts.length; i++) {
            const [spam,_] = await Spam.findOrCreate({
                where: {
                    text: texts[i]
                }
            })
            
            spams.push(spam)
        }

        await group.setSpams(spams)
    }

    async add_global_spam(text) {
        await Spam.findOrCreate({
            where: {
                text: text,
            }
        })

        await Spam.update({
            isGlobal: true,
          }, {
                where: {
                    text: text
            }
        })
    }

    async remove_global_spam(text) {
        await Spam.destroy({
            where: {
              text: text,
              isGlobal: true
            }
        })
    }

    async get_global_spams() {
        return await Spam.findAll({
            where: {
              isGlobal: true
            }
        })
    }

    async set_global_spams(texts) {
        await Spam.destroy({
            where: {
                isGlobal: true
            }
        })

        for (let i = 0; i < texts.length; i++) {
            await this.add_global_spam(texts[i])
        }
    }

    async get_clear_times(groupTgId) {
        const group = await Group.findByTgId(groupTgId)
        
        return (await group.getClearPeriods())
    }

    async set_clear_times(groupTgId, clearTimes) {
        const group = await Group.findByTgId(groupTgId)
        const oldClearPeriods = await group.getClearPeriods()
        await group.removeClearPeriods(oldClearPeriods)

        for (let i = 0; i < oldClearPeriods.length; i++) {
            await oldClearPeriods[i].destroy()
        }

        for (let i = 0; i < clearTimes.length; i++) {
            const newClearPeriod = await ClearPeriod.create(clearTimes[i])
            await group.addClearPeriod(newClearPeriod)
        }
    }

    async get_warns(groupTgId, userTgId) {
        const group = await Group.findOne({
            where: {tgId: groupTgId},
            include: [{
                model: User,
            }]
        })

        const user = group.dataValues.users.find((usr) => {
            return usr.tgId == userTgId
        })

        if (user != undefined) {
            return user.UserGroup.warnsNumber
        }

        return NaN
    }

    async set_warns(groupTgId, userTgId, warnsNum) {
        const group = await Group.findByTgId(groupTgId)
        const [user,_] = await User.findOrCreateByTgId(userTgId)
        
        await group.addUser(user, {
            through: {warnsNumber:  warnsNum}
        })
    }

    async get_parent(groupTgId, childTgId) {
        const result = await ParentChildInGroup.findOne({
            where: {
                groupTgId: groupTgId,
                childTgId: childTgId
            }
        })

        return result.parentTgId
    }
    
    async set_parent(groupTgId, childTgId, parentTgId) {
        await ParentChildInGroup.destroy({
            where: {
                groupTgId: groupTgId,
                childTgId: childTgId
            }
        })

        await ParentChildInGroup.create({
            groupTgId: groupTgId,
            childTgId: childTgId,
            parentTgId: parentTgId
        })
    }
}

doWorks()

async function doWorks() {
    const dbManager = new Database()
    await dbManager.init()
     
    const gp = await Group.create({tgId: 'azz'})
    await dbManager.add_spam(gp.tgId, 'telegram')
    await dbManager.add_global_spam('aaa')
    await dbManager.add_global_spam('bbbb')
    await dbManager.set_global_spams(['salam', 'pauvl'])
    const gsp = await dbManager.get_global_spams()
    
    await ParentChildInGroup.create({
        parentTgId: 'kamal',
        childTgId: 'akbar',
        groupTgId: 'azhant'
    })

    await ParentChildInGroup.create({
        parentTgId: 'kamal',
        childTgId: 'akbar',
        groupTgId: 'azhant2'
    })

    await dbManager.set_parent('azhant', 'akbar', 'kmax')
    const p = await dbManager.get_parent('azhant', 'akbar')
    console.log(p);
    
}


function getDatabaseConfig() {
    return JSON.parse(fs.readFileSync(dbConfigFilePath));
}

function getMethods(obj)
{
    var res = [];
    for(var m in obj) {
        if(typeof obj[m] == "function") {
            res.push(m)
        }
    }
    return res;
}
