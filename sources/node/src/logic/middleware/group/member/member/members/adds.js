const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../utils.js");

class Adds extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.on("new_chat_members", this.adds.bind(this));
    }

    async adds(context, next) {
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

        // get warn number
        // remove bot
        // delete message
        // warm
        let warn_number = (await this.database.get_group_settings(context.message.chat.id)).;
        await context.telegram.kickChatMember(
            context.message.chat.id,
            member.id
        );
        await context.deleteMessage();
        await warn(
            context,
            this.database,
            context.message.from.id,
            ,
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

exports.Adds = Adds;
