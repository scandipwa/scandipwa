![Create ScandiPWA App](https://user-images.githubusercontent.com/29531824/104035489-ddbfff80-51da-11eb-8efc-88adb4283cf5.png)

A zero-configuration tool-chain which allows for front-end application theming, extension and translation.

- [Creating an App](https://scandipwa.gitbook.io/create-scandipwa-app/getting-started/getting-started#creating-an-app) – How to create a new app.
- [User Guide](https://scandipwa.gitbook.io/create-scandipwa-app/) – How to develop apps bootstrapped with Create ScandiPWA App.

Create ScandiPWA App works on MacOS, Windows, and Linux. If something doesn’t work, please [file an issue](https://github.com/scandipwa/create-scandipwa-app/issues/new).

## Most important features

### Application plugins :dna:

Create [modular](https://scandipwa.gitbook.io/create-scandipwa-app/extensions/extensions) front-end application with unlimited extensibility using the [application plugins](https://scandipwa.gitbook.io/create-scandipwa-app/extensions/application-plugins) feature.

### Theme overrides :nail_care:

Create [reusable presentations](https://scandipwa.gitbook.io/create-scandipwa-app/themes/extensions-and-themes) of your frontend with inheritance-based [theming mechansim](https://scandipwa.gitbook.io/create-scandipwa-app/themes/parent-themes).

### Build configuration plugins :clamp:

Break boundaries with [pluggable build configurations](https://scandipwa.gitbook.io/create-scandipwa-app/extensions/build-configuration-plugins). Package your build-configuration into a module and share across projects.

But that's not it! Create ScandiPWA App also allows for [virtual modules](https://app.gitbook.com/@scandipwa/s/create-scandipwa-app/extensions/virtual-modules), [file provision](https://app.gitbook.com/@scandipwa/s/create-scandipwa-app/extensions/file-provision), [translations](https://scandipwa.gitbook.io/create-scandipwa-app/building-your-app/internationalization) and more!

## Creating an App

**You’ll need to have Node >= 10.13 on your local development machine** (but it’s not required on the server). You can use [n](https://www.npmjs.com/package/n) (macOS, Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

To create a new blank app, you may choose one of the following methods:

#### NPX

```bash
npx create-scandipwa-app my-app
```

[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher

#### NPM

```bash
npm init scandipwa-app my-app
```

`npm init <initializer>` is available in npm 6+

#### Yarn

```bash
yarn create scandipwa-app my-app
```

`yarn create` is available in Yarn 0.25+

> **Note**: To create an application independent from [Magento 2](https://magento.com/), add `--template blank` option to creation command.

## Contribution

We'd love to have your helping hand on `create-scandipwa-app`! See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information on what we're looking for and how to get started.

Thanks to these **awesome** :heart: people for contribution!

<a href="https://github.com/scandipwa/create-scandipwa-app/graphs/contributors">
<img src="https://contributors-img.web.app/image?repo=scandipwa/create-scandipwa-app" />
</a>

## License

Create ScandiPWA App is open source software licensed as [OSL-3.0](./LICENSE).

