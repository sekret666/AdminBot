const Composer = require("telegraf/composer");

const { MemberAddsMember } = require("./members/member_adds.js");
const { AdminAddsMember } = require("./members/admin_adds.js");
const { RemovesMember } = require("./members/removes.js");

class Member extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new MemberAddsMember(database));
        this.use(new AdminAddsMember(database));
        this.use(new RemovesMember(database));
    }
}

exports.Member = Member;
