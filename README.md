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
cd src/database
mkdir db
cd db
vim db_config.json

npm i
npm run start
```

`.env` file:

```code
BOT_TOKEN="Your Bot Token"
BOT_PASSWORD="Your Bot Password"
BOT_ID="Your Bot ID"
```

`database/db/db_config.json` file:

```code
{
    "dbName": "Your Database Name",
    "username": "Your Database User",
    "password": "Your Database Password"
}

```
