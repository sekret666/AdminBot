const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../utils.js");

class Member extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.on("new_chat_members", this.join_member_handler_admin.bind(this));
        this.on("new_chat_members", this.join_member_handler_member.bind(this));

        this.on("left_chat_member", this.left_member_handler.bind(this));
    }

    async join_member_handler_admin(context, next) {
        // check handler condition (is admin)
        if (!(await this.database.is_admin(context.message.from.id))) {
            return next();
        }

        // iterate joined members and call handler
        for (let member of context.message.new_chat_members) {
            await this.admin_add_member.call(this, context, member);
            await this.admin_add_bot.call(this, context, member);
            await this.admin_add_me.call(this, context, member);
        }
    }
    async join_member_handler_member(context, next) {
        // check handler condition (is member)
        if (await this.database.is_admin(context.message.from.id)) {
            return next();
        }

        // iterate joined members and call handler
        for (let member of context.message.new_chat_members) {
            await this.member_add_member.call(this, context, member);
            await this.member_add_bot.call(this, context, member);
            await this.member_add_me.call(this, context, member);
        }
    }

    async left_member_handler(context, next) {
        // delete message
        context.deleteMessage();
    }

    async admin_add_member(context, member) {
        // check handler condition (joined member)
        if (member.is_bot) {
            return;
        }

        // set parent
        await this.database.set_parent(
            context.message.chat.id,
            member.id,
            context.message.from.id
        );

        // delete message
        context.deleteMessage();
    }
    async admin_add_bot(context, member) {
        // check handler condition (joined bot and not me)
        if (!(member.is_bot && !process.env.BOT_TOKEN.includes(member.id))) {
            return;
        }

        // delete message
        context.deleteMessage();
    }
    async admin_add_me(context, member) {
        // check handler condition (joined bot and me)
        if (!(member.is_bot && process.env.BOT_TOKEN.includes(member.id))) {
            return;
        }

        // create group configs in database
        await this.database.find_or_create_group(context.message.chat.id);

        // say thanks
        context.replyWithMarkdown(`
Thanks dear [${context.message.from.first_name}](tg://user?id=${
            context.message.from.id
        })!
        `);
    }
    async member_add_member(context, member) {
        // check handler condition (joined member)
        if (member.is_bot) {
            return;
        }

        // set parent
        await this.database.set_parent(
            context.message.chat.id,
            member.id,
            context.message.from.id
        );

        // delete message
        context.deleteMessage();
    }
    async member_add_bot(context, member) {
        // check handler condition (joined bot and not me)
        if (!(member.is_bot && !process.env.BOT_TOKEN.includes(member.id))) {
            return;
        }

        // remove bot
        // delete message
        // warm
        context.telegram.kickChatMember(context.message.chat.id, member.id);
        context.deleteMessage();
        warn(context, this.database, context.message.from.id);
    }
    async member_add_me(context, member) {
        // check handler condition (joined bot and me)
        if (!(member.is_bot && process.env.BOT_TOKEN.includes(member.id))) {
            return;
        }

        // say sorry
        // left chat
        context.replyWithMarkdown(`
Sorry dear [${context.message.from.first_name}](tg://user?id=${
            context.message.from.id
        })!
Only my administrators can add me to groups or channels...
        `);
        context.leaveChat();
    }
}

exports.Member = Member;
