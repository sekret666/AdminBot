const Composer = require("telegraf/composer");

class Command extends Composer {
    constructor() {
        super();

        // init middlewares
        this.command("start", this.start_handler);
        this.command("help", this.help_handler);
        this.command("report", this.report_handler);
        this.command("login", this.login_handler);
        this.command("logout", this.logout_handler);
        this.command("warn", this.warn_handler);
        this.command("unwarn", this.unwarn_handler);
        this.command("learn", this.learn_handler);
        this.command("unlearn", this.unlearn_handler);
    }

    async start_handler(context) {}

    async help_handler(context) {}

    async report_handler(context) {}

    async login_handler(context) {}

    async logout_handler(context) {}

    async warn_handler(context) {}

    async unwarn_handler(context) {}

    async learn_handler(context) {}

    async unlearn_handler(context) {}
}

exports.Command = Command;
