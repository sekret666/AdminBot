const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../../../utils.js");

class HelpCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("help", this.help.bind(this));
        this.command(`help@${process.env.BOT_ID}`, this.help.bind(this));
    }

    async help(context, next) {
        // check handler condition (is public and admin)
        if (
            !(
                context.message.chat.type !== "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        await context.replyWithMarkdown(`
Supported public admin commands:

/help
/leave
/delete [{number}]
/warn [{number}]
/unwarn [{number}]
/learns
/learn [{words}]
/unlearn [{words}]
        `);
    }
}

exports.HelpCommand = HelpCommand;
