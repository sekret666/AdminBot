require("dotenv").config();
const { Bot } = require("./logic/bot.js");
const { Database } = require("./database/db_manager.js");

const Telegarf = require("telegraf");

const start = async () => {
    // init sqlite
    let path = require("path");
    let sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database(
        path.join(process.cwd(), process.env.DB_STORAGE)
    );
    let options = {
        db: db,
        table_name: "sessions"
    };

    // init database
    let database = new Database();
    await database.init();

    // start bot
    let bot = new Bot(process.env.BOT_TOKEN, options, database);
    bot.init();
    bot.start();
};

start()
    .then(result => {
        console.log(`Bot Started`);
    })
    .catch(error => {
        console.log(`Bot Error: ${error}`);
    });
