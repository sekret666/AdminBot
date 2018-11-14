const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../utils.js");

class Command extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("start", this.start_handler_private.bind(this));

        this.command("help", this.help_handler_private_admin.bind(this));
        this.command("help", this.help_handler_private_member.bind(this));
        this.command("help", this.help_handler_public_admin.bind(this));
        this.command("help", this.help_handler_public_member.bind(this));
        this.command(
            `help@${process.env.BOT_ID}`,
            this.help_handler_public_admin.bind(this)
        );
        this.command(
            `help@${process.env.BOT_ID}`,
            this.help_handler_public_member.bind(this)
        );

        this.command("report", this.report_handler_public_member.bind(this));
        this.command(
            `report@${process.env.BOT_ID}`,
            this.report_handler_public_member.bind(this)
        );

        this.command(
            "register",
            this.register_handler_private_member.bind(this)
        );

        this.command("warn", this.warn_handler_public_admin.bind(this));
        this.command("unwarn", this.unwarn_handler_public_admin.bind(this));
        this.command(
            `warn@${process.env.BOT_ID}`,
            this.warn_handler_public_admin.bind(this)
        );
        this.command(
            `unwarn@${process.env.BOT_ID}`,
            this.unwarn_handler_public_admin.bind(this)
        );

        this.command("learn", this.learn_handler_private_admin.bind(this));
        this.command("learn", this.learn_handler_public_admin.bind(this));
        this.command(
            `learn@${process.env.BOT_ID}`,
            this.learn_handler_public_admin.bind(this)
        );

        this.command("unlearn", this.unlearn_handler_private_admin.bind(this));
        this.command("unlearn", this.unlearn_handler_public_admin.bind(this));
        this.command(
            `unlearn@${process.env.BOT_ID}`,
            this.unlearn_handler_public_admin.bind(this)
        );

        this.on("text", this.unsupport_handler.bind(this));
    }

    async start_handler_private(context, next) {
        // check handler condition (is private)
        if (!(context.message.chat.type === "private")) {
            return next();
        }

        context.reply(`
Hi dear ${context.message.from.first_name}!
click /help
        `);
    }

    async help_handler_private_admin(context, next) {
        // check handler condition (is private and admin)
        if (
            !(
                context.message.chat.type === "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        context.reply(`
Supported private admin commands:
/start
/help
/learn {word}
/unlearn {word}
        `);
    }
    async help_handler_private_member(context, next) {
        // check handler condition (is private and not admin)
        if (
            !(
                context.message.chat.type === "private" &&
                !(await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        context.reply(`
Supported private member commands:
/start
/help
/register {password}
        `);
    }
    async help_handler_public_admin(context, next) {
        // check handler condition (is public and admin)
        if (
            !(
                context.message.chat.type !== "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        context.reply(`
Supported public admin commands:
/help
/learn {word}
/unlearn {word}
/warn
/unwarn
        `);
    }
    async help_handler_public_member(context, next) {
        // check handler condition (is public and not admin)
        if (
            !(
                context.message.chat.type !== "private" &&
                !(await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        context.reply(`
Supported public member commands:
/help
/report
        `);
    }

    async report_handler_public_member(context, next) {
        // check handler condition (is public and not admin)
        if (
            !(
                context.message.chat.type !== "private" &&
                !(await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        if ("reply_to_message" in context.message) {
            // report message to admins
            for (let admin_id of await this.database.get_admins()) {
                // report, the reporter message
                context.telegram.forwardMessage(
                    admin_id,
                    context.message.chat.id,
                    context.message.message_id
                );

                // report, the reported message
                context.telegram.forwardMessage(
                    admin_id,
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

    async register_handler_private_member(context, next) {
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

            context.reply(`
Register was successful!
            `);
        } else {
            context.reply(`
Incorrect password!
            `);
        }
    }

    async warn_handler_public_admin(context, next) {
        // check handler condition (is public and admin)
        if (
            !(
                context.message.chat.type !== "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        // warn message sender
        if ("reply_to_message" in context.message) {
            warn(
                context,
                this.database,
                context.message.reply_to_message.from.id
            );
        } else {
            context.reply(`
Please reply the member message to warn!
            `);
        }
    }
    async unwarn_handler_public_admin(context, next) {
        // check handler condition (is public and admin)
        if (
            !(
                context.message.chat.type !== "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        // unwarn message sender
        if ("reply_to_message" in context.message) {
            unwarn(
                context,
                this.database,
                context.message.reply_to_message.from.id
            );
        } else {
            context.reply(`
Please reply the member message to unwarn!
            `);
        }
    }

    async learn_handler_private_admin(context, next) {
        // check handler condition (is private and admin)
        if (
            !(
                context.message.chat.type === "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        // check in reply of message
        let spam_words = [];
        if ("reply_to_message" in context.message) {
            // reply learn
            spam_words = context.message.reply_to_message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        } else {
            // local group learn word
            spam_words = context.message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        }

        // global learn all words
        for (let word of spam_words) {
            await this.database.add_global_spam(word);
        }
        context.reply(`
Words globally learned!
        `);
    }
    async learn_handler_public_admin(context, next) {
        // check handler condition (is public and admin)
        if (
            !(
                context.message.chat.type !== "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        // check in reply of message
        let spam_words = [];
        if ("reply_to_message" in context.message) {
            // reply learn
            spam_words = context.message.reply_to_message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        } else {
            // local group learn word
            spam_words = context.message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        }

        // learn all words
        for (let word of spam_words) {
            await this.database.add_spam(context.message.chat.id, word);
        }
        context.reply(`
Words learned!
        `);
    }

    async unlearn_handler_private_admin(context, next) {
        // check handler condition (is private and admin)
        if (
            !(
                context.message.chat.type === "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        // check in reply of message
        let spam_words = [];
        if ("reply_to_message" in context.message) {
            // reply learn
            spam_words = context.message.reply_to_message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        } else {
            // local group learn word
            spam_words = context.message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        }

        // unlearn global all words
        for (let word of spam_words) {
            await this.database.remove_global_spam(word);
        }
        context.reply(`
Words globally unlearned!
        `);
    }
    async unlearn_handler_public_admin(context, next) {
        // check handler condition (is public and admin)
        if (
            !(
                context.message.chat.type !== "private" &&
                (await this.database.is_admin(context.message.from.id))
            )
        ) {
            return next();
        }

        // check in reply of message
        let spam_words = [];
        if ("reply_to_message" in context.message) {
            // reply learn
            spam_words = context.message.reply_to_message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        } else {
            // local group learn word
            spam_words = context.message.text
                .replace(/^\/learn@?[a-zA-Z]* /, "")
                .split(" ");
        }

        // unlearn all words
        for (let word of spam_words) {
            await this.database.remove_spam(context.message.chat.id, word);
        }
        context.reply(`
Words unlearned!
        `);
    }

    async unsupport_handler(context, next) {
        // check handler condition (is command)
        if (!context.message.text.match(/^\/[a-zA-Z@]*$/)) {
            return next();
        }

        context.reply(`
Unsupported command!
click /help
        `);
    }
}

exports.Command = Command;
