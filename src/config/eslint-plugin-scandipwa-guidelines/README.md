# eslint-plugin-scandipwa-guidelines

Eslint plugin for ScandiPWA development

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
npm i eslint --save-dev
```

Next, install `@scandipwa/eslint-plugin-scandipwa-guidelines`:

```bash
npm install @scandipwa/eslint-plugin-scandipwa-guidelines --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@scandipwa/eslint-plugin-scandipwa-guidelines` globally.

## Usage

Add `@scandipwa/scandipwa-guidelines` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@scandipwa/scandipwa-guidelines"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@scandipwa/scandipwa-guidelines/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





