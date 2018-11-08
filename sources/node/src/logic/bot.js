const Telegraf = require("telegraf");
const TelegrafSession = require("telegraf-session-sqlite");

const { Command } = require("./middleware/command.js");
const { Member } = require("./middleware/member.js");
const { Message } = require("./middleware/message.js");

class Bot {
    constructor(token, options, database) {
        this.bot = new Telegraf(token);
        this.database = database;

        // init bot critical middlewares
        // this.bot.use(Telegraf.log());
        // this.bot.use(TelegrafSession(options));
    }

    init() {
        this.bot.use(new Command(this.database));
        this.bot.use(new Member(this.database));
        this.bot.use(new Message(this.database));
    }

    start() {
        this.bot.startPolling();
    }
}

exports.Bot = Bot;
