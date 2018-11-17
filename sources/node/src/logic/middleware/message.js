const Composer = require("telegraf/composer");
const { BotMessage } = require("./messages/bot.js");
const { SpamMessage } = require("./messages/spam.js");
const { FloodMessage } = require("./messages/flood.js");

class Message extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new BotMessage(database));
        this.use(new SpamMessage(database));
        this.use(new FloodMessage(database));
    }
}

exports.Message = Message;
