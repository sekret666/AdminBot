const { Bot } = require("./logic/bot.js");

const Telegarf = require("telegraf");

const start = () => {
    // init env vars
    require("dotenv").config();
    let token = process.env.BOT_TOKEN;

    // init sqlite
    let path = require("path");
    let sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database(path.join(process.cwd(), "public", "kgb.db"));
    let options = {
        db: db,
        table_name: "kgb"
    };

    // start bot
    let bot = new Bot(token, options);
    bot.init();
    bot.start();
};

start();