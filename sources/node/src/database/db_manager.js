const Sequelize = require("sequelize");

const AdminModel = require(__dirname + "/admin");
const UserModel = require(__dirname + "/user");
const GroupModel = require(__dirname + "/group");
const RuleModel = require(__dirname + "/rule");
const SpamModel = require(__dirname + "/spam");
const ClearPeriodModel = require(__dirname + "/clear_period");
const ParentChildInGroupModel = require(__dirname + "/parent_child_in_group");

const dbConfig = getDatabaseConfig();
const options = {
    dialect: dbConfig.dialect,
    operatorsAliases: false
};

if (options.dialect == "sqlite") {
    options.storage = process.env.DB_STORAGE;
}

const sequelize = new Sequelize(
    dbConfig.dbName,
    dbConfig.username,
    dbConfig.password,
    options
);

const Admin = AdminModel.createModel(sequelize, Sequelize);
const User = UserModel.createModel(sequelize, Sequelize);
const Group = GroupModel.createModel(sequelize, Sequelize);
const Rule = RuleModel.createModel(sequelize, Sequelize);
const Spam = SpamModel.createModel(sequelize, Sequelize);
const ClearPeriod = ClearPeriodModel.createModel(sequelize, Sequelize);
const ParentChildInGroup = ParentChildInGroupModel.createModel(
    sequelize,
    Sequelize
);

let _created = false;

class Database {
    static get created() {
        return _created;
    }

    async init() {
        if (Database.created) {
            return;
        }

        const UserGroup = sequelize.define("UserGroup", {
            warnsNumber: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 }
        });

        User.belongsToMany(Group, { through: UserGroup });
        Group.belongsToMany(User, { through: UserGroup });

        Spam.belongsToMany(Group, { through: "SpamGroup" });
        Group.belongsToMany(Spam, { through: "SpamGroup" });

        Rule.belongsToMany(Group, { through: "GroupRule" });
        Group.belongsToMany(Rule, { through: "GroupRule" });

        Group.hasMany(ClearPeriod);

        await sequelize.sync();
        _created = true;
    }

    async is_admin(adminTgId) {
        const admin = await Admin.findByTgId(adminTgId);
        if (admin != null) {
            return true;
        }

        return false;
    }

    async add_admin(adminTgId) {
        const [admin, _] = await Admin.findOrCreate({
            where: {
                tgId: adminTgId
            }
        });

        return admin;
    }

    async remove_admin(adminTgId) {
        await Admin.destroy({
            where: {
                tgId: adminTgId
            }
        });
    }

    async get_admins() {
        return await Admin.findAll();
    }

    async set_admins(adminTgIds) {
        await Admin.destroy({
            where: {},
            truncate: true
        });

        for (let i = 0; i < adminTgIds.length; i++) {
            await Admin.create({ tgId: adminTgIds[i] });
        }
    }

    async is_spam(groupTgId, text) {
        const group = await Group.findByTgId(groupTgId);
        const spam = await Spam.findByText(text);

        if (group == null) {
            return false;
        }

        return (await group.hasSpam(spam)) || (await this.is_global_spam(text));
    }

    async has_spam(groupTgId, texts) {
        for (let i = 0; i < texts.length; i++) {
            const check = await this.is_spam(groupTgId, texts[i]);

            if (check) {
                return true;
            }
        }

        return false;
    }

    async add_spam(groupTgId, text) {
        const group = await Group.findByTgId(groupTgId);
        const [spam, _] = await Spam.findOrCreate({
            where: {
                text: text
            }
        });

        await group.addSpam(spam);
    }

    async remove_spam(groupTgId, text) {
        const group = await Group.findByTgId(groupTgId);
        const spam = await Spam.findByText(text);

        await group.removeSpam(spam);
    }

    async get_spams(groupTgId) {
        const group = await Group.findByTgId(groupTgId);

        return await group.getSpams();
    }

    async set_spams(groupTgId, texts) {
        const group = await Group.findByTgId(groupTgId);

        const spams = [];
        for (let i = 0; i < texts.length; i++) {
            const [spam, _] = await Spam.findOrCreate({
                where: {
                    text: texts[i]
                }
            });

            spams.push(spam);
        }

        await group.setSpams(spams);
    }

    async add_global_spam(text) {
        await Spam.findOrCreate({
            where: {
                text: text
            }
        });

        await Spam.update(
            {
                isGlobal: true
            },
            {
                where: {
                    text: text
                }
            }
        );
    }

    async is_global_spam(text) {
        const spam = await Spam.findOne({
            where: {
                text: text,
                isGlobal: true
            }
        });

        if (spam != null) {
            return true;
        }

        return false;
    }

    async remove_global_spam(text) {
        await Spam.destroy({
            where: {
                text: text,
                isGlobal: true
            }
        });
    }

    async get_global_spams() {
        return await Spam.findAll({
            where: {
                isGlobal: true
            }
        });
    }

    async set_global_spams(texts) {
        await Spam.destroy({
            where: {
                isGlobal: true
            }
        });

        for (let i = 0; i < texts.length; i++) {
            await this.add_global_spam(texts[i]);
        }
    }

    async get_clear_times(groupTgId) {
        const group = await Group.findByTgId(groupTgId);

        return await group.getClearPeriods();
    }

    async set_clear_times(groupTgId, clearTimes) {
        const group = await Group.findByTgId(groupTgId);
        const oldClearPeriods = await group.getClearPeriods();
        await group.removeClearPeriods(oldClearPeriods);

        for (let i = 0; i < oldClearPeriods.length; i++) {
            await oldClearPeriods[i].destroy();
        }

        for (let i = 0; i < clearTimes.length; i++) {
            const newClearPeriod = await ClearPeriod.create(clearTimes[i]);
            await group.addClearPeriod(newClearPeriod);
        }
    }

    async get_warns(groupTgId, userTgId) {
        const group = await Group.findOne({
            where: { tgId: groupTgId },
            include: [
                {
                    model: User
                }
            ]
        });

        const user = group.dataValues.users.find(usr => {
            return usr.tgId == userTgId;
        });

        if (user != undefined) {
            return user.UserGroup.warnsNumber;
        }

        return NaN;
    }

    async set_warns(groupTgId, userTgId, warnsNum) {
        const group = await Group.findByTgId(groupTgId);
        const [user, _] = await User.findOrCreateByTgId(userTgId);

        await group.addUser(user, {
            through: { warnsNumber: warnsNum }
        });
    }

    async get_parent(groupTgId, childTgId) {
        const result = await ParentChildInGroup.findOne({
            where: {
                groupTgId: groupTgId,
                childTgId: childTgId
            }
        });

        if (result == null) {
            return null;
        }

        return result.parentTgId;
    }

    async set_parent(groupTgId, childTgId, parentTgId) {
        await this.find_or_create_group(groupTgId);

        await ParentChildInGroup.destroy({
            where: {
                groupTgId: groupTgId,
                childTgId: childTgId
            }
        });

        await ParentChildInGroup.create({
            groupTgId: groupTgId,
            childTgId: childTgId,
            parentTgId: parentTgId
        });
    }

    async init_group(groupId) {
        const [group, _] = await Group.findOrCreate({
            where: {
                tgId: groupId
            }
        });

        return group;
    }

    async find_or_create_rule(ruleType) {
        const [rule, _] = await Rule.findOrCreate({
            where: {
                type: ruleType
            }
        });

        return rule;
    }

    async add_rule_to_group(groupTgId, ruleType) {
        const group = await Group.findByTgId(groupTgId);
        const rule = await this.find_or_create_rule(ruleType);

        await group.addRule(rule);
    }

    async get_group_rules(groupTgId) {
        const group = await Group.findByTgId(groupTgId);

        return await group.getRules();
    }
}

function getDatabaseConfig() {
    return {
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME
    };
}

exports.Database = Database;
