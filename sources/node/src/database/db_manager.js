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
    const gpm = new GroupModel.Manager(Group)
    gpm.addGroup('Azhant Devs', 'azhant').then(gp => {
        console.log(gp);
    })
})

function setDatabaseScheme() {
    User.belongsToMany(Group, {through: 'UserGroup'})
    User.belongsToMany(Group, {through: 'AdminGroup'})
    User.hasMany(User, {as: 'Child'})
    Spam.belongsToMany(Group, {through: "SpamGroup"})

    return sequelize.sync({force: true})
}



function getDatabaseConfig() {
    return JSON.parse(fs.readFileSync(dbConfigFilePath));
}