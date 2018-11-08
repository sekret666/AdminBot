var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    return sequelize.define('clearPeriod', {
        from: DataTypes.INTEGER.UNSIGNED,
        to: DataTypes.INTEGER.UNSIGNED
    })
}