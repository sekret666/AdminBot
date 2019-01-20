const Composer = require("telegraf/composer");

const { AddsMember } = require("./addsorremoves/adds.js");
const { RemovesMember } = require("./addsorremoves/removes.js");

class AddOrRemove extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new AddsMember(database));
        this.use(new RemovesMember(database));
    }
}

exports.AddOrRemove = AddOrRemove;
