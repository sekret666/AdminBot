const Composer = require("telegraf/composer");
const { SpamMessage } = require("./messages/spam.js");
const { FloodMessage } = require("./messages/flood.js");

class Message extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new SpamMessage(database));
        this.use(new FloodMessage(database));
    }
}

exports.Message = Message;
