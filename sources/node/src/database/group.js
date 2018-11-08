var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    return sequelize.define('group', {
        name: DataTypes.STRING,
        tgId: {type: DataTypes.STRING, unique: true}
    })
}

exports.Manager = class GroupManager {
    constructor(GroupModel) {
        this.Group = GroupModel
    }

    addGroup(name, groupTgId) {
        return this.Group.create({
            name: name,
            tgId: groupTgId
        })
    }

    removeGroup(groupTgId) {
        return this.Group.destroy({
            where: {
                tgId: groupTgId
            }
        })
    }

    getAllGroups() {
        return this.Group.findAll()
    }

    findGroupByTgId(groupTgId) {
        return this.Group.findOne({
            where: {
                tgId: groupTgId
            } 
        })
    }

    addUserToGroup(user, groupTgId) {
        return this.findGroupByTgId(groupTgId).then(group => {
            group.addUser(user)
        })
    }

    removeUserFromGroup(user, groupTgId) {
        return this.findGroupByTgId(groupTgId).then(group => {
            group.removeUser(user);
        })
    }

    getAdminsFromGroup(groupTgId) {
        return this.findGroupByTgId(groupTgId).then((group) => {
            group.getUsers()
        })
    }

    addAdminToGroup(user, groupTgId) {
        return this.findGroupByTgId(groupTgId).then(group => {
            group.addUser(user, {
                through: { isAdmin: true }
            })
        })
    }

    removeAdminFromGroup(user, groupTgId) {
        return this.findGroupByTgId(groupTgId).then(group => {
            group.addUser(user, {
                through: { isAdmin: false }
            })
        })
    }

}
