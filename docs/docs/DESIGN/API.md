# Application Programming Interface

## ORM

[//]: <> (admins table)
is_admin(id)
add_admin(id)
remove_admin(id)
get_admins()
set_admins(json_array)

[//]: <> (spams table)
is_spam(group_id, word)
has_spam(group_id, json_array)
add_spam(group_id, word)
remove_spam(group_id, word)
get_spams(group_id)
set_spams(group_id, json_array)

[//]: <> (warns and metadata table)
get_warns(group_id, id)
set_warns(group_id, id, json_array)

[//]: <> (warns and metadata table)
get_metadata(group_id, id)
set_metadata(group_id, id, json_object)

[//]: <> (group_clear_time table)
get_clear_times(group_id)
set_clear_times(group_id, json_array)

## Logic

is_admin(id)
is_spam(message)
is_flood(context, message) => context: flood count
add_warn(id)
remove_warn(id)
get_warn(id)
add_clear()
report_message()
