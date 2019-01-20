const Composer = require("telegraf/composer");

class AddsMember extends Composer {
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

        // delete message
        await context.deleteMessage();
    }

    async adds_me(context, member) {
        // check handler condition (joined bot and me)
        if (!(member.is_bot && process.env.BOT_TOKEN.includes(member.id))) {
            return;
        }

        // create group configs in database
        await this.database.find_or_create_group(context.message.chat.id);

        // say thanks
        await context.replyWithMarkdown(`
Thanks dear [${context.message.from.first_name}](tg://user?id=${
            context.message.from.id
        })!
        `);
    }
}

exports.AddsMember = AddsMember;
