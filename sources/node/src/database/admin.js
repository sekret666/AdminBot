var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    const Admin = sequelize.define('admin', {
        tgId: {type: DataTypes.STRING, unique: true},
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
    })

    Admin.findByTgId = async function (adminTgId) {
        const admin = await this.findOne({
            where: {
                tgId: adminTgId
            } 
        })

        return admin
    }

    return Admin
}