var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    const ParentChildInGroup = sequelize.define('ParentChildInGroup', {
        parentTgId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        childTgId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        groupTgId: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    })

    ParentChildInGroup.removeAttribute('id')

    return ParentChildInGroup
}