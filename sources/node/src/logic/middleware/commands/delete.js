const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class DeleteCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("delete", this.handler_public_admin.bind(this));
        this.command(
            `delete@${process.env.BOT_ID}`,
            this.handler_public_admin.bind(this)
        );
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

        // get optional delete number
        let number = parseInt(
            context.message.text.replace(/^\/delete@?[a-zA-Z]* /, "")
        );
        if (isNaN(number)) {
            number = 1;
        }

        // delete message
        if ("reply_to_message" in context.message) {
            console.log(context.message);
            // warn(
            //     context,
            //     this.database,
            //     context.message.reply_to_message.from.id,
            //     number,
            //     "Administrator command"
            // );
        } else {
            await context.replyWithMarkdown(`
Please reply the message to delete!
            `);
        }
    }
}

exports.DeleteCommand = DeleteCommand;
