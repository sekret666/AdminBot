const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../utils.js");

const DENY_LINK = "DENY_LINK";

class HasLinkMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // set rule to database
        this.database.find_or_create_rule(DENY_LINK);

        // init middlewares
        this.use(this.link.bind(this));
    }

    async link(context, next) {
        // check handler condition (group denyed links and message has link)
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

exports.HasLinkMessage = HasLinkMessage;
