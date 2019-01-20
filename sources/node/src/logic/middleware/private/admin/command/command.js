const Composer = require("telegraf/composer");

const { StartCommand } = require("./commands/start.js");
const { HelpCommand } = require("./commands/help.js");
const { PingCommand } = require("./commands/ping.js");

const { AdminsCommand } = require("./commands/admins.js");

const { GlobalLearnsCommand } = require("./commands/global_learns.js");
const { GlobalLearnCommand } = require("./commands/global_learn.js");
const { GlobalUnlearnCommand } = require("./commands/global_unlearn.js");

class Command extends Composer {
    constructor(database) {
        super();

        this.database = database;

        // init middlewares
        this.use(new StartCommand(database));
        this.use(new HelpCommand(database));
        this.use(new PingCommand(database));

        this.use(new AdminsCommand(database));

        this.use(new GlobalLearnsCommand(database));
        this.use(new GlobalLearnCommand(database));
        this.use(new GlobalUnlearnCommand(database));
    }
}

exports.Command = Command;
