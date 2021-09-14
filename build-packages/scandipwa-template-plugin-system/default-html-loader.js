/**
 * This loader is basically the same thing as
 * `html-webpack-plugin/lib/loader`
 * But it is forced to work even if other loaders are present.
 *
 * It is expected that corresponding ScandiPWA APIs will be used
 * to disable this plugin, if and/or when necessary.
 */

const _ = require('lodash');
const loaderUtils = require('loader-utils');

module.exports = function defaultHtmlLoader(source) {
    const options = loaderUtils.getOptions(this);

    // The following part renders the template with lodash as a minimalistic loader
    const template = _.template(
        source,
        _.defaults(options, { interpolate: /<%=([\s\S]+?)%>/g, variable: 'data' })
    );

    // Use __non_webpack_require__ to enforce using the native nodejs require
    // during template execution
    return [
        `var _ = __non_webpack_require__(${ JSON.stringify(require.resolve('lodash')) });`,
        'module.exports = function (templateParams) { with(templateParams) {',
        // Execute the lodash template
        `return (${ template.source })();`,
        '}}'
    ].join('');
};
