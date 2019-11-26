# ScandiPWA Theme
[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)](#contributors)

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
    <td align="center"><a href="https://github.com/atravkovs"><img src="https://avatars0.githubusercontent.com/u/12703177?v=4" width="100px;" alt="Artjoms Travkovs"/><br /><sub><b>Artjoms Travkovs</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=atravkovs" title="Code">💻</a> <a href="#ideas-atravkovs" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-atravkovs" title="Reviewed Pull Requests">👀</a> <a href="#question-atravkovs" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/ErnestsVerins"><img src="https://avatars1.githubusercontent.com/u/57095300?v=4" width="100px;" alt="ErnestsVerins"/><br /><sub><b>ErnestsVerins</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=ErnestsVerins" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mgmanoj"><img src="https://avatars3.githubusercontent.com/u/13735397?v=4" width="100px;" alt="Manoj MG"/><br /><sub><b>Manoj MG</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=mgmanoj" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ainarssondors"><img src="https://avatars1.githubusercontent.com/u/48548028?v=4" width="100px;" alt="ainarssondors"/><br /><sub><b>ainarssondors</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=ainarssondors" title="Code">💻</a> <a href="https://github.com/scandipwa/base-theme/issues?q=author%3Aainarssondors" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/vladimirsm"><img src="https://avatars2.githubusercontent.com/u/28219370?v=4" width="100px;" alt="Vladimirs Mihnovics"/><br /><sub><b>Vladimirs Mihnovics</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=vladimirsm" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ybutrameev"><img src="https://avatars1.githubusercontent.com/u/38831994?v=4" width="100px;" alt="Yefim"/><br /><sub><b>Yefim</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=ybutrameev" title="Code">💻</a> <a href="https://github.com/scandipwa/base-theme/issues?q=author%3Aybutrameev" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/atachh"><img src="https://avatars1.githubusercontent.com/u/13818833?v=4" width="100px;" alt="Dmitry Asanov"/><br /><sub><b>Dmitry Asanov</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=atachh" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/eli-l"><img src="https://avatars2.githubusercontent.com/u/7448649?v=4" width="100px;" alt="Ilja Lapkovskis"/><br /><sub><b>Ilja Lapkovskis</b></sub></a><br /><a href="https://github.com/scandipwa/base-theme/commits?author=eli-l" title="Code">💻</a> <a href="#infra-eli-l" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-eli-l" title="Maintenance">🚧</a> <a href="#ideas-eli-l" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/scandipwa/base-theme/issues?q=author%3Aeli-l" title="Bug reports">🐛</a> <a href="#projectManagement-eli-l" title="Project Management">📆</a> <a href="#review-eli-l" title="Reviewed Pull Requests">👀</a> <a href="#content-eli-l" title="Content">🖋</a> <a href="https://github.com/scandipwa/base-theme/commits?author=eli-l" title="Documentation">📖</a> <a href="#question-eli-l" title="Answering Questions">💬</a> <a href="#talk-eli-l" title="Talks">📢</a> <a href="#video-eli-l" title="Videos">📹</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
