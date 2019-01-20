# AdminBot

An opensource Telegram Groups administrator bot

## Modules

1. **database**
2. **logic**

## Building

Commands:

```code
git clone https://github.com/Azhant/AdminBot
cd AdminBot/sources/node
vim .env
npm i
npm run start
```

`.env` file:

```code
BOT_TOKEN="Your Bot Token"
BOT_PASSWORD="Your Bot Password (The password you set for bot admins)"
BOT_ID="Your Bot ID"
DB_DIALECT="<sqlite|mysql>"
DB_HOST="Your Database Host"
DB_NAME="Your Database Name"
DB_USERNAME="Your Database Username"
DB_PASSWORD="Your Database Password"
DB_STORAGE="Your Database Path (Only for sqlite)"
```

## Notes

If you are using `mysql` you should run these queries before starting bot:

```code
ALTER DATABASE <YOUR_DB_NAME> charset=utf8;
```

```code
CREATE TABLE `sessions` (`id` varchar(100) NOT NULL, `session` longtext NOT NULL, PRIMARY KEY (`id`));
```