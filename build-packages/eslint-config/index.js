const commonRules = {
    // allow complex code structs to be wrapped as args to next line
    'function-paren-newline': [
        'error',
        'multiline-arguments',
    ],
    // forcing () for arguments
    'arrow-parens': [
        'error',
        'always',
    ],
    // ordering imports correctly
    'simple-import-sort/imports': [
        'error',
        // fixed by reporting in https://github.com/lydell/eslint-plugin-simple-import-sort/issues/54
        {
            groups: [
                // TODO: test
                [
                    '^@?[a-z]',
                ], // anything that starts with @ and lowercase
                [
                    '^[^.\\u0000]',
                ], // anything but a dot and side effect imports
                [
                    '^\\.',
                ], // starting with dot
                [
                    '^\\u0000',
                ], // side effect imports
                // [
                //                 '(?!.*\\.style)^\\u0000'
                //             ],
                //             [
                //                 '^@?[a-z]'
                //             ],
                //             [
                //                 '^[^.]'
                //             ],
                //             [
                //                 '^\\..+(?!\\.style)'
                //             ],
                //             [
                //                 '.+\\.style'
                //             ]
            ],
        },
    ],
    // disable original sorting
    'sort-imports': 'off',
    'import/order': 'off',
    'import/no-cycle': [
        'error',
        {
            maxDepth: 4,
        },
    ],
    // prefer functional programming
    'fp/no-let': 'warn',
    'fp/no-loops': 'warn',
    'fp/no-arguments': 'error',
    'fp/no-delete': 'off',
    'no-var': 'error',
    // allow to proxy { default }
    'no-restricted-exports': 'off',
    'no-restricted-globals': [
        'error',
        'isFinite',
        'isNaN',
    ],
    'max-len': [
        'error',
        {
            ignoreComments: true,
            ignoreUrls: true,
            code: 120,
        },
    ],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    // TODO: check vvv
    'no-shadow': 0,
    'class-methods-use-this': 0,
    camelcase: 0,
    'no-underscore-dangle': 'off',
    'template-curly-spacing': 'off',
    'computed-property-spacing': 'off',
    'import/no-unresolved': 0,
    'import/named': 0,
    'no-plusplus': 0,
    'no-unused-vars': [
        'error',
        {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
            argsIgnorePattern: '^_',
        },
    ],
    curly: [
        2,
        'all',
    ],
    'brace-style': [
        2,
        '1tbs',
        {
            allowSingleLine: false,
        },
    ],
    'babel/semi': 1,
    'new-cap': [
        'error',
        {
            newIsCap: true,
        },
    ],
    'no-param-reassign': [
        'error',
        {
            props: true,
            ignorePropertyModificationsFor: [
                'acc',
                'sum',
            ],
        },
    ],
    'no-magic-numbers': [
        'error',
        {
            ignore: [
                1,
                0,
                2,
                -1,
            ],
        },
    ],
    indent: [
        'error',
        4,
        {
            ignoredNodes: [
                'JSXElement',
                'JSXElement > *',
                'JSXAttribute',
                'JSXIdentifier',
                'JSXNamespacedName',
                'JSXMemberExpression',
                'JSXSpreadAttribute',
                'JSXExpressionContainer',
                'JSXOpeningElement',
                'JSXClosingElement',
                'JSXText',
                'JSXEmptyExpression',
                'JSXSpreadChild',
            ],
        },
    ],
    'comma-dangle': [
        'error',
        'always-multiline',
    ],
    'no-case-declarations': 'off',
    'padding-line-between-statements': [
        'error',
        {
            blankLine: 'always',
            prev: [
                'block',
                'block-like',
                'multiline-block-like',
                'multiline-expression',
                'multiline-const',
                'multiline-let',
                'multiline-var',
            ],
            next: 'return',
        },
        {
            blankLine: 'any',
            prev: [
                'const',
                'let',
                'var',
            ],
            next: [
                'const',
                'let',
                'var',
            ],
        },
        {
            blankLine: 'always',
            prev: '*',
            next: 'return',
        },
        {
            blankLine: 'always',
            prev: '*',
            next: 'if',
        },
    ],
    'prefer-destructuring': [
        'error',
        {
            array: false,
            object: true,
        },
        {
            enforceForRenamedProperties: false,
        },
    ],
    'lines-between-class-members': [
        'error',
        'always',
    ],
    'no-extra-semi': 'error',
};

const reactRules = {
    // for some reason, this is broken ;(
    // TODO: investigate
    'import/no-import-module-exports': 'off',
    // allow only one non-default exports in the file
    'import/prefer-default-export': 'off',
    // disable import extension (.js, index.js)
    'import/extensions': 'off',
    // Allow only files with proper postfix notations
    '@scandipwa/scandipwa-guidelines/file-structure': 'error',
    // allow classes with .js contain JSX
    'react/jsx-filename-extension': 'off',
    // Make sure there is no more than one class per file
    '@scandipwa/scandipwa-guidelines/only-one-class': 'error',
    // Derive class name from file name
    '@scandipwa/scandipwa-guidelines/derived-class-names': 'error',
    // sing legacy "middleware" function
    '@scandipwa/scandipwa-guidelines/no-middleware': 'error',
    // Force @namespace comments in the code
    '@scandipwa/scandipwa-guidelines/use-namespace': 'error',
    // Use "__construct" instead of "constructor"
    '@scandipwa/scandipwa-guidelines/use-magic-construct': 'error',
    // Force exporting every variable and class on Program level of a module
    '@scandipwa/scandipwa-guidelines/export-level-one': 'error',
    // Ban using legacy "ExtensibleComponent" and "ExtensiblePureComponent"
    '@scandipwa/scandipwa-guidelines/no-extensible-base': 'error',
    // Force provide mapStateToProps and mapDispatchToProps (even if there are none)
    '@scandipwa/scandipwa-guidelines/always-both-mappings': 'error',
    // Force named and default exports (i.e. on class)
    '@scandipwa/scandipwa-guidelines/use-named-export': 'error',
    '@scandipwa/scandipwa-guidelines/create-config-files': 'error',
    // Prohibit using () => {} in classes for extensibility reasons
    '@scandipwa/scandipwa-guidelines/no-arrow-functions-in-class': 'error',
    // Prevent from { ...this.props } destruction in containers
    'react/jsx-props-no-spreading': 'off',
    '@scandipwa/scandipwa-guidelines/jsx-no-props-destruction': 'error',
    // ban setting JSX in state (via variable)
    '@scandipwa/scandipwa-guidelines/no-jsx-variables': 'error',
    // force only render methods in component classes
    '@scandipwa/scandipwa-guidelines/only-render-in-component': 'error',
    // force not using conditional expressions in JSX
    '@scandipwa/scandipwa-guidelines/jsx-no-conditional': 'error',
    'import/no-extraneous-dependencies': 'off',
    // forbid empty PropTypes.shape({})
    '@scandipwa/scandipwa-guidelines/forbid-prop-types-in-shape': 'error',
    // enforce small files
    'max-lines': ['error', 250],
    // disabled for now (need to allow ignore) https://github.com/jsx-eslint/eslint-plugin-react/issues/3147
    'react/no-unused-class-component-methods': 'off',
    // allow BEM props
    'react/no-unknown-property': ['error', { ignore: ['block', 'elem', 'mods', 'mix'] }],
    'css-rcurlyexpected': 0,
    'react/static-property-placement': [
        'error',
        'static public field',
    ],
    // Force boolean prop naming with isXX
    'react/boolean-prop-naming': ['error', { rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
    'react/state-in-constructor': 'off',
    'react/react-in-jsx-scope': 0,
    'react/jsx-curly-spacing': [
        2,
        {
            when: 'always',
            allowMultiline: false,
            children: true,
        },
    ],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    // "react/jsx-max-depth": [2, { "max": 2 }],
    'react/jsx-no-useless-fragment': [
        2,
        {
            max: 2,
        },
    ],
    // sort methods in class
    'react/sort-comp': [
        2,
        {
            order: [
                'type-annotations',
                'static-variables',
                'static-methods',
                'instance-variables',
                '__construct',
                'lifecycle',
                'everything-else',
                'render',
            ],
        },
    ],
    'react/prefer-stateless-function': 0,
    'react/button-has-type': 0,
    'react/jsx-indent': 0,
    'react/jsx-indent-props': 2,
    // prefer using link over a element
    'react/forbid-elements': [
        1,
        {
            forbid: [
                {
                    element: 'a',
                    message: 'Use the <Link> component instead of <a>.',
                },
            ],
        },
    ],
    'react/jsx-no-bind': [
        2,
        {
            ignoreDOMComponents: false,
            ignoreRefs: true,
            allowArrowFunctions: false,
            allowFunctions: false,
            allowBind: false,
        },
    ],
    // Prevent people from using className (prefer block, elem,) + Avoid generic prop names too
    'react/forbid-prop-types': [
        2,
        {
            forbid: [
                'className',
                'any',
                'object',
                'array',
            ],
        },
    ],
    'react/forbid-component-props': [
        2,
        {
            forbid: [
                'className',
                'any',
            ],
        },
    ],
    'react/forbid-dom-props': [
        2,
        {
            forbid: [
                'className',
            ],
        },
    ],
    'react/no-deprecated': 2,
    'jsx-a11y/label-has-for': 0,
};

const reactTsRules = {
    '@typescript-eslint/no-unused-vars-experimental': 'off',
    '@typescript-eslint/space-before-blocks': 'off',
    // TODO: check vvv
    '@typescript-eslint/no-shadow': 'off',
    // disable native unused vars
    'no-unused-vars': 'off',
    // Resolve problems with false-positive unused-vars
    '@typescript-eslint/no-unused-vars': commonRules['no-unused-vars'],
    // Disable "React" was used... issue see more in:https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined
    '@typescript-eslint/no-use-before-define': 'off',
    // Allow empty functions, i.e. in defaultProps
    '@typescript-eslint/no-empty-function': 'off',
    indent: 'off',
    '@typescript-eslint/indent': [
        'error',
        4,
        {
            ignoredNodes: [
                'JSXElement',
                'JSXElement > *',
                'JSXAttribute',
                'JSXIdentifier',
                'JSXNamespacedName',
                'JSXMemberExpression',
                'JSXSpreadAttribute',
                'JSXExpressionContainer',
                'JSXOpeningElement',
                'JSXClosingElement',
                'JSXText',
                'JSXEmptyExpression',
                'JSXSpreadChild',
            ],
        },
    ],
    // force commas at the end
    '@typescript-eslint/comma-dangle': [
        'error',
        'always-multiline',
    ],
    // force moving object keys to const
    '@typescript-eslint/naming-convention': [
        'error',
        {
            selector: 'default',
            format: [
                'camelCase',
                'PascalCase',
                'snake_case',
                'UPPER_CASE',
            ],
            leadingUnderscore: 'allow',
        },
        {
            selector: 'method',
            format: null,
            filter: '^__construct$',
            leadingUnderscore: 'allow',
        },
        {
            selector: 'function',
            format: null,
            filter: '^__$',
            leadingUnderscore: 'allow',
        },
    ],
    '@typescript-eslint/member-delimiter-style': [
        'warn',
        {
            multiline: {
                delimiter: 'semi',
                requireLast: true,
            },
            singleline: {
                delimiter: 'semi',
                requireLast: false,
            },
        },
    ],
};

module.exports = {
    extends: [
        'airbnb',
        'plugin:array-func/recommended',
    ],
    ignorePatterns: [
        'package.json',
        'tsconfig.json',
    ],
    env: {
        browser: true,
    },
    parser: '@babel/eslint-parser',
    globals: {
        window: true,
        document: true,
        globalThis: true,
        sessionStorage: true,
        localStorage: true,
        jest: true,
        PureComponent: true,
        middleware: true,
        __: true,
        workbox: true,
        importScripts: true,
        React: true,
    },
    plugins: [
        '@scandipwa/scandipwa-guidelines',
        'simple-import-sort',
        'import',
        'react',
        'import',
        'jest',
        'babel',
        'fp',
    ],
    /**
     * 1. We use common rules everywhere
     * 2. We use React rules for src JS packages
     * 3. We use Typescript rules for src TS packages
     * 4-5. We ignore some React rules for configs and plugins
     * 6. We ignore some common rules for build folders
     */
    rules: commonRules,
    overrides: [{
        files: ['src/**/*.js', 'src/**/*.jsx'],
        rules: reactRules,
    }, {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        extends: [
            'airbnb',
            'airbnb-typescript',
        ],
        rules: {
            ...commonRules,
            ...reactRules,
            ...reactTsRules,
        },
    }, {
        files: [
            '*.config.*',
            'src/config/**',
        ],
        rules: {
            '@scandipwa/scandipwa-guidelines/only-one-class': 'off',
            '@scandipwa/scandipwa-guidelines/derived-class-names': 'off',
            '@scandipwa/scandipwa-guidelines/use-namespace': 'off',
            '@scandipwa/scandipwa-guidelines/export-level-one': 'off',
            '@scandipwa/scandipwa-guidelines/use-named-export': 'off',
            '@scandipwa/scandipwa-guidelines/create-config-files': 'off',
            'import/prefer-default-export': 'off',
        },
    }, {
        files: ['*.plugin.*'],
        rules: {
            '@scandipwa/scandipwa-guidelines/use-named-export': 'off',
            '@scandipwa/scandipwa-guidelines/create-config-files': 'off',
            '@scandipwa/scandipwa-guidelines/use-namespace': 'off',
            '@scandipwa/scandipwa-guidelines/export-level-one': 'off',
        },
    }, {
        files: [
            '*.reducer.ts',
        ],
        rules: {
            '@typescript-eslint/default-param-last': 'off',
        },
    }, {
        files: ['build*/**/*'],
        rules: {
            'no-magic-numbers': 'off',
            'max-lines': 'off',
            'import/no-dynamic-require': 'off',
            'fp/no-let': 'off',
            'global-require': 'off',
            'max-len': [
                'error',
                {
                    code: 150,
                    ignorePattern: 'logger.',
                },
            ],
        },
    }],
};
