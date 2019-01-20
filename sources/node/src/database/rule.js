var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    const Rule = sequelize.define('rule', {
        type: {type: DataTypes.STRING, unique: true},
    })

    return Rule
}