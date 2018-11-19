const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class ChatForwardMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.chat_forward_handler.bind(this));
    }

    async chat_forward_handler(context, next) {
        // check handler condition (is forwarded from chat and from channel)
        if (
            !(
                "forward_from_chat" in context.message &&
                context.message.forward_from_chat.type === "channel"
            )
        ) {
            return next();
        }

        // delete message
        // warn
        await context.deleteMessage();
        warn(
            context,
            this.database,
            context.message.from.id,
            1,
            "Channel forward"
        );
    }
}

exports.ChatForwardMessage = ChatForwardMessage;
