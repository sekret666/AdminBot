const Composer = require("telegraf/composer");

class AddRuleCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("addrule", this.addrule.bind(this));
        this.command(`addrule@${process.env.BOT_ID}`, this.addrule.bind(this));
    }

    async addrule(context, next) {
        // add rule to group
        let rule = context.message.text
            .replace(/^\/addrule@?[a-zA-Z]* /, "")
            .toUpperCase();
        await this.database.add_rule_to_group(context.message.chat.id, rule);

        // send ok
        await context.replyWithMarkdown(`
        Rule added!
        `);
    }
}

exports.AddRuleCommand = AddRuleCommand;
