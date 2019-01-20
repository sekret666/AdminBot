const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../utils.js");

const DENY_LINK = "DENY_LINK";

class LinkMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.link.bind(this));
    }

    async link(context, next) {
        // check handler condition (group denied links)
        if (
            !(await this.database.has_rule(context.message.chat.id, DENY_LINK))
        ) {
            return next();
        }

        // check message has link

        // not implemented yet!
        return next();
    }
}

exports.LinkMessage = LinkMessage;
