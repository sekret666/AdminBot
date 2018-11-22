const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class BotForwardMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.bot_forward_handler.bind(this));
    }

    async bot_forward_handler(context, next) {
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
