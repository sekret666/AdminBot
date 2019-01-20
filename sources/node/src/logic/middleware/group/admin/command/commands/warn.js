const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../../../utils.js");

class WarnCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("warn", this.warn.bind(this));
        this.command(`warn@${process.env.BOT_ID}`, this.warn.bind(this));
    }

    async warn(context, next) {
        // get optional warn number
        let number = parseInt(
            context.message.text.replace(/^\/warn@?[a-zA-Z]* /, "")
        );
        if (isNaN(number)) {
            number = 1;
        }

        // warn message sender
        if ("reply_to_message" in context.message) {
            await warn(
                context,
                this.database,
                context.message.reply_to_message.from.id,
                number,
                "Administrator command"
            );
        } else {
            await context.replyWithMarkdown(`
Please reply the member message to warn!
            `);
        }
    }
}

exports.WarnCommand = WarnCommand;
