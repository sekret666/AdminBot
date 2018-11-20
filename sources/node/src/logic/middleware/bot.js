const Composer = require("telegraf/composer");

const Telegraf = require("telegraf");

class Bot extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(Telegraf.log());
        this.use(this.init_session.call(this));
        this.catch(error => {
            console.error(`Bot error: ${error}`);
        });
    }

    init_session() {
        // init session with sqlite or mysql
        if (process.env.DB_DIALECT === "mysql") {
            // mysql

            // create mysql session middleware
            let TelegrafSession = require("telegraf-session-mysql");
            return new TelegrafSession({
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            }).middleware();
        } else {
            // sqlite

            // get sqlite database path
            let path = require("path");
            let sqlite3 = require("sqlite3").verbose();
            let database_path = path.join(
                process.cwd(),
                process.env.DB_STORAGE
            );

            // create sqlite session middleware
            let TelegrafSession = require("telegraf-session-sqlite");
            return TelegrafSession({
                db: new sqlite3.Database(database_path),
                table_name: "sessions"
            });
        }
    }
}

exports.Bot = Bot;
