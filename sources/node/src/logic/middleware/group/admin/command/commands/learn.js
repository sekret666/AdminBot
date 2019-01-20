const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class LearnCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("learn", this.learn.bind(this));
        this.command(`learn@${process.env.BOT_ID}`, this.learn.bind(this));
    }

    async learn(context, next) {
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
