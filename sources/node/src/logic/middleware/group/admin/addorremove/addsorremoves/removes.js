const Composer = require("telegraf/composer");

class RemovesMember extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.on("left_chat_member", this.removes.bind(this));
    }

    async removes(context, next) {
        // delete message
        await context.deleteMessage();
    }
}

exports.RemovesMember = RemovesMember;
