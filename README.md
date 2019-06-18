# ScandiPWA Theme
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/839cbb593b36432faecd5da0c3844ca8)](https://www.codacy.com/app/ScandiPWA/base-theme?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=scandipwa/base-theme&amp;utm_campaign=Badge_Grade)

This repository contains ScandiPWA Theme sources. 

> Unless you are trying to commit to "core" components - use `composer require scandipwa\installer` [package](https://bitbucket.org/scandiweb/scandipwa-theme-installer) instead.

## Installation notes
It is important to ensure you are following the best practices and setting web-server root to `/pub` folder or adapt the build configs prefixing the pathes with `/pub` dir https://github.com/scandipwa/base-theme/issues/134

[Official Magento 2 docs](https://devdocs.magento.com/guides/v2.3/install-gde/tutorials/change-docroot-to-pub.html)

### Upgrading to version ^1.7

When upgrading to theme version ^1.7, pay attention to `webpack.*.config` files, new plugin was added there. Also, the index is now split in two parts: the `index.production.html` and `index.development.html`.

## Environment

ScandiPWA Theme is based on React and Redux. It is built with Webpack v4, therefore **you will need NodeJS environment support** on your CI/CD server or local machine in order to build it.

## Runtime

Once theme is built it is a valid Magento 2 theme with no additional requirements.

## Caching

For better performance Varnish cache is required. You must ensure Varnish is caching static (javascript and CSS) in order to have the best performance for the app shell loading.

## ScandiPWA docs

Read [full application documentation](https://docs.scandipwa.com/#/theme/01-Project)

## Docker for local development

The docker environment is prepared to deploy and develop theme - [scandipwa-base](https://github.com/scandipwa/scandipwa-base)

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme?ref=badge_large)
