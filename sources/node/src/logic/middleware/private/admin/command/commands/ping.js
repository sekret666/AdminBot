const Composer = require("telegraf/composer");

class PingCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("ping", this.ping.bind(this));
        this.command(`ping@${process.env.BOT_ID}`, this.ping.bind(this));
    }

    async ping(context, next) {
        await context.replyWithMarkdown(`
pong!
        `);
    }
}

exports.PingCommand = PingCommand;
