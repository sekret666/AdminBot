const Composer = require("telegraf/composer");

class Message extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

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
