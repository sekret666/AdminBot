const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class AdminsCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("admins", this.handler_private_admin.bind(this));
        this.command(
            `admins@${process.env.BOT_ID}`,
            this.handler_private_admin.bind(this)
        );
    }

    async handler_private_admin(context, next) {
        // check handler condition (is private and admin)
        if (
            !(
                context.message.chat.type === "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

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
${admins}
        `);
    }
}

exports.AdminsCommand = AdminsCommand;
