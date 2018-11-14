const Sequelize = require('sequelize');
const fs = require('fs');

const UserModel = require(__dirname + '/user')
const GroupModel = require(__dirname + '/group')
const SpamModel = require(__dirname + '/spam')
const ClearPeriodModel = require(__dirname + '/clear_period')

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

const User = UserModel.createModel(sequelize, Sequelize)
const Group = GroupModel.createModel(sequelize, Sequelize)
const Spam = SpamModel.createModel(sequelize, Sequelize)
const ClearPeriod = ClearPeriodModel.createModel(sequelize, Sequelize)

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
    
        User.hasMany(User, {as: 'Childs'})
        User.belongsTo(User)
    
        Spam.belongsToMany(Group, {through: "SpamGroup"})
        Group.belongsToMany(Spam, {through: "SpamGroup"})
    
        Group.hasMany(ClearPeriod)
        
        await sequelize.sync({force: true})
        _created = true
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
        const user = await User.findByTgId(userTgId)
        await group.addUser(user, {
            through: {warnsNumber:  warnsNum}
        })
    }
}

doWorks()

async function doWorks() {
    const dbManager = new Database()
    await dbManager.init()
     
    const gp = await Group.createByNameAndTgId('azhant', 'azz')
    const user = await User.create({tgId:'Kmax'})
    const user2 = await User.create({tgId:'Kmax2'})
    
    await gp.addUser(user)
    await gp.addUser(user2)
    await dbManager.set_warns(gp.tgId, user.tgId, 10)
    await dbManager.set_warns(gp.tgId, user2.tgId, 3)

    const warns = await dbManager.get_warns(gp.tgId, user.tgId)
    const warns2 = await dbManager.get_warns(gp.tgId, user2.tgId)
    
    console.log(warns);
    console.log(warns2);
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
