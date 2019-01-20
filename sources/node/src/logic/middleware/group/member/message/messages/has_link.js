const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class HasLinkMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.has_link_handler.bind(this));
    }

    async has_link_handler(context, next) {
        // not implemented yet!
        return next();
    }
}

exports.HasLinkMessage = HasLinkMessage;
