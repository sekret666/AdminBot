const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

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

        // delete message
        await context.deleteMessage();
    }
}

exports.BotMessage = BotMessage;
