<a href="https://demo.scandipwa.com">
  <img src="https://repository-images.githubusercontent.com/174561264/283d7880-15e6-11ea-894e-5b04d2a1ad5c" alt="Banner stating: ScandiPWA - the first Open Source PWA Theme for Magento">
</a>

# ScandiPWA Theme

[![The dev branch - 2.x-dev](https://img.shields.io/badge/dev%20branch-2.x--dev-blue)](https://github.com/scandipwa/base-theme/tree/2.x-dev)
[![The stable branch - 2.x-stable](https://img.shields.io/badge/stable%20branch-2.x--stable-blue)](https://github.com/scandipwa/base-theme/tree/2.x-stable)
[![Join community Slack](https://img.shields.io/badge/join-community%20slack-brightgreen)](https://join.slack.com/t/scandipwa/shared_invite/enQtNzE2Mjg1Nzg3MTg5LTQwM2E2NmQ0NmQ2MzliMjVjYjQ1MTFiYWU5ODAyYTYyMGQzNWM3MDhkYzkyZGMxYTJlZWI1N2ExY2Q1MDMwMTk)
[![All Contributors](https://img.shields.io/badge/all_contributors-38-orange.svg)](#contributors)
<!--
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/839cbb593b36432faecd5da0c3844ca8)](https://www.codacy.com/app/ScandiPWA/base-theme?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=scandipwa/base-theme&amp;utm_campaign=Badge_Grade)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme?ref=badge_shield)
-->


This repository contains ScandiPWA Theme sources. Read full application documentation [here](https://docs.scandipwa.com/#/theme/01-Project).

## Local development

The [docker environment](https://github.com/scandipwa/scandipwa-base) is prepared to deploy and develop theme. We strictly recommend using it!

## Important notes

### Prefer composer installation

Unless you are trying to contribute, use composer to install this package: `composer install scandipwa/installer` - see more details [here](https://github.com/scandipwa/installer). Make sure your server root is `/pub`. Read more how to do this in [official Magento 2 docs](https://devdocs.magento.com/guides/v2.3/install-gde/tutorials/change-docroot-to-pub.html).

### Environment & Stack

ScandiPWA theme is based on React and Redux. It is built with Webpack v4, therefore **you will need NodeJS environment support** on your CI/CD server or local machine in order to build it. Once theme is built it is a valid Magento 2 theme with no additional requirements.

### Caching

For better performance Varnish cache is required. You must ensure Varnish is caching static (javascript and CSS) in order to have the best performance for the app shell loading.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/alujane"><img src="https://avatars3.githubusercontent.com/u/12761386?v=4" width="50px;" alt=""/><br /><sub><b>alujane</b></sub></a></td>
    <td align="center"><a href="https://github.com/dmitrijs-voronovs"><img src="https://avatars2.githubusercontent.com/u/53301511?v=4" width="50px;" alt=""/><br /><sub><b>Dmitrijs Voronovs</b></sub></a></td>
    <td align="center"><a href="https://github.com/edgars1337"><img src="https://avatars1.githubusercontent.com/u/53514184?v=4" width="50px;" alt=""/><br /><sub><b>edgars1337</b></sub></a></td>
    <td align="center"><a href="https://www.linkedin.com/in/reinis-mazeiks/"><img src="https://avatars0.githubusercontent.com/u/11248241?v=4" width="50px;" alt=""/><br /><sub><b>Reinis Mazeiks</b></sub></a></td>
    <td align="center"><a href="https://github.com/aleksandrsho"><img src="https://avatars3.githubusercontent.com/u/33932820?v=4" width="50px;" alt=""/><br /><sub><b>aleksandrsho</b></sub></a></td>
    <td align="center"><a href="https://github.com/atravkovs"><img src="https://avatars0.githubusercontent.com/u/12703177?v=4" width="50px;" alt=""/><br /><sub><b>Artjoms Travkovs</b></sub></a></td>
    <td align="center"><a href="https://github.com/ErnestsVerins"><img src="https://avatars1.githubusercontent.com/u/57095300?v=4" width="50px;" alt=""/><br /><sub><b>ErnestsVerins</b></sub></a></td>
    <td align="center"><a href="http://scandiweb.com"><img src="https://avatars3.githubusercontent.com/u/56016827?v=4" width="50px;" alt=""/><br /><sub><b>Kirils Scerba</b></sub></a></td>
    <td align="center"><a href="https://github.com/mgmanoj"><img src="https://avatars3.githubusercontent.com/u/13735397?v=4" width="50px;" alt=""/><br /><sub><b>Manoj MG</b></sub></a></td>
    <td align="center"><a href="https://github.com/ainarssondors"><img src="https://avatars1.githubusercontent.com/u/48548028?v=4" width="50px;" alt=""/><br /><sub><b>ainarssondors</b></sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/vladimirsm"><img src="https://avatars2.githubusercontent.com/u/28219370?v=4" width="50px;" alt=""/><br /><sub><b>Vladimirs Mihnovics</b></sub></a></td>
    <td align="center"><a href="https://github.com/ybutrameev"><img src="https://avatars1.githubusercontent.com/u/38831994?v=4" width="50px;" alt=""/><br /><sub><b>Yefim</b></sub></a></td>
    <td align="center"><a href="https://github.com/atachh"><img src="https://avatars1.githubusercontent.com/u/13818833?v=4" width="50px;" alt=""/><br /><sub><b>Dmitry Asanov</b></sub></a></td>
    <td align="center"><a href="https://github.com/eli-l"><img src="https://avatars2.githubusercontent.com/u/7448649?v=4" width="50px;" alt=""/><br /><sub><b>Ilja Lapkovskis</b></sub></a></td>
    <td align="center"><a href="https://twitter.com/RaivisDejus"><img src="https://avatars0.githubusercontent.com/u/5319134?v=4" width="50px;" alt=""/><br /><sub><b>Raivis Dejus</b></sub></a></td>
    <td align="center"><a href="http://kandrejevs.com"><img src="https://avatars1.githubusercontent.com/u/4084128?v=4" width="50px;" alt=""/><br /><sub><b>Krišs</b></sub></a></td>
    <td align="center"><a href="https://github.com/mageprincess"><img src="https://avatars2.githubusercontent.com/u/17780518?v=4" width="50px;" alt=""/><br /><sub><b>mageprincess</b></sub></a></td>
    <td align="center"><a href="https://github.com/IndarsL"><img src="https://avatars1.githubusercontent.com/u/25637231?v=4" width="50px;" alt=""/><br /><sub><b>Indars Lejins</b></sub></a></td>
    <td align="center"><a href="https://github.com/robertsbriedis"><img src="https://avatars1.githubusercontent.com/u/51077929?v=4" width="50px;" alt=""/><br /><sub><b>Roberts</b></sub></a></td>
    <td align="center"><a href="https://www.rltsquare.com/"><img src="https://avatars0.githubusercontent.com/u/32421711?v=4" width="50px;" alt=""/><br /><sub><b>Malik Ahmad</b></sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/artursgailis"><img src="https://avatars2.githubusercontent.com/u/40202738?v=4" width="50px;" alt=""/><br /><sub><b>artursgailis</b></sub></a></td>
    <td align="center"><a href="https://github.com/mihailspopovs4"><img src="https://avatars3.githubusercontent.com/u/54805724?v=4" width="50px;" alt=""/><br /><sub><b>mihailspopovs4</b></sub></a></td>
    <td align="center"><a href="https://github.com/Animimar"><img src="https://avatars2.githubusercontent.com/u/32173359?v=4" width="50px;" alt=""/><br /><sub><b>Tanunuki</b></sub></a></td>
    <td align="center"><a href="http://teomedia.dk"><img src="https://avatars2.githubusercontent.com/u/8639654?v=4" width="50px;" alt=""/><br /><sub><b>Teodor Moquist</b></sub></a></td>
    <td align="center"><a href="https://github.com/alfredsgenkins"><img src="https://avatars1.githubusercontent.com/u/29531824?v=4" width="50px;" alt=""/><br /><sub><b>Alfreds Genkins</b></sub></a></td>
    <td align="center"><a href="https://github.com/Chevskis"><img src="https://avatars2.githubusercontent.com/u/15198469?v=4" width="50px;" alt=""/><br /><sub><b>Klāvs Kačevskis</b></sub></a></td>
    <td align="center"><a href="https://github.com/lianastaskevica"><img src="https://avatars3.githubusercontent.com/u/52198221?v=4" width="50px;" alt=""/><br /><sub><b>Liana </b></sub></a></td>
    <td align="center"><a href="http://danpiel.net"><img src="https://avatars1.githubusercontent.com/u/367141?v=4" width="50px;" alt=""/><br /><sub><b>Yuri Egorov</b></sub></a></td>
    <td align="center"><a href="https://github.com/joy-codilar"><img src="https://avatars2.githubusercontent.com/u/46239833?v=4" width="50px;" alt=""/><br /><sub><b>Jayanka Ghosh</b></sub></a></td>
    <td align="center"><a href="https://github.com/kiran-codilar"><img src="https://avatars1.githubusercontent.com/u/16700298?v=4" width="50px;" alt=""/><br /><sub><b>Kiran</b></sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/krystian15"><img src="https://avatars3.githubusercontent.com/u/31726767?v=4" width="50px;" alt=""/><br /><sub><b>krystian15</b></sub></a></td>
    <td align="center"><a href="https://github.com/negzu"><img src="https://avatars3.githubusercontent.com/u/46347627?v=4" width="50px;" alt=""/><br /><sub><b>Yegor Batov</b></sub></a></td>
    <td align="center"><a href="https://aarhof.eu"><img src="https://avatars3.githubusercontent.com/u/20708?v=4" width="50px;" alt=""/><br /><sub><b>Martin Århof</b></sub></a></td>
    <td align="center"><a href="https://github.com/yashkumarsharma"><img src="https://avatars2.githubusercontent.com/u/386162?v=4" width="50px;" alt=""/><br /><sub><b>yashkumarsharma</b></sub></a></td>
    <td align="center"><a href="https://github.com/pwalus"><img src="https://avatars1.githubusercontent.com/u/22379159?v=4" width="50px;" alt=""/><br /><sub><b>Patryk Waluś</b></sub></a></td>
    <td align="center"><a href="https://github.com/grumpy-pirate"><img src="https://avatars3.githubusercontent.com/u/7815525?v=4" width="50px;" alt=""/><br /><sub><b>grumpy-pirate</b></sub></a></td>
    <td align="center"><a href="http://www.magonex.com"><img src="https://avatars1.githubusercontent.com/u/18647834?v=4" width="50px;" alt=""/><br /><sub><b>Bahram Davoodi</b></sub></a></td>
    <td align="center"><a href="http://jdlms.com"><img src="https://avatars0.githubusercontent.com/u/24616413?v=4" width="50px;" alt=""/><br /><sub><b>Megazoor</b></sub></a></td>
    <td align="center"><a href="https://github.com/joostm020"><img src="https://avatars1.githubusercontent.com/u/26708268?v=4" width="50px;" alt=""/><br /><sub><b>Joost Meijer</b></sub></a></td>
    <td align="center"><a href="http://yousef.io"><img src="https://avatars1.githubusercontent.com/u/734823?v=4" width="50px;" alt=""/><br /><sub><b>Yousef Cisco</b></sub></a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fscandipwa%2Fbase-theme?ref=badge_large)
