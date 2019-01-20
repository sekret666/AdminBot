const Composer = require("telegraf/composer");

const { Admin } = require("./admin/admin.js");
const { Member } = require("./member/member.js");

class Private extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(Composer.acl(this.is_private.bind(this), new Admin(database)));
        this.use(
            Composer.acl(this.is_private.bind(this), new Member(database))
        );
    }

    is_private(context, next) {
        if (context.message.chat.type === "private") {
            return true;
        } else {
            return false;
        }
    }
}

exports.Private = Private;
