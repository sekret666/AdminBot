const Composer = require("telegraf/composer");

class RemoveRuleCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("removerule", this.removerule.bind(this));
        this.command(
            `removerule@${process.env.BOT_ID}`,
            this.removerule.bind(this)
        );
    }

    async removerule(context, next) {
        // remove rule from group
        let rule = context.message.text.replace(
            /^\/removerule@?[a-zA-Z]* /,
            ""
        );
        await this.database.remove_group_rule(context.message.chat.id, rule);

        // send ok
        await context.replyWithMarkdown(`
        Rule removed!
        `);
    }
}

exports.RemoveRuleCommand = RemoveRuleCommand;
