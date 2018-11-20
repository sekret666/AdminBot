const Telegraf = require("telegraf");

const { Database } = require("../database/db_manager.js");

const { Base } = require("./middleware/base.js");
const { Command } = require("./middleware/command.js");
const { Member } = require("./middleware/member.js");
const { Message } = require("./middleware/message.js");

class Bot {
    constructor(token) {
        this.bot = new Telegraf(token);
        this.database = new Database();
    }

    async init() {
        // init database
        await this.database.init();

        // init middlewares
        this.bot.use(new Base(this.database));
        this.bot.use(new Command(this.database));
        this.bot.use(new Member(this.database));
        this.bot.use(new Message(this.database));
    }

    start() {
        this.bot.startPolling();
    }
}

exports.Bot = Bot;
