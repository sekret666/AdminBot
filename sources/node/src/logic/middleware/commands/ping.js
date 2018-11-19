const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class PingCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("ping", this.handler_ping.bind(this));
    }

    async handler_ping(context, next) {
        await context.replyWithMarkdown(`
pong!
        `);
    }
}

exports.PingCommand = PingCommand;
