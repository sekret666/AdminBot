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
        if (number == 0) {
            number = 1;
        }

        // delete messages
        if ("reply_to_message" in context.message) {
            for (
                let message_id = context.message.reply_to_message.message_id;
                message_id !=
                context.message.reply_to_message.message_id + number;
                message_id += number >= 0 ? 1 : -1
            ) {
                try {
                    await context.telegram.deleteMessage(
                        context.message.chat.id,
                        message_id
                    );
                } catch (error) {}
            }
        } else {
            await context.replyWithMarkdown(`
Please reply the message to delete!
            `);
        }
    }
}

exports.DeleteCommand = DeleteCommand;
