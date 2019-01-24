const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../utils.js");

class FileMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.file.bind(this));
    }

    async file(context, next) {
        // check handler condition (group denied files)
        if (
            !(await this.database.has_rule(
                context.message.chat.id,
                "DENY_FILE"
            ))
        ) {
            return next();
        }

        // check message has file

        // not implemented yet!
        return next();
    }
}

exports.FileMessage = FileMessage;
