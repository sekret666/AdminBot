const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../utils.js");

class Message extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.spam_handler.bind(this));
        this.use(this.flood_handler.bind(this));
    }

    async spam_handler(context, next) {
        console.log();
        console.log();
        console.log(context.message);
        console.log();
        console.log();

        // check handler condition (text or caption has spam words of group)
        let words = (context.message.text || "")
            .split(" ")
            .concat((context.message.caption || "").split(" "));
        if (!(await this.database.has_spam(context.message.chat.id, words))) {
            return next();
        }

        // delete message
        // warn
        context.deleteMessage();
        warn(context, this.database, context.message.from.id);
    }

    async flood_handler(context, next) {
        // not implemented yet!
        return next();
    }
}

exports.Message = Message;
