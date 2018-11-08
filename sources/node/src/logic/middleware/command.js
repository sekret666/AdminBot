const Composer = require("telegraf/composer");

class Command extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("start", this.start_handler.bind(this));
        this.command("help", this.help_handler.bind(this));
        this.command("report", this.report_handler.bind(this));
        this.command("register", this.register_handler.bind(this));
        this.command("warn", this.warn_handler.bind(this));
        this.command("unwarn", this.unwarn_handler.bind(this));
        this.command("learn", this.learn_handler.bind(this));
        this.command("unlearn", this.unlearn_handler.bind(this));
    }

    async start_handler(context) {
        if (context.message.chat.type === "private") {
            context.reply(`
Hi dear ${context.message.from.first_name}!
click /help
            `);
        } else {
            this.handle_unsupport(context);
        }
    }

    async help_handler(context) {
        // check is_admin and is_private
        if (context.message.chat.type === "private") {
            context.replyWithMarkdown(`
Supported private commands:
/start
/help
/learn {word}
/unlearn {word}
/register {password}
            `);
        } else {
            context.reply(`
Supported public commands:
/help
/learn {word}
/unlearn {word}
/warn
/unwarn
/report
            `);
        }
    }

    async report_handler(context) {
        if (context.message.chat.type === "private") {
            context.reply(`
Unsupported command!
click /help
            `);
        } else {
            // report to admins
        }
    }

    async register_handler(context) {
        if (context.message.chat.type === "private") {
            // try register with password
        } else {
            context.reply(`
Unsupported command!
click /help
            `);
        }
    }

    async warn_handler(context) {
        if (context.message.chat.type === "private") {
            context.reply(`
Unsupported command!
click /help
            `);
        } else {
            // check warner is admin
        }
    }

    async unwarn_handler(context) {
        if (context.message.chat.type === "private") {
            context.reply(`
Unsupported command!
click /help
            `);
        } else {
            // check unwarner is admin
        }
    }

    async learn_handler(context) {
        if (context.message.chat.type === "private") {
            // check learner is admin
            // global learn
        } else {
            // check learner is admin
            // local learn
        }
    }

    async unlearn_handler(context) {
        if (context.message.chat.type === "private") {
            // check unlearner is admin
            // global unlearn
        } else {
            // check unlearner is admin
            // local unlearn
        }
    }
}

exports.Command = Command;
