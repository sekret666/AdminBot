require("dotenv").config();
const { Bot } = require("./logic/bot.js");

const start = async () => {
    // start bot
    let bot = new Bot(process.env.BOT_TOKEN);
    await bot.init();
    bot.start();
};

start()
    .then(result => {
        console.log(`Bot Started: ${result}`);
    })
    .catch(error => {
        console.log(`Bot Error: ${error}`);
    });
