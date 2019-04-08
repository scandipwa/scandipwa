# Query utility

The set of helper functions aimed to ease the work with GraphQL. Located in `src/app/util/Query`.

## Motivation

Usually the GraphQL query string is build using [`graphql-tag`](https://github.com/apollographql/graphql-tag) library. This means all queries are literally strings. This makes it complicated to work with. The dynamic query building will be related to string concatenation, which is hard to read.

Here is how `gql` tag works (note: fields are not real):

```js
import gql from 'graphql-tag';

const query = gql`
  {
    user(id: 5) {
      firstName
      lastName
    }
  }
`
```

Here is how our query building looks like:

```js
import { Field } from 'Util/Query';

const query = new Field('user')
    .addArgument('id', 'ID!', 5)
    .addField('firstName')
    .addField('lastName');
```

Using this method allows for more dynamic control over the query. We can add fields on the fly, based on passed options, or use loops to add the fields or arguments to a query. This also allows us to have smaller queries – the `,` instead of `\n` are used for combining fields. This saves us bandwidth.

## Public API

Query util exports object of 4 helpers: `Field`, `Fragment`, `prepareQuery` and `prepareMutation`. The `Field`, `Fragment` are for building a query. The `prepareQuery` and `prepareMutation` are for converting the `Field` or `Fragment` object into another object containing the auto-generated variables map and the GraphQL document string.

### `new Field(name)`

Initializes the new Field object. The `name` argument plays the initial field name role. For example:

```js
import { Field } from 'Util/Query';

const query = new Field('user');
console.log(query.toString())
console.log(query._name)
```

Results into:

```
'user'

'user'
```

<hr />

### `new Fragment(type)`

Is extended Field with just one minor difference in `toString()` method: instead of rendering `user` it will render an inline fragment `... on User`.

<hr />

### `Field.addField(field)`

Adds field as a child to parent field. Field might be a simple string, or another field instance. For example:

```js
import { Field } from 'Util/Query';

const favoritePosts = new Field('favoritePosts')
    .addField('title')
    .addField('url');

const query = new Field('user')
    .addField('firstName')
    .addField(favoritePosts);

console.log(query.toString())
console.log(query._fieldList)
```

Results into:

```
'user{ firstName, favoritePosts{ title, url } }'

{
    firstName: {
        _fieldList: {},
        _name: "firstName"
    },
    favoritePosts: {
        _name: "favoritePosts",
        _fieldList: {
          title: {
              _fieldList: {},
              _name: "title" 
          }, 
          url: {
              _fieldList: {},
              _name: "url" 
          }
        }
    }
}
```

<hr />

### `Field.addFieldList(fieldList)`

Adds fields list as a children to parent field. Fields might be a simple string, or another field instance. For example:

```js
import { Field } from 'Util/Query';

const favoritePosts = new Field('favoritePosts')
    .addField('title')
    .addField('url');

const query = new Field('user')
    .addFieldList('firstName', favoritePosts);

console.log(query.toString())
console.log(query._fieldList)
```

Results into:

```
'user{ firstName, favoritePosts{ title, url } }'

{
    firstName: {
        _fieldList: {},
        _name: "firstName"
    },
    favoritePosts: {
        _name: "favoritePosts",
        _fieldList: {
          title: {
              _fieldList: {},
              _name: "title" 
          }, 
          url: {
              _fieldList: {},
              _name: "url" 
          }
        }
    }
}
```

<hr />

### `Field.addArgument(argumentName, type, value)`

Adds an argument to a field. Requires the argument type to be defined, because the argument will be compiled to the variable. For example:

```js
import { Field } from 'Util/Query';

const query = new Field('user')
    .addField('firstName')
    .addArgument('id', 'ID!', '56778');

console.log(query.build().toString()) // build because argument is passed
console.log(query._argumentList)
```

Results into:

```
'user(id:$_id){ firstName }'
```

```js
{
    id: {
        value: "56778", 
        type: "ID!"
    }
}
```

<hr />

### `Field.setAlias(alias)`

Adds an alias to field. For example:

```js
import { Field } from 'Util/Query';

const query = new Field('user')
    .setAlias('selectedUser')
    .addField('firstName')
    .addArgument('id', 'ID!', '56778');

console.log(query.build().toString()) // build because argument is passed
console.log(query._alias)
```

Results into:

```js
'selectedUser: user(id:$_id){ firstName }'

'selectedUser'
```

<hr />

### `prepareQuery(queries)` and `prepareMutation(mutation)`

Prepares the query request body (raw, no JSON). It takes the array of `Field` objects inside and combines them in them. For example:

```js
import { Field, prepareQuery } from 'Util/Query';

const query = new Field('user')
    .setAlias('selectedUser')
    .addField('firstName')
    .addArgument('id', 'ID!', '56778');

const rawRequestBody = prepareQuery([query]);

console.log(rawRequestBody);
```

Results into:

```js
{
  query: "query ($selectedUser_id:ID!) {selectedUser:user(id:$selectedUser_id){ firstName }}",
  variables: {selectedUser_id: "56778"}
}
```

#### The difference for mutation is that instead of:

```js
// prepareQuery
query: "query ($selectedUser_id:ID!) {selectedUser:user(id:$selectedUser_id){ firstName }}"

// prepareMutation
query: "mutation ($selectedUser_id:ID!) {selectedUser:user(id:$selectedUser_id){ firstName }}"
```

## Enclosed API

You may use these functions, but most probably this won't be necessary. They are made to transform Field object to string. These functions are made to work together.

These functions is used internally in `prepareQuery` and `prepareMutation` utility.

### `Field.toString()`

This function is able to create query strings from `Field` object. This function won't include the arguments, until you `build()` the query.

The usual flow to get just a string looks like: `query.build().toString()`. But you never need to do this.

<hr />

### `Field.build()`

This function build everything related to arguments in query. It prepares three objects:

- variableDefinitions `['$_id: ID!']`
- querySelections `['user(id:$_id){ firstName }']`
- variableAssignments `{ id: 56778 }`
