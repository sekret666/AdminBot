const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

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
        await context.replyWithMarkdown(`
Supported group admin commands:

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
