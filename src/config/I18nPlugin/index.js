/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ('OSL') v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

const ConstDependency = require('webpack/lib/dependencies/ConstDependency');
const NullFactory = require('webpack/lib/NullFactory');
const path = require('path');
const fs = require('fs');

const sortObject = obj => Object.keys(obj).sort()
    .reduce((result, key) => {
        // eslint-disable-next-line no-param-reassign
        result[key] = obj[key];
        return result;
    }, {});

const appendTranslations = (filename, content, translations) => {
    const initialTranslations = content ? JSON.parse(content) : {};
    const objectToWrite = { ...translations, ...initialTranslations };
    const SPACE_COUNT = 4;

    fs.writeFileSync(
        filename,
        JSON.stringify(sortObject(objectToWrite), null, SPACE_COUNT)
    );
};

const appendTranslationsToFiles = (outputMap) => {
    const dirname = path.join(__dirname, '../../../i18n');

    fs.readdir(dirname, (err, filenames) => {
        if (err) {
            console.log(err);
            return;
        }

        // eslint-disable-next-line no-param-reassign
        filenames = filenames.filter(name => /\.json$/.test(name));

        if (filenames.length === 0) {
            filenames.push('en_US.json');
            fs.writeFileSync(path.join(dirname, 'en_US.json'), '{}');
        }

        filenames.forEach((filename) => {
            const pathToFile = path.join(dirname, filename);
            fs.readFile(pathToFile, 'utf-8', (err, content) => {
                if (err) {
                    console.log(err);
                    return;
                }

                appendTranslations(pathToFile, content, outputMap);
            });
        });
    });
};

const addParsedVariableToModule = (parser, name) => {
    if (!parser.state.current.addVariable) {
        return false;
    }

    const expression = `require('${path.join(
        __dirname,
        '../TranslationFunction'
    )}')`;
    const deps = [];

    parser.parse(expression, {
        current: {
            addDependency: (dep) => {
                // eslint-disable-next-line no-param-reassign
                dep.userRequest = name;
                deps.push(dep);
            }
        },
        module: parser.state.module
    });

    parser.state.current.addVariable(name, expression, deps);

    return true;
};

/**
 * @param {object} options object
 * @constructor
 */
class I18nPlugin {
    constructor(options = {}) {
        const {
            functionName: name = '__',
            extractTranslations = false,
            translation
        } = options;

        if (!extractTranslations && !translation) {
            throw new Error(
                'Required param \'translation\' was not passed to options.'
            );
        }

        this.options = {
            name,
            extractTranslations,
            translation
        };
    }

    apply(compiler) {
        const { name, translation, extractTranslations } = this.options;
        const plugin = { name: 'I18nPlugin' };
        const translations = {};

        if (extractTranslations) {
            // Tap to emit in order to save translations JSON
            compiler.hooks.emit.tap(plugin, () => {
                appendTranslationsToFiles(translations);

                return true;
            });
        }

        // Tap to compilation to later hook into parser to catch calls for translation function
        compiler.hooks.compilation.tap(
            plugin,
            (compilation, { normalModuleFactory }) => {
                compilation.dependencyFactories.set(
                    ConstDependency,
                    new NullFactory()
                );
                compilation.dependencyTemplates.set(
                    ConstDependency,
                    new ConstDependency.Template()
                );

                const handler = (parser) => {
                    parser.hooks.call.for(name).tap(plugin, (expr) => {
                        const firstArgument = expr.arguments[0];
                        const param = parser.evaluateExpression(firstArgument);
                        const paramString = param.string;

                        // Extract translations, do nothing translation function
                        if (extractTranslations) {
                            translations[paramString] = null;
                            return true;
                        }

                        // Replace translation strings
                        const result = translation[paramString];

                        if (!addParsedVariableToModule(parser, name)) {
                            return false;
                        }

                        if (result) {
                            const dep = new ConstDependency(
                                JSON.stringify(result),
                                firstArgument.range
                            );

                            dep.loc = firstArgument.loc;
                            parser.state.current.addDependency(dep);
                            return true;
                        }

                        // console.log(`No translations generated for string: '${paramString}' \n`);

                        return false;
                    });
                };

                normalModuleFactory.hooks.parser
                    .for('javascript/auto')
                    .tap(plugin, handler);

                normalModuleFactory.hooks.parser
                    .for('javascript/dynamic')
                    .tap(plugin, handler);
            }
        );
    }
}

const mapTranslationsToConfig = (langs, config) => {
    const translations = langs.reduce((acc, lang) => {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        acc[lang] = require(path.join(__dirname, `../../../i18n/${lang}.json`));
        return acc;
    }, {});

    return Object.entries(translations).map(config);
};

module.exports = {
    I18nPlugin,
    mapTranslationsToConfig
};
