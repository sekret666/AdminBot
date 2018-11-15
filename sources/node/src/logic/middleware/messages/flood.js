const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class FloodMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.flood_handler.bind(this));
    }

    async flood_handler(context, next) {
        // not implemented yet!
        return next();
    }
}

exports.FloodMessage = FloodMessage;
