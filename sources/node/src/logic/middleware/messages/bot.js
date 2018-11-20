const Composer = require("telegraf/composer");
const { warn, unwarn, warnable } = require("../../utils.js");

class BotMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.bot_handler.bind(this));
    }

    async bot_handler(context, next) {
        // check handler condition (from bot and not me)
        if (
            !(
                context.message.from.is_bot &&
                !process.env.BOT_TOKEN.includes(context.message.from.id)
            )
        ) {
            return next();
        }

        // check bot is warnable
        if (warnable(context, context.message.from.id)) {
            // delete message
            // warn bot 3

            await context.deleteMessage();
            warn(
                context,
                this.database,
                context.message.from.id,
                3,
                "Bot Message"
            );
        }
    }
}

exports.BotMessage = BotMessage;
