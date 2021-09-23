const webpackConfig = require("./storybook-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
  "stories": [
    "../src/stories/*.@(stories|story).mdx",
    "../src/stories/*.@(stories|story).@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
    './scandipwa-preset.js'
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  }
}