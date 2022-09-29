module.exports = {
    extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:array-func/recommended'
    ],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
    },
    ignorePatterns: [
        'package.json',
        'tsconfig.json',
        '*.js'
    ],
    env: {
        browser: true
    },
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
        React: true
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
        '@scandipwa/scandipwa-guidelines'
    ],
    overrides: [
        {
            files: [
                '*.config.js',
                '*.config.ts',
                'src/config/**'
            ],
            rules: {
                '@scandipwa/scandipwa-guidelines/only-one-class': 'off',
                '@scandipwa/scandipwa-guidelines/derived-class-names': 'off',
                '@scandipwa/scandipwa-guidelines/use-namespace': 'off',
                '@scandipwa/scandipwa-guidelines/export-level-one': 'off',
                '@scandipwa/scandipwa-guidelines/use-named-export': 'off',
                '@scandipwa/scandipwa-guidelines/create-config-files': 'off',
                'import/prefer-default-export': 'off'
            }
        },
        {
            files: [
                '*.reducer.ts'
            ],
            rules: {
                '@typescript-eslint/default-param-last': 'off'
            }
        }
    ],
    rules: {
        '@typescript-eslint/default-param-last': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/space-before-blocks': 'off',
        '@scandipwa/scandipwa-guidelines/no-jsx-variables': 'off',
        '@scandipwa/scandipwa-guidelines/jsx-no-conditional': 'off',
        '@scandipwa/scandipwa-guidelines/jsx-no-props-destruction': 'error',
        'import/no-extraneous-dependencies': 'off',
        '@scandipwa/scandipwa-guidelines/file-structure': 'error',
        '@scandipwa/scandipwa-guidelines/forbid-prop-types-in-shape': 'error',
        '@scandipwa/scandipwa-guidelines/no-arrow-functions-in-class': 'error',
        '@scandipwa/scandipwa-guidelines/only-one-class': 'error',
        '@scandipwa/scandipwa-guidelines/derived-class-names': 'off',
        '@scandipwa/scandipwa-guidelines/no-middleware': 'error',
        '@scandipwa/scandipwa-guidelines/only-render-in-component': 'off',
        '@scandipwa/scandipwa-guidelines/use-namespace': 'error',
        '@scandipwa/scandipwa-guidelines/use-magic-construct': 'error',
        '@scandipwa/scandipwa-guidelines/export-level-one': 'error',
        '@scandipwa/scandipwa-guidelines/no-extensible-base': 'error',
        '@scandipwa/scandipwa-guidelines/always-both-mappings': 'error',
        '@scandipwa/scandipwa-guidelines/use-named-export': 'error',
        '@scandipwa/scandipwa-guidelines/create-config-files': 'error',
        '@scandipwa/scandipwa-guidelines/no-duplicate-namespaces': 'error',
        '@scandipwa/scandipwa-guidelines/use-license': 'error',
        'react/no-unknown-property': 'off',
        '@typescript-eslint/no-unused-vars-experimental': 'off',
        '@typescript-eslint/no-implied-eval': 'off',
        'simple-import-sort/sort': [
            'error',
            {
                groups: [
                    [
                        '(?!.*\\.style)^\\u0000'
                    ],
                    [
                        '^@?[a-z]'
                    ],
                    [
                        '^[^.]'
                    ],
                    [
                        '^\\..+(?!\\.style)'
                    ],
                    [
                        '.+\\.style'
                    ]
                ]
            }
        ],
        'arrow-parens': [
            'error',
            'always'
        ],
        'sort-imports': 'off',
        'import/order': 'off',
        'import/no-cycle': [
            'error',
            {
                maxDepth: 4
            }
        ],
        'fp/no-let': 'error',
        'fp/no-arguments': 'error',
        'fp/no-loops': 'error',
        'fp/no-delete': 'error',
        'no-var': 'error',
        'css-rcurlyexpected': 0,
        'react/static-property-placement': [
            'error',
            'static public field'
        ],
        'react/jsx-props-no-spreading': 'off',
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
                ignorePattern: 'd="([\\s\\S]*?)"',
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
                    '__construct',
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
        'react/forbid-elements': [
            1,
            {
                forbid: [
                    {
                        element: 'a',
                        message: 'Use the <Link> component instead of <a>.'
                    }
                ]
            }
        ],
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
        'react/forbid-prop-types': [
            2,
            {
                forbid: [
                    'className',
                    'any',
                    'object',
                    'array'
                ]
            }
        ],
        'react/forbid-component-props': [
            2,
            {
                forbid: [
                    'className',
                    'any'
                ]
            }
        ],
        'react/forbid-dom-props': [
            2,
            {
                forbid: [
                    'className'
                ]
            }
        ],
        'react/no-deprecated': 2,
        'babel/semi': 1,
        'new-cap': [
            'error',
            {
                newIsCap: true,
                newIsCapExceptions: [
                    'middleware'
                ]
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
                    'JSXSpreadChild'
                ]
            }
        ],
        'comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': [
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
                prev: '*',
                next: 'return'
            },
            {
                blankLine: 'always',
                prev: '*',
                next: 'if'
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
        'no-extra-semi': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: [
                    'camelCase',
                    'PascalCase',
                    'snake_case',
                    'UPPER_CASE'
                ],
                leadingUnderscore: 'allow'
            },
            {
                selector: 'method',
                format: null,
                filter: '^__construct$',
                leadingUnderscore: 'allow'
            },
            {
                selector: 'function',
                format: null,
                filter: '^__$',
                leadingUnderscore: 'allow'
            }
        ],
        '@typescript-eslint/member-delimiter-style': [
            'warn',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ]
    }
};
