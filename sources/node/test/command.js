const Composer = require("telegraf/composer");

const { LeaveCommand } = require("./commands/leave.js");
const { DeleteCommand } = require("./commands/delete.js");

const { WarnCommand } = require("./commands/warn.js");
const { UnwarnCommand } = require("./commands/unwarn.js");

const { LearnsCommand } = require("./commands/learns.js");
const { LearnCommand } = require("./commands/learn.js");
const { UnlearnCommand } = require("./commands/unlearn.js");

class Command extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new HelpCommand(database));

        this.use(new LeaveCommand(database));
        this.use(new DeleteCommand(database));

        this.use(new WarnCommand(database));
        this.use(new UnwarnCommand(database));

        this.use(new LearnsCommand(database));
        this.use(new LearnCommand(database));
        this.use(new UnlearnCommand(database));

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
