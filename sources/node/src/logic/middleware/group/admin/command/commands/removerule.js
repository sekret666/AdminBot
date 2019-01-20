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
        // removerule rule to group
        await this.database.get_group_rules(context.message.chat.id);

        // send ok
        await context.replyWithMarkdown(`
        Rule removed!
        `);
    }
}

exports.RemoveRuleCommand = RemoveRuleCommand;
