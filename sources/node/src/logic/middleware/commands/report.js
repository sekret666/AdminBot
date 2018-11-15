const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class ReportCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("report", this.handler_public_member.bind(this));
        this.command(
            `report@${process.env.BOT_ID}`,
            this.handler_public_member.bind(this)
        );
    }

    async handler_public_member(context, next) {
        // check handler condition (is public and not admin)
        if (
            !(context.message.chat.type !== "private")
            // !(await this.database.is_admin(context.message.from.id))
        ) {
            return next();
        }

        if ("reply_to_message" in context.message) {
            // report message to admins
            for (let admin_id of await this.database.get_admins()) {
                // report, the reporter message
                context.telegram.forwardMessage(
                    admin_id.tgId,
                    context.message.chat.id,
                    context.message.message_id
                );

                // report, the reported message
                context.telegram.forwardMessage(
                    admin_id.tgId,
                    context.message.chat.id,
                    context.message.reply_to_message.message_id
                );
            }

            context.reply(`
Message reported to admins!
            `);
        } else {
            context.reply(`
Please reply a message to report!
            `);
        }
    }
}

exports.ReportCommand = ReportCommand;
