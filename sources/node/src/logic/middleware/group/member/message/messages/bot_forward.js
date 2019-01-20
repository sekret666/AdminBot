const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../utils.js");

const DENY_BOT_FORWARD = "DENY_BOT_FORWARD";

class BotForwardMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.bot_forward.bind(this));
    }

    async bot_forward(context, next) {
        // check handler condition (group denied bot forwards)
        if (
            !(await this.database.has_rule(
                context.message.chat.id,
                DENY_BOT_FORWARD
            ))
        ) {
            return next();
        }

        // check handler condition (is forwarded from and from bot)
        if (
            !(
                "forward_from" in context.message &&
                context.message.forward_from.is_bot
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
                1,
                "Bot forward"
            )) > 0
        ) {
            await context.deleteMessage();
        }
    }
}

exports.BotForwardMessage = BotForwardMessage;
