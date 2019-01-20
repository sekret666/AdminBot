const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../../../utils.js");

class LearnsCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("learns", this.learns.bind(this));
        this.command(`learns@${process.env.BOT_ID}`, this.learns.bind(this));
    }

    async learns(context, next) {
        // get spams list
        let spams = await this.database.get_spams(context.message.chat.id);

        // map spams to text
        spams = spams.map(spam => spam.dataValues.text);

        // send spams list
        await context.replyWithMarkdown(`
Spams list:
${spams.join("\n")}
        `);
    }
}

exports.LearnsCommand = LearnsCommand;
