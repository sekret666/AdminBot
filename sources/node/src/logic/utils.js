const warn = async (context, database, id) => {
    // check id is exists
    try {
        await context.telegram.getChatMember(context.message.chat.id, id);
    } catch (error) {
        return;
    }

    // add warns
    let warns = await database.get_warns(context.message.chat.id, id);
    if (isNaN(warns)) {
        warns = 0;
    }
    if (warns <= 2) {
        warns++;
        await database.set_warns(context.message.chat.id, id, warns);
    }

    // send warn message
    context.replyWithMarkdown(`    
User [${id}](tg://user?id=${id}) warns number: ${warns} of 3
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

const unwarn = async (context, database, id) => {
    // remove warns
    let warns = await database.get_warns(context.message.chat.id, id);
    if (isNaN(warns)) {
        warns = 0;
    }
    if (warns >= 1) {
        warns--;
        await database.set_warns(context.message.chat.id, id, warns);
    }

    // send warn message
    context.replyWithMarkdown(`    
User [${id}](tg://user?id=${id}) warns number: ${warns} of 3
    `);
};

exports.warn = warn;
exports.unwarn = unwarn;
