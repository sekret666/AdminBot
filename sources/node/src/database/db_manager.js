const Sequelize = require('sequelize');
const fs = require('fs');

const UserModel = require(__dirname + '/user')
const GroupModel = require(__dirname + '/group')
const SpamModel = require(__dirname + '/spam')

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

dbManager = setDatabaseScheme()
dbManager.then(() => {
    doWorks()
})


async function doWorks() {
    const gp = await Group.addByNameAndTgId('azhant', 'aaz')
    const spam = await Spam.create({text: 'Kir'})
    await gp.addSpam(spam)
    
    const check = await Group.isSpamInGroup('Kir', gp.tgId)
    console.log(check);
}

function setDatabaseScheme() {
    const UserGroup = sequelize.define('UserGroup', {
        isAdmin: {type: Sequelize.BOOLEAN, defaultValue: false}
    })
    
    User.belongsToMany(Group, {through: UserGroup})
    Group.belongsToMany(User, {through: UserGroup})

    User.hasMany(User, {as: 'Childs'})

    Spam.belongsToMany(Group, {through: "SpamGroup"})
    Group.belongsToMany(Spam, {through: "SpamGroup"})

    return sequelize.sync({force: true})
}



function getDatabaseConfig() {
    return JSON.parse(fs.readFileSync(dbConfigFilePath));
}

// dbManager.then(() => {
//     const gpm = new GroupModel.Manager(Group)
//     gpm.addGroup('azhant','aaz').then((gp) => {
//         User.create({name: 'kamal', tgId: 'kmax'}).then(user => {
//             gp.addUser(user).then(() => {
//                 Group.findAll({
//                     where:
//                 })
//             })
//         })
//     })        
// })
