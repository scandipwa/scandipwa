# @scandipwa/scandipwa-template-plugin-system

This package provides the template plugin system used by [Create Scandipwa App](https://github.com/scandipwa/create-scandipwa-app).

### Abstract

This template plugin system processes the template (the main markup file) file of the application.

It provides an opportunity to modify the template similarly to the process which is provided by CSA to modify the build configuration.

### Use cases

1. Your extension needs some additional HTML/PHP nodes in the template

2. Your extension is incompatible with some existing HTML/PHP nodes in the template and needs to remove them

3. Your extension needs to change attributes of the existing nodes to some other values

### Limitations

1. This tool is not meant for PHP code modifications. It offers an opportunity to interact with template as with text, but changing PHP or JS code such way would be considered a misuse, due to possible incompatibilities with a plugin written such a way. To change the PHP logic - change abstractions, not delta-modify the code.

### Dependencies

`xmldom` is used to parse the markup to DOM and parse the DOM to markup. The DOM provided in the API is documented in this package's documentation.

`lodash` is used to process the initial template the same way as the loader of the `HtmlWebpackPlugin` does that.

### How to use

1. Define the paths to the template plugins in your package.json

```json
{
    "scandipwa": {
        "build": {
            "templatePlugins": [
                "build-config/template-modification"
            ]
        }
    },
}
```

2. Use one of the provided APIs to modify the template

3. See the modified template in the compiled version of your project

### API reference

The processing happens during the build time. Don't let the API (which is really similar to what browsers have for DOM) trick you!

1. `overrideDOM({ dom, parser, serializer }): DOM`

Interact with the DOM representation of the template. This is a __recommended__ way to modify a template using this plugin system.

The DOM is parsed by the `xmldom` package, see [its documentation](https://www.npmjs.com/package/xmldom) for some precise information on the deeper API.

This API covers all of the regular needs: handling the DOM including additional interactions with PHP nodes.

A valid DOM should be returned from this method.

2. `overrideText({ markup }): string`

Interact with the text representation of the template. It is __not recommended__ to use this if you have an opportunity to use the first API.

This API is meant strictly for interaction with template types that are __not supported__ by the first API, e.g. `cshtml`, Razor syntax etc.

Such plugins will be executed after the DOM plugins. A valid markup should be returned from this method.

### Usage examples

1. Adding an additional tag to the document

```js
module.exports = {
    templatePlugin: {
        overrideDOM({ dom, parser, serializer }) {
            // Generate the node as you would do that in the browser scope
            const additionalLink = dom.createElement('link');
            additionalLink.setAttribute('rel', 'stylesheet');
            additionalLink.setAttribute('href', 'https://my-super-source/style.css');

            // Or parse it directly from the markup!
            const additionalLink = parser.parseFromString(
                `<link rel="stylesheet" href="https://my-super-source/style.css">`
            );

            // Modify the DOM that is going to be present in the application
            dom.getElementsByTagName('head')[0].appendChild(additionalLink);

            // Remember to always return DOM from this method!
            return dom;
        }
    }
};
```

2. Adding additional non-supported by DOM syntax to the document

```js
module.exports = {
    templatePlugin: {
        overrideText({ markup }) {
            const additionalText = `@{
                var greeting = "Welcome to our Razor-powered website!";
            }`;

            return additionalText.concat(markup);
        }
    }
};
```