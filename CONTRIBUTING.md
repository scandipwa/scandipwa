# Contributing to ScandiPWA

Loving ScandiPWA and want to get involved? Thanks! There are plenty of ways you can help.

Please take a moment to review this document in order to make the contribution process straightforward and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue or assessing patches and features.

## Submitting a Pull Request

Good pull requests, such as patches, improvements, and new features, are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

Please ask first if somebody else is already working on this or the core developers think your feature is in-scope for Create ScandiPWA App. Generally always have a related issue with discussions for whatever you are including.

Please also provide a test plan, i.e. specify how you verified that your addition works.

## Folder Structure

```
└── 📁  packages
   ├── 📁 scandipwa
   ├── 📁 m2-theme
   ├── 📁 bundle-analyzer
   ├── 📁 router
   └── 📁 framework
```

## Setting up a local copy

1. Clone the repo with `git clone https://github.com/scandipwa/scandipwa`
2. Run `yarn` in the root `scandipwa` folder.
3. Go to `packages/scandipwa`
4. Type in `yarn start`

Now you can modify files and see changes!

### Sym-linking with legacy docker-setup

1. In your docker-project root directory, run `mkdir src/localmodules`
2. Clone the repo into that folder with `git clone https://github.com/scandipwa/scandipwa src/localmodules/scandipwa`
3. Enter the `scandipwa` folder with `cd src/localmodules/scandipwa`
4. Install dependencies by running `yarn` (make sure you are on a correct branch, `create-scandipwa-app` as of 8th December 2020)
5. Now enter the `scandipwa` package directory with `cd packages/scandipwa`
6. Start the development using the `BUILD_MODE=magento yarn start`
7. Now keep that process running and open another terminal tab / window / session
8. Run your Docker application using the `dc up -d` (not `dcf` or `dcc`).
9. Enter the application container using the `inapp bash`
10. Remove installed ScandiPWA packages: `composer remove scandipwa/installer`
11. Now add local composer repository: `composer config repo.theme path localmodules/scandipwa/packages/scandipwa/`
12. Require the new ScandiPWA theme: `composer require scandipwa/scandipwa`
13. Run setup upgrade: `magento se:up`
14. Disable full-page cache: `magento cache:disable full_page`
15. Go to Magento 2 admin, visit `Content > Design > Configuration`, select last row, click last column `Edit` button. Select `scandipwa/scandipwa`.
16. Run `magento cache:flush`

## Publishing

Use `lerna publish` command.

For canary publishing, use `lerna publish --canary --exact --preid next --dist-tag=next minor`

