var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    const Group = sequelize.define('group', {
        name: DataTypes.STRING,
        tgId: {type: DataTypes.STRING, unique: true}
    })

    Group.createByNameAndTgId = async function(name, groupTgId) {
        const group = await this.create({
            name: name,
            tgId: groupTgId
        })

        return group
    }

    Group.removeGroupByTgId = async function(groupTgId) {
        await this.destroy({
            where: {
                tgId: groupTgId
            }
        })
    }

    Group.findByTgId = async function(groupTgId) {
        const group = await this.findOne({
            where: {
                tgId: groupTgId
            } 
        })

        return group
    }
    
    Group.addAdminToGroup = async function(user, groupTgId) {
        const group = await this.findByTgId(groupTgId)

        group.addUser(user, {
            through: { isAdmin: true }
        })
    }

    Group.removeAdminFromGroup = async function(user, groupTgId) {
        const group = await this.findByTgId(groupTgId);

        group.addUser(user, {
            through: { isAdmin: false }
        })
    }

    Group.isSpamInGroup = async function (spamText, groupTgId) {
        const group = await this.findByTgId(groupTgId);
        const groupSpams =  await group.getSpams()
        const spamTexts = groupSpams.map(spam => spam.text)
        
        return spamTexts.includes(spamText)
    }
 
    return Group
}
