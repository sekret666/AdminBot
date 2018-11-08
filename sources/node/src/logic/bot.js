const Telegraf = require("telegraf");
const TelegrafSession = require("telegraf-session-sqlite");

const { Command } = require("./middleware/command.js");
const { Member } = require("./middleware/member.js");
const { Message } = require("./middleware/message.js");

class Bot {
    constructor(token, options) {
        this.bot = new Telegraf(token);

        // init bot critical middlewares
        // this.bot.use(Telegraf.log());
        // this.bot.use(TelegrafSession(options));
    }

    init() {
        this.bot.use((context, next) => {
            console.log(context.message);
        });
        this.bot.use(new Command());
        this.bot.use(new Member());
        this.bot.use(new Message());
    }

    start() {
        this.bot.startPolling();
    }
}

exports.Bot = Bot;
