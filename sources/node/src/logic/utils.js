const warn = async (context, database, id) => {
    // check id is exists
    try {
        context.telegram.getChatMember(context.message.chat.id, id);
    } catch (error) {
        return;
    }

    // add warns
    let warns = await database.get_warns(context.message.chat.id, id);
    if (warns <= 2) {
        warns++;
        await database.set_warns(context.message.chat.id, id, warns);
    }

    // send warn message
    context.reply(`
Warns number ${id}: ${warns} of 3
    `);

    // check kick warn
    if (warns >= 3) {
        context.telegram.kickChatMember(context.message.chat.id, id);

        // warn parent
        warn(
            context,
            database,
            await database.get_parent(context.message.chat.id, id)
        );
    }
};

const unwarn = (context, database, id) => {
    // remove warns
    let warns = await database.get_warns(context.message.chat.id, id);
    if (warn >= 1) {
        warns--;
        await database.set_warns(context.message.chat.id, id, warns);
    }

    // send warn message
    context.reply(`
Warns number ${id}: ${warns} of 3
    `);
};

exports.warn = warn;
exports.unwarn = unwarn;
