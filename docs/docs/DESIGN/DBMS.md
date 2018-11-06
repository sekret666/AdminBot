# DBMS Model

## Server Side

### Table Name: __`peers`__

> Peers Table

| Column          | Value Type | Description        |
| --------------- | ---------- | ------------------ |
| __id__          | __string__ | Peer's ID          |
| __scode__       | __string__ | Peer's scode       |
| __phone__       | __string__ | Peer's phone       |
| __link__        | __string__ | Peer's link        |
| __reports__     | __json__   | Peer's reporters   |
| __infos__       | __json__   | Peer's infos       |
| __peers__       | __json__   | Peer's peers       |
| __connections__ | __json__   | Peer's connections |
| __sockets__     | __json__   | Peer's sockets     |

### Table Name: __`connections`__

> Connections Table

| Column        | Value Type | Description            |
| ------------- | ---------- | ---------------------- |
| __cid__       | __string__ | Connection's CID       |
| __link__      | __string__ | Connection's link      |
| __reports__   | __json__   | Connection's reporters |
| __infos__     | __json__   | Connection's infos     |
| __peers__     | __json__   | Connection's peers     |
| __histories__ | __json__   | Connection's histories |

### Table Name: __`messages`__

> Messages Table

| Column      | Value Type | Description          |
| ----------- | ---------- | -------------------- |
| __id__      | __string__ | Message's ID         |
| __cid__     | __string__ | Message's CID        |
| __forward__ | __string__ | Message's forward ID |
| __date__    | __string__ | Message's date       |
| __infos__   | __json__   | Message's infos      |

### Meta Tables

> Meta Tables

##### `codes`

> Peer creationg code table

| Column    | Value Type | Description |
| --------- | ---------- | ----------- |
| __phone__ | __string__ | Code's ID   |
| __code__  | __string__ | Code's code |
| __date__  | __string__ | Code's date |

##### `servers`

> ChaM Cluster servers info

| Column   | Value Type | Description   |
| -------- | ---------- | ------------- |
| __host__ | __string__ | Server's ID   |
| __port__ | __string__ | Server's code |
| __load__ | __int__    | Server's date |
| __name__ | __string__ | Server's date |

##### `stuns`

> STUN (P2P Connection initialization) servers table

| Column      | Value Type | Description     |
| ----------- | ---------- | --------------- |
| __id__      | __string__ | STUN's ID       |
| __host__    | __string__ | STUN's host     |
| __port__    | __string__ | STUN's port     |
| __node__    | __string__ | STUN's node     |
| __nat__     | __string__ | STUN's nat type |
| __forward__ | __string__ | STUN's forward  |

##### `turns`

> TURN (P2P Connection initialization) servers table

| Column          | Value Type | Description        |
| --------------- | ---------- | ------------------ |
| __node__        | __string__ | TURN's node        |
| __connections__ | __json__   | TURN's connections |
