# @scandipwa/chunk-optimizer

This package includes Webpack chunk optimizer extension used by [Create Scandipwa App](https://github.com/scandipwa/create-scandipwa-app).

Package is currently under development. Docs too.
**Try at your own risk!**

## Chunks
Currently, all style elements are distributed between following chunks:
* main
* vendor
* product
* category
* cart
* checkout
* wishlist
* account
* misc

## Expanding
To move file to specific chunk use one of three options:
1. Name tagging:
   1. By using one of following name formats you can disable SplitChunksPlugin configuration:
      1. `[name].manual.style.[scss/css]`
      2. `[name.manual.extended.style.[scss/css]`
2. Dynamic import:
   1. `import(/* webpackChunkName: "[chunk-name]" */ '[path]');`
3. Changing configuration.
