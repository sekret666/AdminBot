const Composer = require("telegraf/composer");

const { StartCommand } = require("./commands/start.js");
const { HelpCommand } = require("./commands/help.js");
const { PingCommand } = require("./commands/ping.js");

const { RegisterCommand } = require("./commands/register.js");
const { ReportCommand } = require("./commands/report.js");

const { LeaveCommand } = require("./commands/leave.js");
const { DeleteCommand } = require("./commands/delete.js");

const { WarnCommand } = require("./commands/warn.js");
const { UnwarnCommand } = require("./commands/unwarn.js");

const { LearnCommand } = require("./commands/learn.js");
const { UnlearnCommand } = require("./commands/unlearn.js");

const { GlobalLearnCommand } = require("./commands/global_learn.js");
const { GlobalUnlearnCommand } = require("./commands/global_unlearn.js");

class Command extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new StartCommand(database));
        this.use(new HelpCommand(database));
        this.use(new PingCommand(database));

        this.use(new RegisterCommand(database));
        this.use(new ReportCommand(database));

        this.use(new LeaveCommand(database));
        this.use(new DeleteCommand(database));

        this.use(new WarnCommand(database));
        this.use(new UnwarnCommand(database));

        this.use(new LearnCommand(database));
        this.use(new UnlearnCommand(database));

        this.use(new GlobalLearnCommand(database));
        this.use(new GlobalUnlearnCommand(database));

        this.on("text", this.unsupport_handler.bind(this));
    }

    async unsupport_handler(context, next) {
        // check handler condition (is command)
        if (!context.message.text.match(/^\/[a-zA-Z@]*$/)) {
            return next();
        }

        await context.replyWithMarkdown(`
Unsupported command!
click /help
        `);
    }
}

exports.Command = Command;
