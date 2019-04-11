# Webpack 

This project uses [Webpack](https://webpack.js.org/concepts/) as bundler for scripts and assets.

## Important notes

1. At the moment application does not pass any custom environmental variables into the application. The **public path of the theme should be changed manually**! It is located in `webpack.production.config`, the `publicPath` has to be changed if installed in non-default place. Otherwise Magento won't be able to track your theme files.
    > The support for custom env will be added in the future release
2. Due service-worker caches after the page being reloaded the old styles & scripts will be injected. We recommend using hot-reload functional to track your changes, as it bypasses SW logic.
    > The SW caches may be disabled in development mode in future

## Setup features:

- Two configurations – one for development, one for production. 
- [Fallback](#Fallback) instructions – project compiles, with no application (`src/app/*`) files in `app/design` located theme folder.
- Compiles into Magento 2 theme folder: `Magento_Theme`
- Compilation of SW and the pre-cache manifest injection

## Configuration differences

| **Property name**      | **Development specific**                   | **Similar**                                                                                                                                                  | **Production specific**                             |
|------------------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| **File location**      | `src/config/webpack.development.config.js` |                                                                               -                                                                              | `src/config/webpack.production.config.js`           |
| **Dev Server**         | Yes, port `3003`, serves compressed files  |                                                                               -                                                                              |                          -                          |
| **Destination folder** | Will not generate files.                   | `Magento_Theme/web` for assets (including JS, CSS and assets (from `src/public/assets` to `assets`)) and `Magento_Theme/templates` for root document. | Will clear `Magento_Theme` and then generate files. |
| **React dev tools**    | Are enabled                                |                                                                               -                                                                              | Are disabled                                        |
| **Html entry file**    |                      -                     | File located in `src/public/index.html`                                                                                                                      |                          -                          |
| **Source maps**        | Yes, for CSS and JS                        |                                                                               -                                                                              | No                                                  |
| **Minification**       | No                                         |                                                                               -                                                                              | Yes, CSS and JS                                     |
| **NPM command**        | `npm run watch`                            |                                                                               -                                                                              | `npm run build`                                     |
| **SW build**           | Is compiled from the same configuration    |                                                                               -                                                                              | Is compiled separately in `npm run build-sw` (which is a part of `npm run build`) |
| **SW Destination folder** | Will not generate files.                   | - | Will generate the `sw-compiled.js` (in Magento `pub` folder) during the `npm run build-sw` process. Then the pre-cache manifest (of Workbox) will be injected, and file saved as `sw.js` in the Magento `pub` folder.  |

## Fallback

Theme consists of 2 virtual code parts:
- core (`/vendor/scandipwa/source`) - comes from scandipwa/source package.
- custom - any file from core can be replaced with the file with the same name in the theme specific directory.

First of all such approach allows "as-is" approach - install PWA theme with zero-coding, at the same time - customization is unlimited at any time. On the other hand - it enables you to receive bug fixes and new features. Remember, it is still on you to adapt them once customized.

### Fallback implementation
Fallback is implemented as a Webpack plugin. Included in `plugins` section of Webpack config file. 
Has one configurable option: `fallbackRoot`, which should refer to `vendor` installed theme.

Fallback uses multiple fallback sources, those are (sequencially):
1. `app/design` (referenced as `custom`) folder
2. `vendor` (referenced as `core`) folder
3. `node_modules` of `app/design` (referenced as `node`) folder


## Compiled files:

### Application compilation:

- `Magento_Theme` – Compiled assets
    - `templates`
        - `root.phtml` – Compiled from `src/public/index.html`
    - `web`
        - `assets` – Compiled from `src/public/assets`
        - `*.(js|css)` – Compiled JS and CSS assets

### SW compilation:

- `pub` – Magento 2 public folder
    - `sw.js` – Compiled SW with injected Workbox pre-cache manifest
    - `sw-compiled.js` – Compiled SW
