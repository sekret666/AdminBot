var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    const Rule = sequelize.define('rule', {
        type: {type: DataTypes.STRING, unique: true},
    })

    Rule.findByType = async function(ruleType) {
        const rule = await this.findOne({
            where: {
                type: ruleType
            }
        })

        return rule
    }

    return Rule
}