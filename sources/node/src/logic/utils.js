const warn = async (context, database, id, number, text) => {
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

    // increase warns and set
    warns = increase(warns, number);
    await database.set_warns(context.message.chat.id, id, warns);

    // send warn message
    context.replyWithMarkdown(`  
Warn message:

To user: [${id}](tg://user?id=${id}) (${warns} of 3)
Reason: ${text}
    `);

    // check kick warn
    if (warns >= 3) {
        context.telegram.kickChatMember(context.message.chat.id, id);

        // warn parent
        warn(
            context,
            database,
            await database.get_parent(context.message.chat.id, id),
            1,
            "Bad child"
        );
    }
};

const unwarn = async (context, database, id, number, text) => {
    // remove warns
    let warns = await database.get_warns(context.message.chat.id, id);
    if (isNaN(warns)) {
        warns = 0;
    }

    // decrease warns and set
    warns = decrease(warns, number);
    await database.set_warns(context.message.chat.id, id, warns);

    // send warn message
    context.replyWithMarkdown(`    
Unwarn message:

To user: [${id}](tg://user?id=${id}) (${warns} of 3)
Reason: ${text}
    `);
};

const increase = (warns, number) => {
    warns += number;
    if (warns > 3) {
        warns = 3;
    }

    return warns;
};
const decrease = (warns, number) => {
    warns -= number;
    if (warns < 0) {
        warns = 0;
    }

    return warns;
};

exports.warn = warn;
exports.unwarn = unwarn;
