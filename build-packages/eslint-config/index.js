module.exports = {
    extends: [
        'airbnb',
        'plugin:array-func/recommended'
    ],
    env: {
        browser: true
    },
    parser: 'babel-eslint',
    globals: {
        window: true,
        document: true,
        sessionStorage: true,
        localStorage: true,
        jest: true,
        __: true,
        workbox: true,
        importScripts: true
    },
    plugins: [
        '@scandipwa/scandipwa-guidelines',
        'simple-import-sort',
        'import',
        'react',
        'import',
        'jest',
        'babel',
        'fp'
    ],
    overrides: [{
        // Ignore the ScandiPWA specific rule for build-related files
        files: ['build*/**/*'],
        rules: {
            '@scandipwa/scandipwa-guidelines/only-one-class': 'off',
            '@scandipwa/scandipwa-guidelines/derived-class-names': 'off',
            '@scandipwa/scandipwa-guidelines/use-namespace': 'off',
            '@scandipwa/scandipwa-guidelines/export-level-one': 'off',
            '@scandipwa/scandipwa-guidelines/use-named-export': 'off',
            '@scandipwa/scandipwa-guidelines/create-config-files': 'off',
            '@scandipwa/scandipwa-guidelines/use-magic-construct': 'off',
            'no-magic-numbers': 'off',
            'max-lines': 'off',
            'import/no-dynamic-require': 'off',
            'fp/no-let': 'off',
            'global-require': 'off',
            'max-len': [
                'error',
                {
                    code: 150,
                    ignorePattern: 'logger.'
                }
            ]
        }
    }, {
        files: ['*.config.js'],
        rules: {
            '@scandipwa/scandipwa-guidelines/use-named-export': 'off',
            '@scandipwa/scandipwa-guidelines/create-config-files': 'off'
        }
    }, {
        files: ['*.plugin.js'],
        rules: {
            '@scandipwa/scandipwa-guidelines/use-named-export': 'off',
            '@scandipwa/scandipwa-guidelines/create-config-files': 'off',
            '@scandipwa/scandipwa-guidelines/use-namespace': 'off',
            '@scandipwa/scandipwa-guidelines/export-level-one': 'off'
        }
    }, {
        files: ['*.ts', '*.tsx'],
        parser: '@typescript-eslint/parser',
        extends: ['plugin:@typescript-eslint/recommended'],
        rules: {
            // Resolve problems with false-positive unused-vars
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars-experimental': 'error',
            // Disable "React" was used... issue see more in:https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined
            '@typescript-eslint/no-use-before-define': 'off',
            // Allow empty functions, i.e. in defaultProps
            '@typescript-eslint/no-empty-function': 'off'
        }
    }],
    rules: {
        // allow only one non-default exports in the file
        'import/prefer-default-export': 'off',
        // disable import extension (.js, index.js)
        'import/extensions': 'off',
        // Allow only files with proper postfix notations
        '@scandipwa/scandipwa-guidelines/file-structure': 'error',
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
        // enforce small files
        'max-lines': ['error', 250],
        'simple-import-sort/sort': [
            'error',
            // fixed by reporting in https://github.com/lydell/eslint-plugin-simple-import-sort/issues/54
            {
                groups: [
                    [
                        '^@?[a-z]'
                    ], // anything that starts with @ and lowercase
                    [
                        '^[^.\\u0000]'
                    ], // anything but a dot and side effect imports
                    [
                        '^\\.'
                    ], // starting with dot
                    [
                        '^\\u0000'
                    ] // side effect imports
                ]
            }
        ],
        'sort-imports': 'off',
        'import/order': 'off',
        'import/no-cycle': [
            'error',
            {
                maxDepth: 4
            }
        ],
        'fp/no-let': 'warn',
        'fp/no-arguments': 'error',
        // "fp/no-loops": "error",
        'fp/no-delete': 'error',
        'no-var': 'error',
        'css-rcurlyexpected': 0,
        'react/static-property-placement': [
            'error',
            'static public field'
        ],
        // Force boolean prop naming with isXX
        'react/boolean-prop-naming': ['error', { rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
        'react/state-in-constructor': 'off',
        'no-restricted-globals': [
            'error',
            'isFinite',
            'isNaN'
        ],
        'max-len': [
            2,
            {
                ignoreComments: true,
                ignoreUrls: true,
                code: 120
            }
        ],
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
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
                ignoreRestSiblings: false,
                argsIgnorePattern: '^_'
            }
        ],
        'react/react-in-jsx-scope': 0,
        'react/jsx-curly-spacing': [
            2,
            {
                when: 'always',
                allowMultiline: false,
                children: true
            }
        ],
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
        // "react/jsx-max-depth": [2, { "max": 2 }],
        'react/jsx-no-useless-fragment': [
            2,
            {
                max: 2
            }
        ],
        curly: [
            2,
            'all'
        ],
        'brace-style': [
            2,
            '1tbs',
            {
                allowSingleLine: false
            }
        ],
        'react/sort-comp': [
            2,
            {
                order: [
                    'type-annotations',
                    'static-variables',
                    'static-methods',
                    'instance-variables',
                    'lifecycle',
                    'everything-else',
                    'render'
                ]
            }
        ],
        'react/jsx-filename-extension': 0,
        'react/prefer-stateless-function': 0,
        'react/button-has-type': 0,
        'react/jsx-indent': 0,
        'react/jsx-indent-props': 2,
        'react/jsx-no-bind': [
            2,
            {
                ignoreDOMComponents: false,
                ignoreRefs: true,
                allowArrowFunctions: false,
                allowFunctions: false,
                allowBind: false
            }
        ],
        // // Prevent people from using className (prefer block, elem,)
        // 'react/forbid-prop-types': [
        //     2,
        //     {
        //         forbid: [
        //             'className'
        //         ]
        //     }
        // ],
        // 'react/forbid-component-props': [
        //     2,
        //     {
        //         forbid: [
        //             'className'
        //         ]
        //     }
        // ],
        // 'react/forbid-dom-props': [
        //     2,
        //     {
        //         forbid: [
        //             'className'
        //         ]
        //     }
        // ],
        'react/no-deprecated': 2,
        'babel/semi': 1,
        'new-cap': [
            'error',
            {
                newIsCap: true
            }
        ],
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'acc',
                    'sum'
                ]
            }
        ],
        'no-magic-numbers': [
            'error',
            {
                ignore: [
                    1,
                    0,
                    2,
                    -1
                ]
            }
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
                    'JSXSpreadChild'
                ]
            }
        ],
        'comma-dangle': [
            'error',
            'never'
        ],
        'no-case-declarations': 'off',
        'jsx-a11y/label-has-for': 0,
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: [
                    'const',
                    'let',
                    'var'
                ],
                next: '*'
            },
            {
                blankLine: 'any',
                prev: [
                    'const',
                    'let',
                    'var'
                ],
                next: [
                    'const',
                    'let',
                    'var'
                ]
            },
            {
                blankLine: 'always',
                prev: [
                    'block',
                    'block-like',
                    'multiline-block-like',
                    'multiline-expression',
                    'multiline-const',
                    'multiline-let',
                    'multiline-var'
                ],
                next: 'return'
            },
            {
                blankLine: 'any',
                prev: [
                    'singleline-const',
                    'singleline-let',
                    'singleline-var'
                ],
                next: '*'
            }
        ],
        'prefer-destructuring': [
            'error',
            {
                array: false,
                object: true
            },
            {
                enforceForRenamedProperties: false
            }
        ],
        'lines-between-class-members': [
            'error',
            'always'
        ],
        'no-extra-semi': 'error'
    }
};
