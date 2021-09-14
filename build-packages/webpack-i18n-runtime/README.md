# @scandipwa/webpack-i18n-runtime

This package includes internationalization plugin used by [Create Scandipwa App](https://github.com/scandipwa/create-scandipwa-app).

This package is intended to replace the `@scandipwa/webpack-i18n-plugin`, legacy i18n implementation.

### Abstract

The legacy implementation forced to compile each language separately, resulting into multiple recompilations during one build cycle.

Also, it's been impossible to change language on the page without refetching it from the start.

This implementation lacks these limitations.

### Benefits

1. Single compilation for all locales

2. Proper chunk splitting: each translation gets compiled into its own chunk, which contains only the translation mappings

3. Locale switch in runtime fetches additional translation chunk, instead of fetching all the JS bundles + HTML document

### Limitations

1. This is a replacement for the legacy `@scandipwa/webpack-i18n-plugin`, hence it is not compatible with it.

2. When using with `@scandipwa/m2-theme` extension, static content signing should be disabled in the M2 instance and `en_US` locale should always be deployed.

### Dependencies

`@scandipwa/webpack-after-emit-logger` is used to provide useful output after builds. Make sure it is enabled in your application to have all the information this package provides!

`scandipwa/locale` PHP module is used to integrate this i18n implementation with Magento 2 framework. Use [the latest version](https://github.com/scandipwa/locale) to get support for this functionality!

### Runtime

This package globally provides a translation function `__(translatable, ...args)`, it can be called anywhere throughout the application. It translates a string, then replaces all the `%s` literals within it with values from `...args`, consequently.

### How to use

1. Enable it in your ScandiPWA project. It is enabled by default in the `@scandipwa/scandipwa` theme, no manual action required if you use it as a parent.

```json
{
    "scandipwa": {
        "extensions": {
            "@scandipwa/webpack-i18n-runtime": true
        }
    }
}
```

2. Define the desired locales in your package.json

```json
{
    "scandipwa": {
        "locales": {
            "en_US": true,
            "fr_FR": true
        }
    }
}
```

3. By default, the package utilizes the `@scandipwa/framework` to wrap the contents rendered by the `Component/App/Component` namespace's `render` function into a component that provides translations for the application. Feel free to wrap your application yourself if it does not have `@scandipwa/framework` or your `App` component's namespace differs from the default one. The component is `@scandipwa/webpack-i18n-runtime/src/component/I18n`

4. Wrap all the translatable strings within your application into `__(...)` function calls.

5. Build the application.

6. See that translation files have been automatically created in your project's `i18n` directory. All properties of these files should be filled in order to eliminate missing translations. See an example below, the `"Cart"` and `"Account"` strings are translated, the other one is not.

```json
{
    "Cart": "Chariot",
    "Account": "Compte",
    "Buy %s for %s and save %s": null
}
```

