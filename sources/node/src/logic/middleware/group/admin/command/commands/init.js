const Composer = require("telegraf/composer");

class InitCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("init", this.init.bind(this));
        this.command(`init@${process.env.BOT_ID}`, this.init.bind(this));
    }

    async init(context, next) {
        // create group configs in database
        await this.database.init_group(context.message.chat.id);

        // say ok
        await context.replyWithMarkdown(`
Group settings initialized!
        `);
    }
}

exports.InitCommand = InitCommand;
