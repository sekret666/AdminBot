const Composer = require("telegraf/composer");

const { StartCommand } = require("./commands/start.js");
const { HelpCommand } = require("./commands/help.js");
const { PingCommand } = require("./commands/ping.js");
const { RegisterCommand } = require("./commands/register.js");

class Command extends Composer {
    constructor(database) {
        super();

        this.database = database;

        // init middlewares
        this.use(new StartCommand(database));
        this.use(new HelpCommand(database));
        this.use(new PingCommand(database));
        this.use(new RegisterCommand(database));
    }
}

exports.Command = Command;
