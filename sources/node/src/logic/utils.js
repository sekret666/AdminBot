const warn = async (context, database, id, number, text) => {
    // check member status
    if (!(await warnable(context, id))) {
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
    await context.replyWithMarkdown(`  
Warn message:

To user: [${id}](tg://user?id=${id}) (${warns} of 3)
Reason: ${text}
    `);

    if (warns >= 3) {
        // kick member
        await context.telegram.kickChatMember(context.message.chat.id, id);

        // warn parent
        let parent_id = await database.get_parent(context.message.chat.id, id);
        if (parent_id !== id) {
            await warn(context, database, parent_id, 1, "Bad child");
        }
    }
};
const unwarn = async (context, database, id, number, text) => {
    // check member status
    try {
        // get member status
        let status = (await context.telegram.getChatMember(
            context.message.chat.id,
            id
        )).status;

        if (
            status === "creator" ||
            status === "administrator" ||
            status === "left" ||
            status === "kicked"
        ) {
            return;
        }
    } catch (error) {
        return;
    }

    // remove warns
    let warns = await database.get_warns(context.message.chat.id, id);
    if (isNaN(warns)) {
        warns = 0;
    }

    // decrease warns and set
    warns = decrease(warns, number);
    await database.set_warns(context.message.chat.id, id, warns);

    // send warn message
    await context.replyWithMarkdown(`    
Unwarn message:

To user: [${id}](tg://user?id=${id}) (${warns} of 3)
Reason: ${text}
    `);
};
const warnable = async (context, id) => {
    try {
        // get member status
        let status = (await context.telegram.getChatMember(
            context.message.chat.id,
            id
        )).status;

        if (
            status === "creator" ||
            status === "administrator" ||
            status === "left" ||
            status === "kicked"
        ) {
            return false;
        }
    } catch (error) {}
    return true;
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
exports.warnable = warnable;
