const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class LeaveCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("leave", this.leave.bind(this));
        this.command(`leave@${process.env.BOT_ID}`, this.leave.bind(this));
    }

    async leave(context, next) {
        // say goodbye
        // leave chat
        await context.replyWithMarkdown(`
Goodbye dear [${context.message.from.first_name}](tg://user?id=${
            context.message.from.id
        })!
        `);
        await context.leaveChat();
    }
}

exports.LeaveCommand = LeaveCommand;
