const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../utils.js");

class Member extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.on("new_chat_members", (context, next) => {
            // iterate joined members and call handler
            for (let member of context.message.new_chat_members) {
                this.join_member_handler_admin_member.call(
                    this,
                    context,
                    this.join_member_handler_admin_bot.bind(this),
                    member
                );
            }
        });
        this.on("new_chat_members", (context, next) => {
            // iterate joined members and call handler
            for (let member of context.message.new_chat_members) {
                this.join_member_handler_admin_bot.call(
                    this,
                    context,
                    this.join_member_handler_admin_me.bind(this),
                    member
                );
            }
        });
        this.on("new_chat_members", (context, next) => {
            // iterate joined members and call handler
            for (let member of context.message.new_chat_members) {
                this.join_member_handler_admin_me.call(
                    this,
                    context,
                    this.join_member_handler_member_member.bind(this),
                    member
                );
            }
        });
        this.on("new_chat_members", (context, next) => {
            // iterate joined members and call handler
            for (let member of context.message.new_chat_members) {
                this.join_member_handler_member_member.call(
                    this,
                    context,
                    this.join_member_handler_member_bot.bind(this),
                    member
                );
            }
        });
        this.on("new_chat_members", (context, next) => {
            // iterate joined members and call handler
            for (let member of context.message.new_chat_members) {
                this.join_member_handler_member_bot.call(
                    this,
                    context,
                    this.join_member_handler_member_me.bind(this),
                    member
                );
            }
        });
        this.on("new_chat_members", (context, next) => {
            // iterate joined members and call handler
            for (let member of context.message.new_chat_members) {
                this.join_member_handler_member_me.call(
                    this,
                    context,
                    null,
                    member
                );
            }
        });

        this.on("left_chat_member", (context, next) => {
            this.left_member_handler.call(
                this,
                context,
                next,
                context.message.left_chat_member
            );
        });
    }

    async join_member_handler_admin_member(context, next) {
        // check handler condition (is admin and joined member)
        if (
            !(this.database.is_admin(context.message.from.id) && !member.is_bot)
        ) {
            return next();
        }

        // delete message
        context.deleteMessage();
    }
    async join_member_handler_admin_bot(context, next, member) {
        // check handler condition (is admin and joined bot and not me)
        if (
            !(
                this.database.is_admin(context.message.from.id) &&
                member.is_bot &&
                !process.env.BOT_TOKEN.includes(member.id)
            )
        ) {
            return next();
        }

        // delete message
        context.deleteMessage();
    }
    async join_member_handler_admin_me(context, next, member) {
        // check handler condition (is admin and joined bot and me)
        if (
            !(
                this.database.is_admin(context.message.from.id) &&
                member.is_bot &&
                process.env.BOT_TOKEN.includes(member.id)
            )
        ) {
            return next();
        }

        // say thanks
        context.reply(`
Thanks dear ${context.message.from.first_name}! 
        `);
    }
    async join_member_handler_member_member(context, next, member) {
        // check handler condition (is member and joined member)
        if (
            !(
                !this.database.is_admin(context.message.from.id) &&
                !member.is_bot
            )
        ) {
            return next();
        }

        // delete message
        context.deleteMessage();
    }
    async join_member_handler_member_bot(context, next, member) {
        // check handler condition (is member and joined bot and not me)
        if (
            !(
                !this.database.is_admin(context.message.from.id) &&
                member.is_bot &&
                !process.env.BOT_TOKEN.includes(member.id)
            )
        ) {
            return next();
        }

        // remove bot
        // delete message
        // warm
        context.telegram.kickChatMember(context.message.chat.id, member.id);
        context.deleteMessage();
        warn(context, this.database);
    }
    async join_member_handler_member_me(context, next, member) {
        // check handler condition (is member and joined bot and me)
        if (
            !(
                !this.database.is_admin(context.message.from.id) &&
                member.is_bot &&
                process.env.BOT_TOKEN.includes(member.id)
            )
        ) {
            if (next != null) {
                return next();
            } else {
                return;
            }
        }

        // say sorry
        // left chat
        context.reply(`
Sorry dear ${context.message.from.first_name}!
Only my administrators can add me to groups or channels...
        `);
        context.leaveChat();
    }

    async left_member_handler(context, next, member) {
        // delete message
        context.deleteMessage();
    }
}

exports.Member = Member;
