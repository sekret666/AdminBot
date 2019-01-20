const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../utils.js");

class UnwarnCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("unwarn", this.unwarn.bind(this));
        this.command(`unwarn@${process.env.BOT_ID}`, this.unwarn.bind(this));
    }

    async unwarn(context, next) {
        // get optional unwarn number
        let number = parseInt(
            context.message.text.replace(/^\/unwarn@?[a-zA-Z]* /, "")
        );
        if (isNaN(number)) {
            number = 1;
        }

        // unwarn message sender
        if ("reply_to_message" in context.message) {
            await unwarn(
                context,
                this.database,
                context.message.reply_to_message.from.id,
                number,
                "Administrator command"
            );
        } else {
            await context.replyWithMarkdown(`
Please reply the member message to unwarn!
            `);
        }
    }
}

exports.UnwarnCommand = UnwarnCommand;
