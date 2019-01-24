const Composer = require("telegraf/composer");

const { HelpCommand } = require("./commands/help.js");

const { InitCommand } = require("./commands/init.js");
const { LeaveCommand } = require("./commands/leave.js");
const { DeleteCommand } = require("./commands/delete.js");

const { WarnCommand } = require("./commands/warn.js");
const { UnwarnCommand } = require("./commands/unwarn.js");

const { LearnsCommand } = require("./commands/learns.js");
const { LearnCommand } = require("./commands/learn.js");
const { UnlearnCommand } = require("./commands/unlearn.js");

const { AllRulesCommand } = require("./commands/allrules.js");
const { RulesCommand } = require("./commands/rules.js");
const { AddRuleCommand } = require("./commands/addrule.js");
const { RemoveRuleCommand } = require("./commands/removerule.js");

class Command extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new HelpCommand(database));

        this.use(new InitCommand(database));
        this.use(new LeaveCommand(database));
        this.use(new DeleteCommand(database));

        this.use(new WarnCommand(database));
        this.use(new UnwarnCommand(database));

        this.use(new LearnsCommand(database));
        this.use(new LearnCommand(database));
        this.use(new UnlearnCommand(database));

        this.use(new AllRulesCommand(database));
        this.use(new RulesCommand(database));
        this.use(new AddRuleCommand(database));
        this.use(new RemoveRuleCommand(database));
    }
}

exports.Command = Command;
