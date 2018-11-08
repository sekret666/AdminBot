var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        tgId: {type: DataTypes.STRING, unique: true},
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        warnsNumber: DataTypes.INTEGER.UNSIGNED
    })
}