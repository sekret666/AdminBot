var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    return sequelize.define('spam', {
        text: DataTypes.STRING,
    })
}