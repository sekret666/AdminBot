const Composer = require("telegraf/composer");

exports.all_rules = [
    "DENY_SPAM",
    "DENY_FLOOD",
    "DENY_BOT",
    "DENY_BOT_FORWARD",
    "DENY_CHAT_FORWARD",
    "DENY_LINK",
    "DENY_FILE"
];

class AllRulesCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("allrules", this.allrules.bind(this));
        this.command(
            `allrules@${process.env.BOT_ID}`,
            this.allrules.bind(this)
        );
    }

    async allrules(context, next) {
        // group rules
        // send rules list
        await context.replyWithMarkdown(`
All rules list:
${all_rules.join("\n")}
        `);
    }
}

exports.AllRulesCommand = AllRulesCommand;
