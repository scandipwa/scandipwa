# Project

## Project stack description:

- [`React` as frontend app framework](https://reactjs.org)
- [`Redux` as state container](./Redux.md)
- [`Webpack` as build tool](./Webpack.md)
- [`SCSS` as CSS extension language](https://sass-lang.com)
- [`BEM` methodology for style organization](./BEM.md)

## File structure:

### Magento 2 theme related folder and files:

Because this application is compiled to a valid Magento 2 theme, it must follow [Magento theme structure](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/themes/theme-structure.html).

> **NOTE**: initially `Magento_Theme` folder is empty. You have to compile the application (please read [instructions for our bundler](./04-Webpack.md)). Or direct to (Quick start instructions)[./05-Quick-Start.md].

- `etc` – _Magento 2 Theme dir_ configuration
- `Magento_Theme` – _Magento 2 Theme dir_ Compiled assets
    - `templates` 
        - `root.phtml` – _Magento 2 Theme root template Compiled from `src/public/index.html`
    - `web`
        - `assets` – Compiled from `src/public/assets`
        - `*.(js|css)` – Compiled JS and CSS assets
- `media` –_Magento 2 Theme dir_ For theme preview picture in admin
- `theme.xml` - _Magento 2 Theme file_ Theme registration file
- `registration.php` - _Magento 2 Theme file_ Theme registration file

### React Theme

- `node_modules` – Installed NodeJS dependencies (`.gitignore`)
- `src` – `_ReactJS Theme_` Source files
    - `app` – Application root
    	- `index.js` – Application entry-point
    	- `util` – Application wise (utilities) helpers
    	    - `UtilGroupName` – Utility grouped by functional
    	        -  `*.js` – Utility name
    	        - `index.js` – Webpack *alias* file
        - `type` – React PropTypes declaration 
            - `PropTypeGroup.js` – React PropType declaration grouped by source
        - `query` – Queries for GraphQL requests
            - `QueryName` – Name of the Query
                - `QueryName.js` – Query source file
                - `index.js` – Webpack *alias* file
            - `index.js` – Webpack *alias* file – contains collection of queries
        - `component` – ReactJS components
            - `ComponentName` – Component root
                - `ComponentName.component.js` – HTML template and render related logic
                - `ComponentName.container.js` – Component business logic & Redux connection
                - `ComponentName.test.js` – Component unit tests
                - `ComponentName.style.scss` – Component styles 
                - `index.js` – Webpack alias file - exports _Container_ (*if exists*), otherwise exports _Component_.
        - `route` – ReactJS route collection
            - `RouteName` – Route root
                - `RouteName.js` – Route related business logic
                - `RouteName.scss` – Route specific styles 
                - `index.js` – Webpack *alias* file
            - `index.js` – Router initialization
        - `store` – Redux store configuration
            - `StoreModifierName` – Redux modifier root
                - `StoreModifierName.reducer.js` – Modifier action handler
                - `StoreModifierName.dispatcher.js` – Modifier action dispatcher (for async executions)
                - `StoreModifierName.action.js` – Modifier action declaration
                - `index.js` – Alias file - exports _Reducer_, _Dispatcher_, _Action_.
            - `index.js` – Reducer combination, Redux initialization
        - `style` – Application wise styles [read more about styles](./06-Styles.md)
            - `abstract` – Virtual SASS functions, mixins (non compilable) **will be injected into every component style**
                - `_abstract.scss` – File which imports all abstract functions in right order
                - `_*.scss` – Abstract functional implementations
            - `base` – Styles to native HTML5 elements
                - `_reset.scss` – CSS reset
                - `_root.scss` – `:root` styles (CSS custom variables declaration)
                - `_*.scss` – Native element style
    - `config` – [Project configuration](./03-Configuration.md)
    - `public` – Files shared as is.
        - `static` – Static assets
        - `index.html` – Template for `root.phtml`.

## How to start?

Read the [quick introduction](./02-Overview.md) to the project.

## Coding standards

This project has defined [coding standard](./08-Standard.md).

## Debugging

Learn more about debugging in the project [here](./09-Debuggers.md)
