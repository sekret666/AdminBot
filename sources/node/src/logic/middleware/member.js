const Composer = require("telegraf/composer");
const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");

class Member extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.on(
            "new_chat_members",
            this.join_member_handler_admin_member.bind(this)
        );
        this.on(
            "new_chat_members",
            this.join_member_handler_admin_bot.bind(this)
        );
        this.on(
            "new_chat_members",
            this.join_member_handler_admin_me.bind(this)
        );
        this.on(
            "new_chat_members",
            this.join_member_handler_member_member.bind(this)
        );
        this.on(
            "new_chat_members",
            this.join_member_handler_member_bot.bind(this)
        );
        this.on(
            "new_chat_members",
            this.join_member_handler_member_me.bind(this)
        );

        // check handler condition (is private)
        if (context.message.chat.type !== "private") {
            return next();
        }

        this.on("left_chat_member", this.left_member_handler.bind(this));
    }

    async join_member_handler(context, next) {
        console.log("A");
        return next();

        for (let member of context.message.new_chat_members) {
            /*
                $warn = {
                    // warn a
                    a.add_warns();
                    if(a.get_warns() > 3){
                        block_forever(a);
                        $remove(a);
                    }
                };
                $unwarn = {

                };
                
                $added = {
                    // a added b
                    a.set_parent(b);
                    b.add_child(a);
                    b.set_warns(0);
                };
                $removed = {
                    // * removed b
                    a = b.get_parent();
                    a.remove_child(b);
                    remove_metadata(b);
                    remove_warns(b);
                };
                if(bot) {
                    if(me) {
                        if(!admin) {
                            // say sorry, left chat, set cleartimes to []
                        } else {
                            // say thanks, set cleartimes to []
                        }
                    } else {
                        if(!admin) {
                            // a added bot
                            remove(bot);
                            $warn(a);
                        } else {
                            // do nothing
                        }
                    }
                } else {
                    // added
                }
            */
            if (member.is_bot) {
                if (process.env.BOT_TOKEN.includes(member.id)) {
                } else {
                }
            } else {
            }
        }

        if (this.has_me()) {
            // this bot joined
            this.handle_join_me(context);
        } else if (this.has_bot(context.message.new_chat_members)) {
            // bot joined
            this.handle_join_bot(context);
        } else {
            // someone joined
            this.handle_join_other(context);
        }
    }

    async left_member_handler(context) {
        console.log("B");
        for (let member of [context.message.left_chat_member]) {
            // me => is_admin?
            // bot => is_admin?
            // other
        }

        if (this.has_me([context.message.left_chat_member])) {
            // this bot removed
            this.handle_left_me(context);
        } else if (this.has_bot([context.message.left_chat_member])) {
            // bot removed
            this.handle_left_bot(context);
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

        // finally remove message
        context.deleteMessage();
    }

    handle_join_bot(context) {}

    handle_join_other(context) {
        // check someone who added this is admin else if this is bot remove and warn adder else set metadata child and parent
        // if warns was 3, remove and block and warn parent and remove child data from database
        if (!is_admin(context.message.from.id)) {
        }

        // finally remove message
        context.deleteMessage();
    }

    handle_left_me(context) {
        // remove group informations from database (context.message.chat.id)
    }

    handle_left_bot(context) {}

    handle_left_other(context) {
        // finally remove message
        context.deleteMessage();
    }

    has_me(members) {
        for (let member of members) {
            if (process.env.BOT_TOKEN.includes(member.id)) {
                return true;
            }
        }
        return false;
    }

    has_bot(members) {
        for (let member of members) {
            if (member.is_bot) {
                return true;
            }
        }
        return false;
    }
}

exports.Member = Member;
