/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

module.exports = {
    extends: [
        '@scandipwa',
    ],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
        requireConfigFile: false,
    },
    rules: {
        // be more strict to core
        'fp/no-let': 'error',
        'fp/no-loops': 'error',
        // add license
        '@scandipwa/scandipwa-guidelines/use-license': 'error',
        // avoid duplicate namespaces for core
        '@scandipwa/scandipwa-guidelines/no-duplicate-namespaces': 'error',
        // allow (for initial state in reducers)
        '@typescript-eslint/default-param-last': 'off',
        // disabled to keep namespace compatible
        '@scandipwa/scandipwa-guidelines/derived-class-names': 'off',
        // TODO: disable someday
        '@scandipwa/scandipwa-guidelines/jsx-no-conditional': 'off',
        '@scandipwa/scandipwa-guidelines/only-render-in-component': 'off',
        '@scandipwa/scandipwa-guidelines/no-jsx-variables': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'max-lines': 'off',
        'max-len': 'off',
    },
    overrides: [
        // {
        //     files: [
        //         '*.reducer.ts'
        //     ],
        //     rules: {
        //         '@typescript-eslint/default-param-last': 'off'
        //     }
        // }
    ],
};
