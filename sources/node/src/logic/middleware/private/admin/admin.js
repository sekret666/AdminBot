const Composer = require("telegraf/composer");

const { Command } = require("./command/command.js");

class Admin extends Composer {
    constructor(database) {
        super();

        this.database = database;

        // init middlewares
        this.use(Composer.acl(this.is_admin.bind(this), new Command(database)));
    }

    async is_admin(context, next) {
        if (await this.database.is_admin(context.message.from.id)) {
            return true;
        } else {
            return false;
        }
    }
}

exports.Admin = Admin;
