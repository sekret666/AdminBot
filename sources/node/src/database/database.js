class Database {
    constructor() {}

    is_admin(id) {}
    add_admin(id) {}
    remove_admin(id) {}
    get_admins() {}
    set_admins(json_array) {}

    is_spam(group_id, word) {}
    has_spam(group_id, json_array) {}
    add_spam(group_id, word) {}
    remove_spam(group_id, word) {}
    get_spams(group_id) {}
    set_spams(group_id, json_array) {}

    get_warns(group_id, id) {}
    set_warns(group_id, id, json_array) {}

    get_metadata(group_id, id) {}
    set_metadata(group_id, id, json_object) {}

    get_clear_times(group_id) {}
    set_clear_times(group_id, json_array) {}
}

exports.Database = Database;
