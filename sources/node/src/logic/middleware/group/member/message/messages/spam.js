const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../utils.js");

const DENY_SPAM = "DENY_SPAM";

class SpamMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.spam.bind(this));
    }

    async spam(context, next) {
        // check handler condition (group denied spams)
        if (
            !(await this.database.has_rule(context.message.chat.id, DENY_SPAM))
        ) {
            return next();
        }

        // check handler condition (text or caption has spam words of group)
        let words = (context.message.text || "")
            .split(" ")
            .concat((context.message.caption || "").split(" "));

        if (!(await this.database.has_spam(context.message.chat.id, words))) {
            return next();
        }

        // try warn
        // delete message
        if (
            (await warn(
                context,
                this.database,
                context.message.from.id,
                1,
                "Send spam"
            )) > 0
        ) {
            await context.deleteMessage();
        }
    }
}

exports.SpamMessage = SpamMessage;
