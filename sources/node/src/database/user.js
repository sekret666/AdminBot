var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        tgId: {type: DataTypes.STRING, unique: true},
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
    })

    User.findByTgId = async function (userTgId) {
        const user = await this.findOne({
            where: {
                tgId: userTgId
            } 
        })

        return user
    }

    User.updateWarnsNumberByTgId = async function(newWarnsNum, userTgId) {
        await User.update({
            warnsNumber: newWarnsNum,
          }, {
                where: {
                    tgId: userTgId
            }
        });
    }

    return User
}