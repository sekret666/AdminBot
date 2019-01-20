const Composer = require("telegraf/composer");

const { Adds } = require("./members/adds.js");
const { Removes } = require("./members/removes.js");

class Member extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new Adds(database));
        this.use(new Removes(database));
    }
}

exports.Member = Member;
