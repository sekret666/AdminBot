const Composer = require("telegraf/composer");

class GlobalUnlearnCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("globalunlearn", this.global_unlearn.bind(this));
        this.command(
            `globalunlearn@${process.env.BOT_ID}`,
            this.global_unlearn.bind(this)
        );
    }

    async global_unlearn(context, next) {
        // check in reply of message
        let spam_words = [];
        if ("reply_to_message" in context.message) {
            // reply learn
            spam_words = context.message.reply_to_message.text
                .replace(/^\/globalunlearn@?[a-zA-Z]* /, "")
                .split(" ");
        } else {
            // local group learn word
            spam_words = context.message.text
                .replace(/^\/globalunlearn@?[a-zA-Z]* /, "")
                .split(" ");
        }

        // unlearn global all words
        for (let word of spam_words) {
            await this.database.remove_global_spam(word);
        }
        await context.replyWithMarkdown(`
Words globally unlearned!
        `);
    }
}

exports.GlobalUnlearnCommand = GlobalUnlearnCommand;
