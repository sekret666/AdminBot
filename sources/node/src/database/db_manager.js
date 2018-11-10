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

const dbManager = setDatabaseScheme()
dbManager.then(() => {
    doWorks()
})


async function doWorks() {
    const gp = await Group.createByNameAndTgId('azhant', 'azz')
    const clearP = await ClearPeriod.create({from:1, to:8}) 
    await gp.addClearPeriod(clearP)
    const ps = await gp.hasClearPeriod(clearP)
    console.log(ps);
}

function setDatabaseScheme() {
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

    return sequelize.sync({force: true})
}



function getDatabaseConfig() {
    return JSON.parse(fs.readFileSync(dbConfigFilePath));
}

// function getMethods(obj)
// {
//     var res = [];
//     for(var m in obj) {
//         if(typeof obj[m] == "function") {
//             res.push(m)
//         }
//     }
//     return res;
// }
