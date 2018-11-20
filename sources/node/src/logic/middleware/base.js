const Composer = require("telegraf/composer");

const Telegraf = require("telegraf");

class Base extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(Telegraf.log());
        this.use(this.init_session.call(this));
    }

    init_session() {
        // init session with sqlite or mysql
        if (process.env.DB_DIALECT === "mysql") {
            // mysql
            return this.init_session_mysql.call(this);
        } else {
            // sqlite
            return this.init_session_sqlite.call(this);
        }
    }

    init_session_mysql() {
        // create mysql session middleware
        let TelegrafSession = require("telegraf-session-mysql");
        return new TelegrafSession({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }).middleware();
    }

    init_session_sqlite() {
        // get sqlite database path
        let path = require("path");
        let sqlite3 = require("sqlite3").verbose();
        let database_path = path.join(process.cwd(), process.env.DB_STORAGE);

        // init sessions table
        let database = new sqlite3.Database(database_path);
        database.run(
            "CREATE TABLE IF NOT EXISTS 'sessions' (id varchar(255) primary key, session varchar(255))"
        );

        // create sqlite session middleware
        let TelegrafSession = require("telegraf-session-sqlite");
        return TelegrafSession({
            db: database,
            table_name: "sessions"
        });
    }
}

exports.Base = Base;
