const Composer = require("telegraf/composer");

const { SpamMessage } = require("./spam.js");
const { FloodMessage } = require("./flood.js");
const { BotMessage } = require("./bot.js");

const { BotForwardMessage } = require("./bot_forward.js");
const { ChatForwardMessage } = require("./chat_forward.js");

const { HasLinkMessage } = require("./has_link.js");

class Message extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new SpamMessage(database));
        this.use(new FloodMessage(database));
        this.use(new BotMessage(database));

        this.use(new BotForwardMessage(database));
        this.use(new ChatForwardMessage(database));

        this.use(new HasLinkMessage(database));
    }
}

exports.Message = Message;
