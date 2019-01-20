const Composer = require("telegraf/composer");

class GlobalLearnsCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("globallearns", this.global_learns.bind(this));
        this.command(
            `globallearns@${process.env.BOT_ID}`,
            this.global_learns.bind(this)
        );
    }

    async global_learns(context, next) {
        // get global spams list
        let global_spams = await this.database.get_global_spams();

        // map global spams to text
        global_spams = global_spams.map(
            global_spam => global_spam.dataValues.text
        );

        // send global spams list
        await context.replyWithMarkdown(`
Global spams list:
${global_spams.join("\n")}
        `);
    }
}

exports.GlobalLearnsCommand = GlobalLearnsCommand;
