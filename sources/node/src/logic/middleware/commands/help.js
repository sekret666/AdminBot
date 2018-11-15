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

        context.reply(`
Supported private admin commands:
/start
/help
/learn {words}
/unlearn {words}
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

        context.reply(`
Supported private member commands:
/start
/help
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

        context.reply(`
Supported public admin commands:
/help
/learn {words}
/unlearn {words}
/warn [{number}]
/unwarn [{number}]
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

        context.reply(`
Supported public member commands:
/help
/report
        `);
    }
}

exports.HelpCommand = HelpCommand;
