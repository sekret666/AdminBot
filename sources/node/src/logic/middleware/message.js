const Composer = require("telegraf/composer");
const { BotForwardMessage } = require("./messages/bot_forward.js");
const { BotMessage } = require("./messages/bot.js");
const { ChatForwardMessage } = require("./messages/chat_forward.js");
const { FloodMessage } = require("./messages/flood.js");
const { HasLinkMessage } = require("./messages/has_link.js");
const { SpamMessage } = require("./messages/spam.js");

class Message extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new BotForwardMessage(database));
        this.use(new BotMessage(database));
        this.use(new ChatForwardMessage(database));
        this.use(new FloodMessage(database));
        this.use(new HasLinkMessage(database));
        this.use(new SpamMessage(database));
    }
}

exports.Message = Message;
