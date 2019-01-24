const Composer = require("telegraf/composer");

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
Supported public admin commands:

/help
/init
/leave
/delete [{number}]
/warn [{number}]
/unwarn [{number}]
/learns
/learn [{words}]
/unlearn [{words}]
/allrules
/rules
/addrule {rule}
/removerule {rule}
        `);
    }
}

exports.HelpCommand = HelpCommand;
