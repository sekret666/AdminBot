const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class LearnCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("learn", this.handler_private_admin.bind(this));
        this.command("learn", this.handler_public_admin.bind(this));
        this.command(
            `learn@${process.env.BOT_ID}`,
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

        // global learn all words
        for (let word of spam_words) {
            await this.database.add_global_spam(word);
        }
        await context.replyWithMarkdown(`
Words globally learned!
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

        // learn all words
        for (let word of spam_words) {
            await this.database.add_spam(context.message.chat.id, word);
        }
        await context.replyWithMarkdown(`
Words learned!
        `);
    }
}

exports.LearnCommand = LearnCommand;
