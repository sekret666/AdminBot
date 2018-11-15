const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class StartCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("start", this.handler_private.bind(this));
    }

    async handler_private(context, next) {
        // check handler condition (is private)
        if (!(context.message.chat.type === "private")) {
            return next();
        }

        context.replyWithMarkdown(`
Hi dear [${context.message.from.first_name}](tg://user?id=${
            context.message.from.id
        })!
click /help
        `);
    }
}

exports.StartCommand = StartCommand;
