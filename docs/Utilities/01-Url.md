# Url utility

The set of helper functions aimed to ease the work with URL. Located in `src/app/util/Url`.

## Functions available (public API):

> **Note**: `match`, `location` and `history` arguments of following functions are passed from `react-router-dom` in [main application router](./10-Architecture.md) to declared routes. This props will not appear in child components of those routes (if not passed as props from route to routes child component).

### `getUrlParam(match, location)` 

Helper function to get the url param, based on current match and location (passed by `react-router-dom` to declared routes in [main application router](./10-Architecture.md)). For example:

#### location.pathname:
    
- **value**: `'/category/men/men-jackets'`

- **description**: calculated by `react-router-dom` based on URL

#### match.path

- **value**: `'/category'`

- **description**: is declared in [main application router](./10-Architecture.md) (see routing map)

```jsx
import { getUrlParam } from 'Util/Url';

const UrlParam = ({ match, location }) => (
    <p>Current URL param is "{ getUrlParam(match, location)) }"</p>
);
```

The code at the top imports the `getUrlParam` and attempts to get URL param. This results into:

```html 
<p>Current URL param is "men/men-jackets"</p>
```

This function is being used following components: `CategoryPage`, `ProductPage`.

<hr />

### `getQueryParam(variable, location)`

Helper function to get query param by key from the location object. For example:

#### location.search:
    
- **value**: `'?sortKey=price&sortDirection=DESC'`

- **description**: calculated by `react-router-dom` based on URL

#### variable:

- **value**: `'sortKey'`

- **description**: the query param you want to read from URL

```jsx
import { getQueryParam } from 'Util/Url';

const UrlParam = ({ location }) => (
    <p>"sortKey" query param is "{ getQueryParam(location, 'sortKey') }"</p>
);
```

The code at the top imports the `getQueryParam` and attempts to get query param by `sortKey` key. This results into:

```html 
<p>"sortKey" query param is "price"</p>
```

This function is being used following components: `CategoryPage`.

<hr />

### `setQueryParams(keyValueObject, location, history)`

Helper function to update current history search query by keyValueObject. Does `history.push()` as the result of execution. For example:

#### location.history.search:
    
- **value**: `'?sortKey=price&sortDirection=DESC'`

- **description**: calculated by `react-router-dom` based on URL

#### history

- **value**: The history object

- **description**: a prop passed from `react-router-dom`

#### keyValueObject

- **value**: `{ sortKey: 'name', sortDirection: 'ASC' }`

- **description**: the map of query params that should be set

```jsx
import { setQueryParams } from 'Util/Url';

const UrlParam = ({ history, location } }) => {
    console.log(history.location.search);

    setQueryParams(location, history, { 
        sortKey: 'name', 
        sortDirection: 'ASC'
    });

    console.log(history.location.search);

    return null;
};
```

The code at the top imports the `setQueryParams` and attempts to change query params `sortKey` and `sortDirection`. This results into:

```js
'?sortKey=price&sortDirection=DESC'

'?sortKey=name&sortDirection=ASC'
```

This function is being used following components: `CategoryPage`.

<hr />

### `clearQueriesFromUrl(history)`

Helper function to remove all queries from url. Does `history.push()` as the result of execution. For example:

#### history

- **value**: The history object

- **description**: a prop passed from `react-router-dom`

```jsx
import { clearQueriesFromUrl } from 'Util/Url';

const UrlParam = ({ history } }) => {
    console.log(history.location.search);

    clearQueriesFromUrl(history);

    console.log(history.location.search);

    return null;
};
```

The code at the top imports the `clearQueriesFromUrl` and attempts to clear query params. This results into:

```js
'?sortKey=price&sortDirection=DESC'

''
```

## "Private" functions:

### `convertQueryStringToKeyValuePairs(queryString)`

Helper function to convert url query params to object with key value pairs. For example:

#### queryString

- **value**: `'?sortKey=price&sortDirection=DESC'`

- **description**: the string of query params. May be taken from `history.location.search` or `location.search` depending on situation.

```jsx
import { convertQueryStringToKeyValuePairs } from 'Util/Url';

const UrlParam = ({ location: { search } }) => {
    console.log(convertQueryStringToKeyValuePairs(search));
    return null;
};
```

The code at the top imports the `convertQueryStringToKeyValuePairs` and attempts to get query param map from `location.search`. This results into:

```js
{
    sortKey: 'price',
    sortDirection: 'DESC'
}
```

This function is not used outside `Url` utility.

<hr />

### `updateKeyValuePairs(keyValuePairs, currentKey, currentValue)`

Helper function to update the query param map existing key with new value. This also creates a new object, so that the direct reference breaks. For example:

#### keyValuePairs

- **value**: `{ sortKey: 'name', sortDirection: 'DESC' }`

- **description**: the map of query params that needs to change value by key

#### currentKey

- **value**: `'sortKey'`

- **description**: the key to be changed in key => value pair map

#### currentValue

- **value**: `'price'`

- **description**: the value to be set by key in new returned map

```jsx
import { convertQueryStringToKeyValuePairs, updateKeyValuePairs } from 'Util/Url';

// location.search = "?sortKey=price&sortDirection=DESC"

const UrlParam = ({ location: { search } }) => {
    const keyValuePairs = convertQueryStringToKeyValuePairs(search);
    const newKeyValuePairs = updateKeyValuePairs(keyValuePairs, 'sortKey', 'name');
    console.log(newKeyValuePairs); // show new value
    console.log(newKeyValuePairs === keyValuePairs); // indicate broken reference
    return null;
};
```

The code at the top imports the `convertQueryStringToKeyValuePairs` along with `updateKeyValuePairs` and attempts to updated the map with new key. This results into:

```js
{
    sortKey: 'name',
    sortDirection: 'DESC'
}

false
```

This function is not used outside `Url` utility.

<hr />

### `convertKeyValuesToQueryString(keyValuePairs)`

Helper function to convert object with key value pairs to url query string. For example:

#### keyValuePairs

- **value**: `{ sortKey: 'name', sortDirection: 'DESC' }`

- **description**: the map of query params that needs to change value by key

```jsx
import { convertQueryStringToKeyValuePairs, convertKeyValuesToQueryString } from 'Util/Url';

// location.search = "?sortKey=price&sortDirection=DESC"

const UrlParam = ({ location: { search } }) => {
    const keyValuePairs = convertQueryStringToKeyValuePairs(search);
    const newSearchQuery = convertKeyValuesToQueryString(keyValuePairs);
    console.log(newSearchQuery);
    return null;
};
```

The code at the top imports the `convertQueryStringToKeyValuePairs` along with `convertKeyValuesToQueryString` and attempts convert them to string. This results into:

```js
"?sortKey=price&sortDirection=DESC"
```

This function is not used outside `Url` utility.
