const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class AdminsCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("admins", this.admins.bind(this));
        this.command(`admins@${process.env.BOT_ID}`, this.admins.bind(this));
    }

    async admins(context, next) {
        // get admins list
        let admins = await this.database.get_admins();

        // map admins to text
        admins = admins.map(
            admin =>
                `[${admin.dataValues.tgId}](tg://user?id=${
                    admin.dataValues.tgId
                })`
        );

        // send admins list
        await context.replyWithMarkdown(`
Admins list:
${admins.join("\n")}
        `);
    }
}

exports.AdminsCommand = AdminsCommand;
