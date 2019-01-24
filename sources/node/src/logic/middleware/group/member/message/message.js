const Composer = require("telegraf/composer");

const { SpamMessage } = require("./messages/spam.js");
const { FloodMessage } = require("./messages/flood.js");
const { BotMessage } = require("./messages/bot.js");

const { BotForwardMessage } = require("./messages/bot_forward.js");
const { ChatForwardMessage } = require("./messages/chat_forward.js");

const { LinkMessage } = require("./messages/link.js");
const { FileMessage } = require("./messages/file.js");

class Message extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new SpamMessage(database));
        this.use(new FloodMessage(database));
        this.use(new BotMessage(database));

        this.use(new BotForwardMessage(database));
        this.use(new ChatForwardMessage(database));

        this.use(new LinkMessage(database));
        this.use(new FileMessage(database));
    }
}

exports.Message = Message;
