# Application Programming Interface

## RESTFul API

### Peer

* __URL__: http[s]://{CHAM-SERVER}/api/peer/:command
* __Commands__:

    | Type            | Command     | Description                         |
    | --------------- | ----------- | ----------------------------------- |
    | id,scode        | __code__    | Send code peer                      |
    | id,scode        | __create__  | Create peer                         |
    | id,scode        | __delete__  | Delete peer                         |
    | sockets         | __login__   | Login peer                          |
    | sockets         | __logout__  | Logout peer                         |
    | id, phone, link | __convert__ | Convert id, phone, link peer        |
    | peers           | __pget__    | Get a/all peer peers permission     |
    | peers           | __pset__    | Set a peer peers permission         |
    | infos           | __iget__    | Get a peer information              |
    | infos           | __iset__    | Set a peer information              |
    | infos           | __iadd__    | Add a peer information              |
    | infos           | __iremove__ | Remove a peer information           |
    | infos           | __iclear__  | Clear a peer information            |

#### code

> Send code to phone and save it into DB.

* __auth__: Authentication __not required, not check permission__

* __params__:

    | Parameter | Type           | Value Type | Description  |
    | --------- | -------------- | ---------- | ------------ |
    | __phone__ | __[post,get]__ | __string__ | Peer's phone |

* __results__:

    | Result      | Value Type       | Description        |
    | ----------- | ---------------- | ------------------ |
    | __result__  | __[true,false]__ | Code's result      |
    | __[error]__ | __string__       | Code's error on no |

#### create

> Load code from DB, check it, create id, scode, save into DB.

* __auth__: Authentication __not required, not check permission__

* __params__:

    | Parameter | Type | Value Type | Description |
    | --------- | ---- | ---------- | ----------- |
    | __phone__ | __[post,get]__ | __string__ | Peer's phone |
    | __code__  | __[post,get]__ | __string__ | Peer's code  |

* __results__:

    | Result      | Value Type       | Description          |
    | ----------- | ---------------- | -------------------- |
    | __result__  | __[true,false]__ | Create's result      |
    | __[error]__ | __string__       | Create's error on no |
    | __[id]__    | __string__       | Create's peer id     |
    | __[scode]__ | __string__       | Create's peer scode  |

#### delete

> Set scode, info, peers null from DB and close all sockets, scode -> not to login, infos to deleted state, peers to disable changability.

* __auth__: Authentication __not required, not check permission__

* __params__:

    | Parameter | Type           | Value Type | Description  |
    | --------- | -------------- | ---------- | ------------ |
    | __id__    | __[post,get]__ | __string__ | Peer's ID    |
    | __scode__ | __[post,get]__ | __string__ | Peer's scode |

* __results__:

    | Result      | Value Type       | Description          |
    | ----------- | ---------------- | -------------------- |
    | __result__  | __[true,false]__ | Delete's result      |
    | __[error]__ | __string__       | Delete's error on no |

#### login

> Check id, scode and set sockets.

* __auth__: Authentication __not required, not check permission__

* __params__:

    | Parameter | Type           | Value Type | Description  |
    | --------- | -------------- | ---------- | ------------ |
    | __id__    | __[post,get]__ | __string__ | Peer's ID    |
    | __scode__ | __[post,get]__ | __string__ | Peer's scode |

* __results__:

    | Result      | Value Type       | Description         |
    | ----------- | ---------------- | ------------------- |
    | __result__  | __[true,false]__ | Login's result      |
    | __[error]__ | __string__       | Login's error on no |

#### logout

> Set sockets.

* __auth__: Authentication __required, not check permission__

* __params__:

    | Parameter | Type           | Value Type | Description  |
    | --------- | -------------- | ---------- | ------------ |

* __results__:

    | Result      | Value Type       | Description          |
    | ----------- | ---------------- | -------------------- |
    | __result__  | __[true,false]__ | Logout's result      |
    | __[error]__ | __string__       | Logout's error on no |

#### convert

> Convert id or phone or link to id, link.

* __auth__: Authentication __required, not check permission__

* __params__:

    | Parameter   | Type           | Value Type | Description  |
    | ----------- | -------------- | ---------- | ------------ |
    | __[id]__    | __[post,get]__ | __string__ | Peer's ID    |
    | __[phone]__ | __[post,get]__ | __string__ | Peer's phone |
    | __[link]__  | __[post,get]__ | __string__ | Peer's link  |

* __results__:

    | Result      | Value Type       | Description           |
    | ----------- | ---------------- | --------------------- |
    | __result__  | __[true,false]__ | Convert's result      |
    | __[error]__ | __string__       | Convert's error on no |
    | __[id]__    | __string__       | Convert's peers ID    |
    | __[link]__  | __string__       | Convert's peers link  |

#### pget

> Get self permissions

* __auth__: Authentication __required, check is self__

* __params__:

    | Parameter | Type           | Value Type        | Description |
    | --------- | -------------- | ----------------- | ----------- |
    | __id__    | __[post,get]__ | __[string,null]__ | Peer's ID   |

* __results__:

    | Result           | Value Type       | Description             |
    | ---------------- | ---------------- | ----------------------- |
    | __result__       | __[true,false]__ | PGet's result           |
    | __[error]__      | __string__       | PGet's error on no      |
    | __[permission]__ | __json__         | PGet's peers permission |

#### pset

> Set self permissions

* __auth__: Authentication __required, check is self__

* __params__:

    | Parameter      | Type           | Value Type | Description       |
    | -------------- | -------------- | ---------- | ----------------- |
    | __id__         | __[post,get]__ | __string__ | Peer's ID         |
    | __permission__ | __[post,get]__ | __string__ | Peer's permission |

* __results__:

    | Result      | Value Type       | Description        |
    | ----------- | ---------------- | ------------------ |
    | __result__  | __[true,false]__ | PSet's result      |
    | __[error]__ | __string__       | PSet's error on no |

#### iget

> Check permission, get target info

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter | Type           | Value Type        | Description     |
    | --------- | -------------- | ----------------- | --------------- |
    | __id__    | __[post,get]__ | __string__        | Peer's ID       |
    | __info__  | __[post,get]__ | __[string,null]__ | Peer's info     |
    | __key__   | __[post,get]__ | __[string,null]__ | Peer's info key |

* __results__:

    | Result      | Value Type       | Description        |
    | ----------- | ---------------- | ------------------ |
    | __result__  | __[true,false]__ | IGet's result      |
    | __[error]__ | __string__       | IGet's error on no |
    | __[value]__ | __json__         | IGet's value       |

#### iset

> Check permission, set target info

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter | Type           | Value Type             | Description       |
    | --------- | -------------- | ---------------------- | ----------------- |
    | __id__    | __[post,get]__ | __string__             | Peer's ID         |
    | __info__  | __[post,get]__ | __string__             | Peer's info       |
    | __value__ | __[post,get]__ | __[json,string]__      | Peer's info value |

* __results__:

    | Result      | Value Type       | Description        |
    | ----------- | ---------------- | ------------------ |
    | __result__  | __[true,false]__ | ISet's result      |
    | __[error]__ | __string__       | ISet's error on no |

#### iadd

> Check permission, add target info

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter | Type           | Value Type             | Description       |
    | --------- | -------------- | ---------------------- | ----------------- |
    | __id__    | __[post,get]__ | __string__             | Peer's ID         |
    | __info__  | __[post,get]__ | __string__             | Peer's info       |
    | __key__   | __[post,get]__ | __string__             | Peer's info key   |
    | __value__ | __[post,get]__ | __[json,string]__      | Peer's info value |

* __results__:

    | Result      | Value Type       | Description        |
    | ----------- | ---------------- | ------------------ |
    | __result__  | __[true,false]__ | IAdd's result      |
    | __[error]__ | __string__       | IAdd's error on no |

#### iremove

> Check permission, remove target info

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter | Type           | Value Type | Description     |
    | --------- | -------------- | ---------- | --------------- |
    | __id__    | __[post,get]__ | __string__ | Peer's ID       |
    | __info__  | __[post,get]__ | __string__ | Peer's info     |
    | __key__   | __[post,get]__ | __string__ | Peer's info key |

* __results__:

    | Result      | Value Type       | Description           |
    | ----------- | ---------------- | --------------------- |
    | __result__  | __[true,false]__ | IRemove's result      |
    | __[error]__ | __string__       | IRemove's error on no |

#### iclear

> Check permission, clear target info

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter | Type           | Value Type | Description |
    | --------- | -------------- | ---------- | ----------- |
    | __id__    | __[post,get]__ | __string__ | Peer's ID   |
    | __info__  | __[post,get]__ | __string__ | Peer's info |

* __results__:

    | Result      | Value Type       | Description          |
    | ----------- | ---------------- | -------------------- |
    | __result__  | __[true,false]__ | IClear's result      |
    | __[error]__ | __string__       | IClear's error on no |

### Connection

* __URL__: http[s]://{CHAM-SERVER}/api/connection/:command
* __Commands__:

    | Type      | Command     | Description                               |
    | --------- | ----------- | ----------------------------------------- |
    | cid       | __create__  | Create connection                         |
    | cid       | __delete__  | Delete connection                         |
    | cid, link | __convert__ | Convert cid, link connection              |
    | peers     | __pget__    | Get a/all connection peers permission     |
    | peers     | __pset__    | Set a connection peers permission         |
    | infos     | __iget__    | Get a connection information              |
    | infos     | __iset__    | Set a connection information              |
    | infos     | __iadd__    | Add a connection information              |
    | infos     | __iremove__ | Remove a connection information           |
    | infos     | __iclear__  | Clear a connection information            |

#### create

> Check user access (block or spam) for creating new connection, generate CID, add connection to DB.

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter | Type           | Value Type | Description  |
    | --------- | -------------- | ---------- | ------------ |

* __results__:

    | Result      | Value Type       | Description             |
    | ----------- | ---------------- | ----------------------- |
    | __result__  | __[true,false]__ | Create's result         |
    | __[error]__ | __string__       | Create's error on no    |
    | __[cid]__   | __string__       | Create's connection cid |

#### delete

> Set info, peers (move to histories) null from DB and send event message to all members, infos to deleted state, peers to disable sendable + disable default join peer permission to null.

* __auth__: Authentication __not required, check is boss__

* __params__:

    | Parameter | Type           | Value Type | Description      |
    | --------- | -------------- | ---------- | ---------------- |
    | __cid__   | __[post,get]__ | __string__ | Connection's CID |

* __results__:

    | Result      | Value Type       | Description          |
    | ----------- | ---------------- | -------------------- |
    | __result__  | __[true,false]__ | Delete's result      |
    | __[error]__ | __string__       | Delete's error on no |

#### convert

> Convert link to cid.

* __auth__: Authentication __required, not check permission__

* __params__:

    | Parameter   | Type           | Value Type | Description       |
    | ----------- | -------------- | ---------- | ----------------- |
    | __[cid]__   | __[post,get]__ | __string__ | Connection's CID  |
    | __[link]__  | __[post,get]__ | __string__ | Connection's link |

* __results__:

    | Result      | Value Type       | Description               |
    | ----------- | ---------------- | ------------------------- |
    | __result__  | __[true,false]__ | Convert's result          |
    | __[error]__ | __string__       | Convert's error on no     |
    | __[cid]__   | __string__       | Convert's connection ID   |
    | __[link]__  | __string__       | Convert's connection link |

#### pget

> Get peers permissions

* __auth__: Authentication __required, check is self__

* __params__:

    | Parameter | Type           | Value Type        | Description     |
    | --------- | -------------- | ----------------- | --------------- |
    | __cid__   | __[post,get]__ | __string__        | Connection's ID |
    | __id__    | __[post,get]__ | __[string,null]__ | Peer's ID       |

* __results__:

    | Result           | Value Type       | Description             |
    | ---------------- | ---------------- | ----------------------- |
    | __result__       | __[true,false]__ | PGet's result           |
    | __[error]__      | __string__       | PGet's error on no      |
    | __[permission]__ | __json__         | PGet's peers permission |

#### pset

> Set self permissions

* __auth__: Authentication __required, check is self__

* __params__:

    | Parameter      | Type           | Value Type | Description       |
    | -------------- | -------------- | ---------- | ----------------- |
    | __cid__        | __[post,get]__ | __string__ | Connection's ID   |
    | __id__         | __[post,get]__ | __string__ | Peer's ID         |
    | __permission__ | __[post,get]__ | __string__ | Peer's permission |

* __results__:

    | Result      | Value Type       | Description        |
    | ----------- | ---------------- | ------------------ |
    | __result__  | __[true,false]__ | PSet's result      |
    | __[error]__ | __string__       | PSet's error on no |

#### iget

> Check permission, get target info

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter | Type           | Value Type        | Description     |
    | --------- | -------------- | ----------------- | --------------- |
    | __cid__   | __[post,get]__ | __string__        | Connection's ID |
    | __info__  | __[post,get]__ | __[string,null]__ | Peer's info     |
    | __key__   | __[post,get]__ | __[string,null]__ | Peer's info key |

* __results__:

    | Result      | Value Type       | Description        |
    | ----------- | ---------------- | ------------------ |
    | __result__  | __[true,false]__ | IGet's result      |
    | __[error]__ | __string__       | IGet's error on no |
    | __[value]__ | __json__         | IGet's value       |

#### iset

> Check permission, set target info

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter | Type           | Value Type             | Description       |
    | --------- | -------------- | ---------------------- | ----------------- |
    | __cid__   | __[post,get]__ | __string__             | Connection's ID   |
    | __info__  | __[post,get]__ | __string__             | Peer's info       |
    | __value__ | __[post,get]__ | __[json,string]__      | Peer's info value |

* __results__:

    | Result      | Value Type       | Description        |
    | ----------- | ---------------- | ------------------ |
    | __result__  | __[true,false]__ | ISet's result      |
    | __[error]__ | __string__       | ISet's error on no |

#### iadd

> Check permission, add target info

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter | Type           | Value Type             | Description       |
    | --------- | -------------- | ---------------------- | ----------------- |
    | __cid__   | __[post,get]__ | __string__             | Connection's ID   |
    | __info__  | __[post,get]__ | __string__             | Peer's info       |
    | __key__   | __[post,get]__ | __string__             | Peer's info key   |
    | __value__ | __[post,get]__ | __[json,string]__      | Peer's info value |

* __results__:

    | Result      | Value Type       | Description        |
    | ----------- | ---------------- | ------------------ |
    | __result__  | __[true,false]__ | IAdd's result      |
    | __[error]__ | __string__       | IAdd's error on no |

#### iremove

> Check permission, remove target info

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter | Type           | Value Type | Description     |
    | --------- | -------------- | ---------- | --------------- |
    | __cid__   | __[post,get]__ | __string__ | Connection's ID |
    | __info__  | __[post,get]__ | __string__ | Peer's info     |
    | __key__   | __[post,get]__ | __string__ | Peer's info key |

* __results__:

    | Result      | Value Type       | Description           |
    | ----------- | ---------------- | --------------------- |
    | __result__  | __[true,false]__ | IRemove's result      |
    | __[error]__ | __string__       | IRemove's error on no |

#### iclear

> Check permission, clear target info

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter | Type           | Value Type | Description     |
    | --------- | -------------- | ---------- | --------------- |
    | __cid__   | __[post,get]__ | __string__ | Connection's ID |
    | __info__  | __[post,get]__ | __string__ | Peer's info     |

* __results__:

    | Result      | Value Type       | Description          |
    | ----------- | ---------------- | -------------------- |
    | __result__  | __[true,false]__ | IClear's result      |
    | __[error]__ | __string__       | IClear's error on no |

### Message

* __URL__: http[s]://{CHAM-SERVER}/api/message/:command
* __Commands__:

    | Command    | Description       |
    | ---------- | ----------------- |
    | __geton__  | Get a/all message |
    | __getoff__ | Get a/all message |
    | __set__    | Set a message     |

#### geton

> Check user permission (read access) at connection's peers, start or stop loader(stream loaders using generators or promises).

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter   | Type           | Value Type | Description            |
    | ----------- | -------------- | ---------- | ---------------------- |
    | __cid__     | __[post,get]__ | __string__ | Message's CID          |
    | __[from]__  | __[post,get]__ | __string__ | Message's from date/id |
    | __[to]__    | __[post,get]__ | __string__ | Message's to date/id   |
    | __[count]__ | __[post,get]__ | __string__ | Message's count        |

* __results__:

    | Result      | Value Type       | Description       |
    | ----------- | ---------------- | ----------------- |
    | __result__  | __[true,false]__ | Get's result      |
    | __[error]__ | __string__       | Get's error on no |
    | __[token]__ | __string__       | Get's load token  |

#### getoff

> Check user permission (read access) at connection's peers, start or stop loader(stream loaders using generators or promises).

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter   | Type           | Value Type | Description            |
    | ----------- | -------------- | ---------- | ---------------------- |
    | __token__   | __[post,get]__ | __string__ | Message's gets token   |

* __results__:

    | Result      | Value Type       | Description       |
    | ----------- | ---------------- | ----------------- |
    | __result__  | __[true,false]__ | Get's result      |
    | __[error]__ | __string__       | Get's error on no |

#### set

> Check user permission (write access) at connection's peers, set message, broadcast it to online peers sockets.

* __auth__: Authentication __required, check permission__

* __params__:

    | Parameter   | Type           | Value Type | Description          |
    | ----------- | -------------- | ---------- | -------------------- |
    | __cid__     | __[post,get]__ | __string__ | Message's CID        |
    | __forward__ | __[post,get]__ | __string__ | Message's forward id |
    | __value__   | __[post,get]__ | __json__   | Message's value      |

* __results__:

    | Result      | Value Type       | Description       |
    | ----------- | ---------------- | ----------------- |
    | __result__  | __[true,false]__ | Set's result      |
    | __[error]__ | __string__       | Set's error on no |

### __Tips__

#### Get Message

> Get's message is a `json` object, we describe basic parts of it.

| Key         | Value Type | Description          |
| ----------- | ---------- | -------------------- |
| __id__      | __string__ | Message's ID         |
| __cid__     | __string__ | Message's CID        |
| __forward__ | __string__ | Message's forward ID |
| __date__    | __string__ | Message's date       |
| __infos__   | __string__ | Message's infos      |

#### Peer Infos

> Peer's infos is a `json` object, we describe basic parts of it.

| Key          | Value Type | Description     |
| ------------ | ---------- | --------------- |
| __name__     | __string__ | Peer's name     |
| __bio__      | __string__ | Peer's bio      |
| __state__    | __string__ | Peer's state    |
| __pictures__ | __json__   | Peer's pictures |

#### Peer Peers

* __key__: ID
* __value__: Permission

#### Peer Connections

* __key__: CID
* __value__: Join Date

#### Peer Sockets

* __key__: Binary (Socket Data)
* __value__: Cluster Node

#### Connection Infos

> Connection's infos is a `json` object, we describe basic parts of it.

| Key          | Value Type | Description           |
| ------------ | ---------- | --------------------- |
| __name__     | __string__ | Connection's name     |
| __bio__      | __string__ | Connection's bio      |
| __pictures__ | __json__   | Connection's pictures |

#### Connection Peers

* __key__: ID
* __value__: Permission

#### Connection Histories

* __key__: ID
* __value__: Left Date

#### Message Infos

> Message's infos is a `json` object, we describe basic parts of it.

| Type         | Key               | Value Type | Description          |
| ------------ | ----------------- | ---------- | -------------------- |
| __-__        | __type__          | __string__ | Message's type       |
| __-__        | __reply__         | __string__ | Message's reply      |
| __-__        | __seen__          | __string__ | Message's seen       |
| __text__     | __[text]__        | __string__ | Message's text       |
| __emoji__    | __[emoji]__       | __string__ | Message's emoji code |
| __location__ | __[altitude]__    | __string__ | Message's altitude   |
| __location__ | __[latitude]__    | __string__ | Message's latitude   |
| __location__ | __[longitude]__   | __string__ | Message's longitude  |
| __stream__   | __[link]__        | __string__ | Message's link       |
| __remove__   | __[date]__        | __string__ | Message's date       |
| __edit__     | __[date]__        | __string__ | Message's date       |
| __edit__     | __[infos]__       | __json__   | Message's infos      |

## WebSocket API

> Is similar to RESTFul API but every message for synchronizing between client and server has a `token` key that generated by client and send to server with async message, then server responses that message with new message having `token`.

## TCP API

> Is similar to RESTFul API but every message for synchronizing between client and server has a `token` key that generated by client and send to server with async message, then server responses that message with new message having `token`.

## UDP API

> Is similar to RESTFul API but every message for synchronizing between client and server has a `token` key that generated by client and send to server with async message, then server responses that message with new message having `token`.