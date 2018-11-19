const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class HelpCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("help", this.handler_private_admin.bind(this));
        this.command("help", this.handler_private_member.bind(this));
        this.command("help", this.handler_public_admin.bind(this));
        this.command("help", this.handler_public_member.bind(this));
        this.command(
            `help@${process.env.BOT_ID}`,
            this.handler_public_admin.bind(this)
        );
        this.command(
            `help@${process.env.BOT_ID}`,
            this.handler_public_member.bind(this)
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

        await context.replyWithMarkdown(`
Supported private admin commands:

/start
/help
/ping
/global_learn [{words}]
/global_unlearn [{words}]
        `);
    }
    async handler_private_member(context, next) {
        // check handler condition (is private and not admin)
        if (
            !(
                context.message.chat.type === "private" &&
                !(await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        await context.replyWithMarkdown(`
Supported private member commands:

/start
/help
/ping
/register {password}
        `);
    }
    async handler_public_admin(context, next) {
        // check handler condition (is public and admin)
        if (
            !(
                context.message.chat.type !== "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        await context.replyWithMarkdown(`
Supported public admin commands:

/help
/ping
/leave
/delete [{number}]
/warn [{number}]
/unwarn [{number}]
/learn [{words}]
/unlearn [{words}]
/global_learn [{words}]
/global_unlearn [{words}]
        `);
    }
    async handler_public_member(context, next) {
        // check handler condition (is public and not admin)
        if (
            !(
                context.message.chat.type !== "private" &&
                !(await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        await context.replyWithMarkdown(`
Supported public member commands:

/help
/ping
/report
        `);
    }
}

exports.HelpCommand = HelpCommand;
