const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class WarnCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("warn", this.handler_public_admin.bind(this));
        this.command(
            `warn@${process.env.BOT_ID}`,
            this.handler_public_admin.bind(this)
        );
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

        // warn message sender
        if ("reply_to_message" in context.message) {
            warn(
                context,
                this.database,
                context.message.reply_to_message.from.id
            );
        } else {
            context.reply(`
Please reply the member message to warn!
            `);
        }
    }
}

exports.WarnCommand = WarnCommand;
