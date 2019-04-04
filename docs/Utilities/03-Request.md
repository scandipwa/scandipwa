# Request utility

The set of helper function to communicate with BE. Located in `src/app/util/Query`.

## Motivation

Usually the GraphQL works via POST requests. We introduced persisted queries, the flow for them looks like this:

1. We send the GET request to BE with query document hash and variable values. All arguments in query are variables (the [Query util](./02-Query.md) handles that). 

    > At this point, if this hash is "known" at the BE (response code 200), we just get the normal response (which is cached by Varnish), request does not propagate further.

2. If BE does not "know" the hash (error code 410), we send PUT request with the full query document and its hash. This registers query document in BE.

3. We send the new GET request, which is similar to 1) step.

Sometimes the data will already be present on user device. If SW has cached it, we must update both the client and SW cache with new data. For this purposes the `BroadcastChannel` is used. The flow is like follows:

1. Client sends GET request to retrieve the data.

2. SW checks in `Cache API` wether he has cached response for this request. If he does not, then nothing is being immediately returned from SW, and he works like a usual proxy caching the response after it's returned from the BE.

3. If SW found a cache, it returns it immediately, while in the same time starts a new request to BE, updating the browser cache and client via `BroadcastChannel API` with fresh data. This caching strategy we call `StaleWhileRevalidate`.

For this functional we have created a helper utility.

## Public API
    
Request exports object with 5 helpers: `ActionDispatcher`, `fetchMutation`, `executePost`, `executeGet`, `listenForBroadCast`. The `executePost`, `executeGet`, `listenForBroadCast`, `fetchMutation` are for communicating with BE. The `QueryDispatcher` is an abstract dispatcher with a build in interface to communicate with BE.

### `executeGet(queryObject, name, TTL)`

Implements the GET request logic described in [motivation section](#Motivation) of this article. For example:

#### queryObject:
    
- **value**: `{ query: "query ($selectedUser_id:ID!) {selectedUser:user(id:$selectedUser_id){ firstName }}", variables: {selectedUser_id: "56778"} }`

- **description**: raw request body object, must include `query` and `variables` keys. Can be prepared from [prepareQuery util]('./02-Query.md').

#### name

- **value**: `'userDispatcher'`

- **description**: the name for broadcast channel to listen to.

#### cacheTTL

- **value**: `86400`

- **description**: the time for both Varnish and SW to cache the response.

```js
import { Field, prepareDocument } from 'Util/Query';
import { executeGet } from 'Util/Request';

const query = new Field('user')
    .setAlias('selectedUser')
    .addField('firstName')
    .addArgument('id', 'ID!', '56778');

const rawRequestBody = prepareQuery([query]);

executeGet(rawRequestBody, 'userDispatcher', 86400)
    .then(data => console.log(data))
```

### `executePost(queryObject)`

Implements the raw POST request logic. For example:

#### queryObject:
    
- **value**: `{ query: "query ($selectedUser_id:ID!) {selectedUser:user(id:$selectedUser_id){ firstName }}", variables: {selectedUser_id: "56778"} }`

- **description**: raw request body object, must include `query` and `variables` keys. Can be prepared from [prepareQuery util]('./02-Query.md').

```js
import { Field, prepareDocument } from 'Util/Query';
import { makeGraphqlRequest } from 'Util/Request';

const query = new Field('user')
    .setAlias('selectedUser')
    .addField('firstName')
    .addArgument('id', 'ID!', '56778');

const rawRequestBody = prepareQuery([query]);

makeGraphqlRequest(rawRequestBody)
    .then(data => console.log(data))
```

<hr />

### `listenForBroadCast(name)`

Implements the broadcast listening logic described in [motivation section](#Motivation). For example:

#### name

- **value**: `'userDispatcher'`

- **description**: the name for broadcast channel to listen to.

```js
import { Field, prepareDocument } from 'Util/Query';
import { makeGraphqlRequest, listenForBroadCast } from 'Util/Request';

const query = new Field('user')
    .setAlias('selectedUser')
    .addField('firstName')
    .addArgument('id', 'ID!', '56778');

const rawRequestBody = prepareDocument([query]);
const handlerName = 'userDispatcher';

makeGraphqlRequest(rawRequestBody, handlerName, 86400)
    .then(data => console.log(data));

listenForBroadCast(handlerName)
    .then(data => console.log(data));
```

<hr />

## `QueryDispatcher`

This abstraction is helpful when requesting a GraphQL queries from BE. The `QueryDispatcher` has following functions to be implemented in extending dispatcher:

> Any request dispatcher which extends `QueryDispatcher` abstract utility class, should return a new object of self in exports. They must follow the "singleton" pattern within the application. There must be no dynamic initialization of `QueryDispatcher`.

### `handleData(dispatch, options)`

#### dispatch:

- **description**: The Redux dispatch object. May be used in `onSuccess`, `onUpdate` or `onError` methods of `QueryDispatcher`.

#### options

- **description**: Any option you wish to pass to `prepareDocument` method of `QueryDispatcher`.

### Enclosed API (internal functions)

- `constructor` – call `super(name, cacheTTL)` in extended class to set handler name for `BroadcastChannel` and cache TTL for SW and Varnish.

- `prepareRequest` – should return `Field` or `Array<Field>`. The function where the query must be prepared, you can access `options` object here (previously passed to `handleData`).

- `onUpdate` – handle `BroadcastChannel` update success. Calls `onSuccess` by default. You may dispatch a Redux action from here.

- `onSuccess` – handle successful data fetch (response code 200 & no `error` in response body object). You may dispatch a Redux action from here.

- `onError` – handle unsuccessful data fetch. You may dispatch a Redux action from here.

<hr />

### `fetchMutation(rawMutations)`

Helpful when fetching mutations

#### rawMutations:

- **description**: instance of Field or an array of instances of Field
