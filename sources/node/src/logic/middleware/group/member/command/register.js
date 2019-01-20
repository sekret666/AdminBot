const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class RegisterCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("register", this.handler_private_member.bind(this));
    }

    async handler_private_member(context, next) {
        // check handler condition (is private and not admin)
        if (
            !(
                context.message.chat.type === "private" &&
                !(await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        // register with password
        if (context.message.text.includes(process.env.BOT_PASSWORD)) {
            await this.database.add_admin(context.message.from.id);

            await context.replyWithMarkdown(`
Register was successful!
            `);
        } else {
            await context.replyWithMarkdown(`
Incorrect password!
            `);
        }
    }
}

exports.RegisterCommand = RegisterCommand;
