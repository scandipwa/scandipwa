# ScandiPWA Theme
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/839cbb593b36432faecd5da0c3844ca8)](https://www.codacy.com/app/ScandiPWA/base-theme?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=scandipwa/base-theme&amp;utm_campaign=Badge_Grade)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme?ref=badge_shield)

This repository contains ScandiPWA Theme sources.

> Unless you are trying to commit to "core" components - use `composer require scandipwa\installer` [package](https://bitbucket.org/scandiweb/scandipwa-theme-installer) instead.

## Important note

This branch contains 2.x version, that requires different DB dump available on [2.0 branch](https://github.com/scandipwa/scandipwa-base/commits/2.0)

It is important to ensure you are following the best practices and setting web-server root to `/pub` folder or adapt the build configs prefixing the pathes with `/pub` dir <https://github.com/scandipwa/base-theme/issues/134>

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/alujane"><img src="https://avatars3.githubusercontent.com/u/12761386?v=4" width="100px;" alt="alujane"/><br /><sub><b>alujane</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=alujane" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dmitrijs-voronovs"><img src="https://avatars2.githubusercontent.com/u/53301511?v=4" width="100px;" alt="Dmitrijs Voronovs"/><br /><sub><b>Dmitrijs Voronovs</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=dmitrijs-voronovs" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/edgars1337"><img src="https://avatars1.githubusercontent.com/u/53514184?v=4" width="100px;" alt="edgars1337"/><br /><sub><b>edgars1337</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=edgars1337" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/reinis-mazeiks/"><img src="https://avatars0.githubusercontent.com/u/11248241?v=4" width="100px;" alt="Reinis Mazeiks"/><br /><sub><b>Reinis Mazeiks</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=rMazeiks" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/aleksandrsho"><img src="https://avatars3.githubusercontent.com/u/33932820?v=4" width="100px;" alt="aleksandrsho"/><br /><sub><b>aleksandrsho</b></sub></a><br /><a href="#content-aleksandrsho" title="Content">🖋</a> <a href="#business-aleksandrsho" title="Business development">💼</a> <a href="#translation-aleksandrsho" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
