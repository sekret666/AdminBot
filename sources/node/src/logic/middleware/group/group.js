const Composer = require("telegraf/composer");

const { Admin } = require("./admin/admin.js");
const { Member } = require("./member/member.js");

class Group extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(this.is_group.bind(this), new Admin(database));
        this.use(this.is_group.bind(this), new Member(database));
    }

    is_group(context, next) {
        if (context.message.chat.type !== "private") {
            console.log("GROUP");
            return next();
        } else {
            console.log("NOT GROUP");
            return next();
        }
    }
}

exports.Group = Group;
