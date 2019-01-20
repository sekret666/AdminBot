const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../utils.js");

const DENY_LINK = "DENY_LINK";

class LinkMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.link.bind(this));
    }

    async link(context, next) {
        // get group rule link deny regexes
        let regexes = (await this.database.get_group_rules(
            context.message.chat.id
        ))
            .map(rule => rule.dataValues.type)
            .filter(rule => rule.includes("DENY_LINK_"))
            .map(rule => rule.replace("DENY_LINK_", ""))
            .map(regex => new RegExp(regex));

        // get message url entities
        let urls = this.get_urls(context);

        // for all urls try match at least one regex denied
        for (let url of urls) {
            for (let regex of regexes) {
                if (regex.test(url)) {
                    // try warn
                    // delete message
                    if (
                        (await warn(
                            context,
                            this.database,
                            context.message.from.id,
                            1,
                            "Send link"
                        )) > 0
                    ) {
                        await context.deleteMessage();
                    }
                    return;
                }
            }
        }

        // not find any denied link
        return next();
    }

    get_urls(context) {
        return (context.message.entities || [])
            .filter(entity => entity.type === "url")
            .map(entity =>
                context.message.text.substring(
                    entity.offset,
                    entity.offset + entity.length
                )
            );
    }

    get_denies() {}
}

exports.LinkMessage = LinkMessage;
