const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class GlobalLearnCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("globallearn", this.global_learn.bind(this));
        this.command(
            `globallearn@${process.env.BOT_ID}`,
            this.global_learn.bind(this)
        );
    }

    async global_learn(context, next) {
        // check in reply of message
        let spam_words = [];
        if ("reply_to_message" in context.message) {
            // reply learn
            spam_words = context.message.reply_to_message.text
                .replace(/^\/globallearn@?[a-zA-Z]* /, "")
                .split(" ");
        } else {
            // local group learn word
            spam_words = context.message.text
                .replace(/^\/globallearn@?[a-zA-Z]* /, "")
                .split(" ");
        }

        // learn global all words
        for (let word of spam_words) {
            await this.database.add_global_spam(word);
        }
        await context.replyWithMarkdown(`
Words globally learned!
        `);
    }
}

exports.GlobalLearnCommand = GlobalLearnCommand;
