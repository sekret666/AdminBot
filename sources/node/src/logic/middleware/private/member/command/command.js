const Composer = require("telegraf/composer");

class Command extends Composer {
    constructor(database) {
        super();

        this.database = database;

        // init middlewares
    }
}

exports.Command = Command;
