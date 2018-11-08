const Composer = require("telegraf/composer");

class Message extends Composer {
    constructor() {
        super();

        // init middlewares
        this.use(this.spam_handler);
        this.use(this.flood_handler);
    }

    async spam_handler(context, next) {
        next();
    }

    async flood_handler(context, next) {
        next();
    }
}

exports.Message = Message;
