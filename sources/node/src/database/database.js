class Database {
    constructor() {}

    is_admin(id) {}
    add_admin(id) {}
    remove_admin(id) {}
    get_admins() {}
    set_admins(id_array) {}

    is_spam(group_id, word) {}
    has_spam(group_id, word_array) {}
    add_spam(group_id, word) {}
    remove_spam(group_id, word) {}
    get_spams(group_id) {}
    set_spams(group_id, word_array) {}
    add_global_spam(word) {}
    remove_global_spam(word) {}
    get_global_spams() {}
    set_global_spams(word_array) {}

    get_warns(group_id, id) {}
    set_warns(group_id, id, warn) {}

    get_parent(group_id, id) {}
    set_parent(group_id, id, parent_id) {}

    get_clear_times(group_id) {}
    set_clear_times(group_id, json_array) {}
}

exports.Database = Database;
