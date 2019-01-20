const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../utils.js");

class BotMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.bot.bind(this));
    }

    async bot(context, next) {
        // check handler condition (group denied bots)
        if (
            !(await this.database.has_rule(context.message.chat.id, "DENY_BOT"))
        ) {
            return next();
        }

        // check handler condition (from bot and not me)
        if (
            !(
                context.message.from.is_bot &&
                !process.env.BOT_TOKEN.includes(context.message.from.id)
            )
        ) {
            return next();
        }

        // try warn
        // delete message
        if (
            (await warn(
                context,
                this.database,
                context.message.from.id,
                3,
                "Bot Message"
            )) > 0
        ) {
            await context.deleteMessage();
        }
    }
}

exports.BotMessage = BotMessage;
