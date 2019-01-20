const Composer = require("telegraf/composer");

const { Command } = require("./command/command.js");

class Member extends Composer {
    constructor(database) {
        super();

        this.database = database;

        // init middlewares
        this.use(this.is_member.bind(this), new Command(database));
        this.use(this.is_member.bind(this), new AddOrRemove(database));
        this.use(this.is_member.bind(this), new Message(database));
    }

    async is_member(context, next) {
        if (!(await this.database.is_admin(context.message.from.id))) {
            console.log("MEMBER");
            return next();
        } else {
            console.log("NOT MEMber");
            return next();
        }
    }
}

exports.Member = Member;
