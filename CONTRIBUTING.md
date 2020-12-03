# Contributing to ScandiPWA

Loving ScandiPWA and want to get involved? Thanks! There are plenty of ways you can help.

Please take a moment to review this document in order to make the contribution process straightforward and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue or assessing patches and features.

## Core ideas

> **TODO**: implement

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

1. Clone the repo with git clone https://github.com/scandipwa/scandipwa
2. Run `yarn` in the root create-scandipwa-app folder.
3. Go to `packages/scandipwa`
4. Type in `yarn start`

Now you can modify files and see changes!

## Publishing

Use `lerna publish --exact` command.

For canary publishing, use `lerna publish --canary --exact --preid next --dist-tag=next minor`

