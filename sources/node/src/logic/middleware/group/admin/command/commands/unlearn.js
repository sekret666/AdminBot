const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class UnlearnCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("unlearn", this.unlearn.bind(this));
        this.command(`unlearn@${process.env.BOT_ID}`, this.unlearn.bind(this));
    }

    async unlearn(context, next) {
        // check in reply of message
        let spam_words = [];
        if ("reply_to_message" in context.message) {
            // reply learn
            spam_words = context.message.reply_to_message.text
                .replace(/^\/unlearn@?[a-zA-Z]* /, "")
                .split(" ");
        } else {
            // local group learn word
            spam_words = context.message.text
                .replace(/^\/unlearn@?[a-zA-Z]* /, "")
                .split(" ");
        }

        // unlearn all words
        for (let word of spam_words) {
            await this.database.remove_spam(context.message.chat.id, word);
        }
        await context.replyWithMarkdown(`
Words unlearned!
        `);
    }
}

exports.UnlearnCommand = UnlearnCommand;
