const Composer = require("telegraf/composer");

const { Admin } = require("./admin/admin.js");
const { Member } = require("./member/member.js");

class Private extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(this.is_private.bind(this), new Admin(database));
        this.use(this.is_private.bind(this), new Member(database));
    }

    is_private(context, next) {
        if (context.message.chat.type === "private") {
            console.log("PRIVATE");
            return next();
        } else {
            console.log("NOT PRIVATE");
            return next();
        }
    }
}

exports.Private = Private;
