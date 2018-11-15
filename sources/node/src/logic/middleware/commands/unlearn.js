const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class UnlearnCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("unlearn", this.handler_private_admin.bind(this));
        this.command("unlearn", this.handler_public_admin.bind(this));
        this.command(
            `unlearn@${process.env.BOT_ID}`,
            this.handler_public_admin.bind(this)
        );
    }

    async handler_private_admin(context, next) {
        // check handler condition (is private and admin)
        if (
            !(
                context.message.chat.type === "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        // check in reply of message
        let spam_words = [];
        if ("reply_to_message" in context.message) {
            // reply learn
            spam_words = context.message.reply_to_message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        } else {
            // local group learn word
            spam_words = context.message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        }

        // unlearn global all words
        for (let word of spam_words) {
            await this.database.remove_global_spam(word);
        }
        context.reply(`
Words globally unlearned!
        `);
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

        // check in reply of message
        let spam_words = [];
        if ("reply_to_message" in context.message) {
            // reply learn
            spam_words = context.message.reply_to_message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        } else {
            // local group learn word
            spam_words = context.message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        }

        // unlearn all words
        for (let word of spam_words) {
            await this.database.remove_spam(context.message.chat.id, word);
        }
        context.reply(`
Words unlearned!
        `);
    }
}

exports.UnlearnCommand = UnlearnCommand;
