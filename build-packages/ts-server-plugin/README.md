## Description

Plugin to support [ScandiPWA plugin system](https://docs.create-scandipwa-app.com/extensions/application-plugins).

## Instructions

In first terminal (compile plugin):

```bash
yarn
yarn start
```

In second terminal (prepare test env):

```bash
cd example
yarn
TSS_DEBUG=9559 code .
```

You can use the pre-configured `Attach to VS Code TS Server` to debug plugin operation in `example` folder.

## Features

- Makes ScandiPWA namespace JSX comment "clickable", aka. allow to find reference for it, for example:

```js
               vvv This text can be clicked
/** @namespace Hello/World */
```

- Connects namespace declarations with their definitions, aka. clicking on namespace comment, we find references to it in all plugins (for classes, functions) and visa-versa (you can navigate from plugin to a definition)

```js
               vvv Clicking here
/** @namespace Hello/World */
function A() {}

export default {
    'Hello/World': {
        // vvv You are redirected here
        function: (args, callback) => {}
    }
}
```

- If a property / method / function has a plugin, it highlights it in code, using inline hints feature, like so:

```js
class A {
    b() has 2 plugins {}
}
```

- Shows warnings for all namespaces that do not exist in the application, and all non-existent methods:

```js
export default {
    'Abc': { Such namespace is not declared
        function: () => {}
    }
}
```