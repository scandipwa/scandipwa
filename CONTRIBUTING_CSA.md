# Contributing to Create ScandiPWA App

Loving Create ScandiPWA App and want to get involved? Thanks! There are plenty of ways you can help.

Please take a moment to review this document in order to make the contribution process straightforward and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue or assessing patches and features.

## Core Ideas

The Create ScandiPWA App ideas build on-top-of what Create React App has defined. Read [their core ideas](https://github.com/facebook/create-react-app/blob/master/CONTRIBUTING.md#core-ideas) first.

### Extensibilty and hierarchy

Everything we build must be extensible. Opening up the build configuration for plugins was not obligatory, thus we specifically looked for the technology with plugin support - [Craco](https://github.com/gsoft-inc/craco). The hierarchy means we must always keep in mind our source-code priority: from extension, to parent-themes, to the user theme.

## Submitting a Pull Request

Good pull requests, such as patches, improvements, and new features, are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

Please ask first if somebody else is already working on this or the core developers think your feature is in-scope for Create ScandiPWA App. Generally always have a related issue with discussions for whatever you are including.

Please also provide a test plan, i.e. specify how you verified that your addition works.

## Folder Structure

```
└── 📁  build-packages
   ├── 📁 babel-plugin-middleware-decorator
   ├── 📁 craco
   ├── 📁 create-scandipwa-app
   ├── 📁 csa-generator-blank
   ├── 📁 csa-generator-extension
   ├── 📁 csa-generator-theme
   ├── 📁 eslint-config
   ├── 📁 eslint-plugin-scandipwa-guidelines
   ├── 📁 scandipwa-cli
   ├── 📁 scandipwa-dev-utils
   ├── 📁 scandipwa-development-toolkit-csa
   ├── 📁 scandipwa-extensibility
   ├── 📁 scandipwa-scripts
   ├── 📁 webpack-extension-import-loader
   ├── 📁 webpack-fallback-plugin
   └── 📁 webpack-i18n-plugin
```

## Setting up a local copy

Setting Up a Local Copy
1. Clone the repo with `git clone https://github.com/scandipwa/create-scandipwa-app`
2. Run `yarn` in the root `create-scandipwa-app` folder.

You may now create a test project using `create-scandipwa-app`, for that, type in: `yarn csa`. This will create a ScandiPWA project in `runtime-packages/csa` and print you futher instructions.

## Publishing

Use `lerna publish --exact` command.

For canary publishing, use `lerna publish --canary --exact --preid next --dist-tag=next minor`

