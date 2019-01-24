echo -n Enter bot token:
read -s BOT_TOKEN
echo

echo -n Enter bot password:
read -s BOT_PASSWORD
echo

echo -n Enter bot ID:
read BOT_ID

echo -n Enter database dialect\(mysql or sqlite\):
read DB_DIALECT

echo -n Enter database host:
read DB_HOST

echo -n Enter database name:
read DB_NAME

echo -n Enter database username:
read DB_USERNAME

echo -n Enter database password:
read -s DB_PASSWORD
echo

echo -n Enter database storage\(only for sqlite\)
read DB_STORAGE

echo "BOT_TOKEN=$BOT_TOKEN
BOT_PASSWORD=$BOT_PASSWORD
BOT_ID=$BOT_ID
DB_DIALECT=$DB_DIALECT
DB_HOST=$DB_HOST
DB_NAME=$DB_NAME
DB_USERNAME=$DB_USERNAME
DB_PASSWORD=$DB_PASSWORD
DB_STORAGE=$DB_STORAGE
" > .env