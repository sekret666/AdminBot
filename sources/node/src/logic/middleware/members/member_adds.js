const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class MemberAddsMember extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.on("new_chat_members", this.handler_member_adds.bind(this));
    }

    async handler_member_adds(context, next) {
        // check handler condition (is member)
        if (await this.database.is_admin(context.message.from.id)) {
            return next();
        }

        // iterate joined members and call handler
        for (let member of context.message.new_chat_members) {
            await this.adds_member.call(this, context, member);
            await this.adds_bot.call(this, context, member);
            await this.adds_me.call(this, context, member);
        }
    }

    async adds_member(context, member) {
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
        await context.deleteMessage();
    }
    async adds_bot(context, member) {
        // check handler condition (joined bot and not me)
        if (!(member.is_bot && !process.env.BOT_TOKEN.includes(member.id))) {
            return;
        }

        // remove bot
        // delete message
        // warm
        await context.telegram.kickChatMember(
            context.message.chat.id,
            member.id
        );
        await context.deleteMessage();
        await warn(
            context,
            this.database,
            context.message.from.id,
            1,
            "Add bot"
        );
    }
    async adds_me(context, member) {
        // check handler condition (joined bot and me)
        if (!(member.is_bot && process.env.BOT_TOKEN.includes(member.id))) {
            return;
        }

        // say sorry
        // left chat
        await context.replyWithMarkdown(`
Sorry dear [${context.message.from.first_name}](tg://user?id=${
            context.message.from.id
        })!

Only my administrators can add me to groups or channels...
        `);
        context.leaveChat();
    }
}

exports.MemberAddsMember = MemberAddsMember;
