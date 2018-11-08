const Composer = require("telegraf/composer");
const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");

class Member extends Composer {
    constructor() {
        super();

        // init middlewares
        this.on("new_chat_members", this.join_member_handler.bind(this));
        this.on("left_chat_member", this.left_member_handler.bind(this));
    }

    async join_member_handler(context) {
        if (this.has_me(context.message.new_chat_members)) {
            // this bot joined
            this.handle_join_me(context);
        } else {
            // someone joined
            this.handle_join_other(context);
        }
    }

    async left_member_handler(context) {
        if (this.has_me([context.message.left_chat_member])) {
            // this bot removed
            this.handle_left_me(context);
        } else {
            // someone removed
            this.handle_left_other(context);
        }
    }

    handle_join_me(context) {
        // check (context.message.from.id) is admin else left chat
        // if (is_admin(context.message.from.id)) {
        if (true) {
            context.reply(`
            Thanks dear ${context.message.from.first_name}! 
            `);
        } else {
            context.reply(`
            Sorry dear ${
                context.message.from.first_name
            }!\nOnly my administrators can add me to groups or channels...
            `);
            context.leaveChat();
        }
    }

    handle_join_other(context) {
        // check someone who added this is admin else if this is bot remove and warn adder else set metadata child and parent
        // if warns was 3, remove and block and warn parent and remove child data from database
        if (is_admin(context.message.from.id)) {
        } else {
        }
    }

    handle_left_me(context) {
        // remove group informations from database (context.message.chat.id)
    }

    handle_left_other(context) {}

    has_me(members) {
        for (let member of members) {
            if (process.env.BOT_TOKEN.includes(member.id)) {
                return true;
            }
        }
        return false;
    }
}

exports.Member = Member;
