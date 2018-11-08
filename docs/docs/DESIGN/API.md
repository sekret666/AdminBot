# Application Programming Interface

## ORM

[//]: <> (admins table)
is_admin(id)
add_admin(id)
remove_admin(id)
get_admins()
set_admins(json_array)

[//]: <> (spams table)
is_spam(word)
has_spam(json_array)
add_spam(word)
remove_spam(word)
get_spams()
set_spams(json_array)

[//]: <> (warns and metadata table)
get_warns(id)
set_warns(id, json_array)

[//]: <> (warns and metadata table)
get_metadata(id)
set_metadata(id, json_object)

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
