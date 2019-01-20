const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class ReportCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("report", this.report.bind(this));
        this.command(`report@${process.env.BOT_ID}`, this.report.bind(this));
    }

    async report(context, next) {
        if ("reply_to_message" in context.message) {
            // report message to admins
            for (let admin_id of await this.database.get_admins()) {
                // report, the reporter message
                await context.telegram.forwardMessage(
                    admin_id.tgId,
                    context.message.chat.id,
                    context.message.message_id
                );

                // report, the reported message
                await context.telegram.forwardMessage(
                    admin_id.tgId,
                    context.message.chat.id,
                    context.message.reply_to_message.message_id
                );
            }

            await context.replyWithMarkdown(`
Message reported to admins!
            `);
        } else {
            await context.replyWithMarkdown(`
Please reply a message to report!
            `);
        }
    }
}

exports.ReportCommand = ReportCommand;
