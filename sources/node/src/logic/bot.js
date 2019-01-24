const Telegraf = require("telegraf");

const { Database } = require("../database/db_manager.js");

const { Base } = require("./middleware/base.js");
const { Group } = require("./middleware/group/group.js");
const { Private } = require("./middleware/private/private.js");

class Bot {
    constructor(token) {
        this.bot = new Telegraf(token);
        this.database = new Database();
        this.bot.catch(error => {
            console.error(`Bot error: ${error}`);
        });
    }

    async init() {
        // init database
        await this.database.init();

        // init middlewares
        this.bot.use(new Base(this.database));
        this.bot.use(new Group(this.database));
        this.bot.use(new Private(this.database));
    }

    start() {
        this.bot.startPolling();
    }
}

exports.Bot = Bot;
