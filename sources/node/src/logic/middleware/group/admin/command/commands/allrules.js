const Composer = require("telegraf/composer");

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
        let all_rules = [
            "DENY_SPAM",
            "DENY_FLOOD",
            "DENY_BOT",
            "DENY_BOT_FORWARD",
            "DENY_CHAT_FORWARD",
            "DENY_LINK_regex",
            "DENY_FILE_regex"
        ];

        // send rules list
        await context.reply(`
All rules list:

${all_rules.join("\n")}
        `);
    }
}

exports.AllRulesCommand = AllRulesCommand;
