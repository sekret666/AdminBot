const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class FloodMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // set flood detector object
        this.floods = {};

        // init middlewares
        this.use(this.flood_handler.bind(this));
    }

    async flood_handler(context, next) {
        // check handler condition (is public)
        if (!(context.message.chat.type !== "private")) {
            return next();
        }

        // check floods has this chat and message from same user id and low latency
        if (this.is_flood.call(this, context)) {
            this.floods[context.message.chat.id] = {
                date: Date.now(),
                from: context.message.from.id,
                count: this.floods[context.message.chat.id].count + 1
            };
        } else {
            this.floods[context.message.chat.id] = {
                date: Date.now(),
                from: context.message.from.id,
                count: 1
            };
        }

        // check floodity
        if (this.floods[context.message.chat.id].count < 10) {
            return next();
        }

        // flood detected, so try warn
        await warn(
            context,
            this.database,
            context.message.from.id,
            1,
            "Message flood"
        );
    }

    is_flood(context) {
        // check floods has this chat and message from same user id and low latency
        return (
            context.message.chat.id in this.floods &&
            this.floods[context.message.chat.id].from ==
                context.message.from.id &&
            Date.now() - this.floods[context.message.chat.id].date < 3000
        );
    }
}

exports.FloodMessage = FloodMessage;
