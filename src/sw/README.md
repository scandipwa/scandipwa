# Scandiweb PWA ServiceWorker

The repository is a Service Worker script and a dev environment for it.

## Features

-   Google's `workbox` is used as base: (`core`, `routing`, `strategies`, `cache-expiration`).
-   Custom implementation for POST requests, implemented on top of IndexedDB.
-   Cache flush from application slide (including mass flush)
-   Cache flush using server-side config
-   Forward data after revalidation in staleWhileRevalidate POST strategy

### main.js

Entry-point for service worker, includes helper methods and route definitions along with the handlers.

### Handlers

Apart of `PostCacheHandler` there are all workbox cache strategies available within `src/handlers.js` for
convenience. Remember to export anything you need/create and define route handler within main.js

Out of the box there are few routes predefined:
`/graphql`, `/graphemulate` - for testing and developing POST caching
`/flush-cache` - allows clear entire cache/single resource within the _runtime_ cache
`/media` - so you can take a look how your frontend can work without a connection/during server downtime

### POST caching

Post caching is based on IndexedDB, that stores Request Body hash and corresponding Response Body.
Currently, it has one strategy, the name was borrowed/corresponds with Google's Workbox handler
`staleWhileRevalidate`, however, it provides additional possibility to set cached data TTL before an attempt of
revalidation will be made.

Cache data will be served in any case, whether available, however revalidation happens after `SW-Cache-Age` expiration (default: `0`).

### Cache flush

Any cache item can be removed/entire cache storage flushed with a simple Request from an application:
Create a Request and send it to `/flush-cache`, adding custom header `Cache-purge` with _Resource_ name.

#### Resource can be any resource name (starting with `/`), or Cache storage name, without any prefix

An example: delete `/styles.css` from Cache storage:

```javascript
fetch('/flush-cache', {
    method: 'GET',
    headers: {
       'Cache-purge': '/styles.css',
}
```

An example: flush all cached items within `runtime-static` Cache

```javascript
fetch('/flush-cache', {
    method: 'GET',
    headers: {
       'Cache-purge': 'runtime-static',
}
```

### Data revalidation and update

Any time, when POST method is handled with staleWhileRevalidate it immediately returns cached data (whether
available) and initialize data update after `SW-Cache-Age` ends.
Since service worker can not interact with DOM in any way, on update Response it saves data to cache and initializes
Broadcast API channel, according to `Application-Model` header value.

An example:

```javascript
fetch('/graphemulate', {
    method: 'post',
    headers: {
        ...
        'Application-Model': 'Product',
        'SW-Cache': '60',
    },
    body: JSON.stringify({...}),
```

When update Response is received, handler will create a Broadcast Channel and post updated Response body there:

```javascript
...
const bc = new BroadcastChannel(appModel) // appModel = 'Product';
bc.postMessage({ payload: body, type: appModel });
```

Which can be catch with Product model:

```javascript
const updatesChannel = new BroadcastChannel('Product');
updatesChannel.addEventListener('message', (event) => {
    console.log('Event was triggered');
    console.log(event.data.payload);
    console.log('APPLICATION: RESPONSE: ', event.data);
    document.getElementById('response').value = JSON.stringify(event.data.payload) + ' +updated';
});
```

### Offline mode

Any cached resource or data will be still available even server/network is not available.
Additionally, when Service Worker attempts to revalidate data, as soon, as `fetch()` fails it opens
`network-error` Broadcast Channel and passes an object there:

-   `offline` :bool - true or false, indicate whether client/server is offline (when true)
-   `message` :string - can be used for showing to customer/debugging, as other Service Worker issues (like Response

body JSON parse fail) will be communicated over this channel as well.
