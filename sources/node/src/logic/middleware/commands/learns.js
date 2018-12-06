const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class LearnsCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("admins", this.handler_public_admin.bind(this));
        this.command(
            `admins@${process.env.BOT_ID}`,
            this.handler_public_admin.bind(this)
        );
    }

    async handler_public_admin(context, next) {
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
        await context.replyWithMarkdown(`
Admins list:
${await this.database.get_admins()}
        `);
    }
}

exports.LearnsCommand = LearnsCommand;
