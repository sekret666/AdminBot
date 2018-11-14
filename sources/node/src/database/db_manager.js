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
            isAdmin: {type: Sequelize.BOOLEAN, defaultValue: false}
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
}

doWorks()

async function doWorks() {
    const dbManager = new Database()
    await dbManager.init()
     
    const gp = await Group.createByNameAndTgId('azhant', 'azz')
    const sp = await Spam.create({text: 'fuck'})
    const sp2 = await Spam.create({text: 'fuck2'})
    
    await dbManager.add_spam(gp.tgId, sp.text)
    // await dbManager.add_spam(gp.tgId, sp2.text)
    await dbManager.set_spams(gp.tgId, [sp2.text, 'kir'])

    const check = await dbManager.has_spam(gp.tgId, [sp.text, sp2.text])
    console.log(check);
    
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
