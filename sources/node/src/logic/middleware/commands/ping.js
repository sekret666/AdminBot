const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class PingCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("ping", this.handler_ping.bind(this));
        this.command(
            `ping@${process.env.BOT_ID}`,
            this.handler_ping.bind(this)
        );
    }

    async handler_ping(context, next) {
        if (context.session.a) {
            context.session.a++;
        } else {
            context.session.a = 0;
        }
        await context.replyWithMarkdown(`
pong ${context.session.a}!
        `);
    }
}

exports.PingCommand = PingCommand;
