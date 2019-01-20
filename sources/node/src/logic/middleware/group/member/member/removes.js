const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class RemovesMember extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.on("left_chat_member", this.handler_removes.bind(this));
    }

    async handler_removes(context, next) {
        // delete message
        await context.deleteMessage();
    }
}

exports.RemovesMember = RemovesMember;
