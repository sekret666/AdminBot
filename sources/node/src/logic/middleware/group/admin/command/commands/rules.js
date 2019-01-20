const Composer = require("telegraf/composer");

class RulesCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("rules", this.rules.bind(this));
        this.command(`rules@${process.env.BOT_ID}`, this.rules.bind(this));
    }

    async rules(context, next) {
        // create group rules in database
        let rules = this.database.get_group_rules(context.message.chat.id);

        // send rules list
        await context.replyWithMarkdown(`
Rules list:
${rules.join("\n")}
        `);
    }
}

exports.RulesCommand = RulesCommand;
