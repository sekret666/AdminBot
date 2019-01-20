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
        let group_rules = await this.database.get_group_rules(
            context.message.chat.id
        );

        // send rules list
        await context.replyWithMarkdown(`
Rules list:

*${group_rules.map(rule => rule.dataValues.type).join("\n")}*
        `);
    }
}

exports.RulesCommand = RulesCommand;
