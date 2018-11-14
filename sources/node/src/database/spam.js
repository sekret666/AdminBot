var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    const Spam = sequelize.define('spam', {
        text: {type: DataTypes.STRING, unique: true},
        isGlobal: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
    })

    Spam.findByText = async function(text) {
        const spam = await this.findOne({
            where: {
                text: text
            } 
        })

        return spam
    }

    return Spam
}