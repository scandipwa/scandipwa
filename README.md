# ScandiPWA Theme
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme?ref=badge_shield)


This repository contains ScandiPWA Theme sources. 

> Unless you are trying to commit to "core" components - use `composer require scandipwa\installer` [package](https://bitbucket.org/scandiweb/scandipwa-theme-installer) instead.

## Environment

ScandiPWA Theme is based on React and Redux. It is built with Webpack v4, therefore **you will need NodeJS environment support** on your CI/CD server or local machine in order to build it.

## Runtime

Once theme is built it is a valid Magento 2 theme with no additional requirements.

## Caching

For better performance Varnish cache is required. You must ensure Varnish is caching static (javascript and CSS) in order to have the best performance for the app shell loading.

## ScandiPWA docs

Read [full application documentation](./docs/01-Project.md)

## Docker for local development

The docker environment is prepared to deploy and develop theme - [scandipwa-base](https://github.com/scandipwa/scandipwa-base)

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme?ref=badge_large)
