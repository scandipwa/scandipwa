# Configuration

## File structure:

- `src` – Source files
    - `config` – Name convention: `[tool].[enviroment].config.js`
        - `babel.config.js`
        - `webpack.development.config.js`
        - `webpack.production.config.js`
        - `tests.config.js`

## Babel

This project uses [Babel](https://babeljs.io/docs/en/). By default folder aliases for `module-resolver` plugin are:
- Component: `./src/app/component/`
- Route: `./src/app/route/`
- Store: `./src/app/store/`
- Util: `./src/app/util/`

Other default, pre-installed plugins are:
- [@babel/plugin-proposal-object-rest-spread](https://babeljs.io/docs/en/next/babel-plugin-proposal-object-rest-spread.html)
- [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)
- [@babel/plugin-syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)
- [console-source](https://www.npmjs.com/package/babel-plugin-console-source)

Default presets:
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)

> Note: `babel.config.js` is not [default Babel configuration](https://babeljs.io/docs/en/configuration). It is 
custom file, which simply exports babel presets and plugins (names are similar due to name convention chosen for this directory). It is later used by Webpack `babel-loader` directly. This is a workaround for a [babel issue](https://github.com/babel/babel/issues/8309).

## Webpack

Read more in [Webpack configuration](./04-Webpack.md)
