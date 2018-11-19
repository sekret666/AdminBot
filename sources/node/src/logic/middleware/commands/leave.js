const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class LeaveCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("leave", this.handler_public_admin.bind(this));
    }

    async handler_public_admin(context, next) {
        // check handler condition (is public and admin)
        if (
            !(
                context.message.chat.type !== "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

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
