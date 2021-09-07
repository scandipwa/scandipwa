const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

const parentThemeHelper = require('@tilework/mosaic-dev-utils/parent-theme');
const extensions = require('@tilework/mosaic-dev-utils/extensions');
const getEnabledLocales = require('../../shared/getEnabledLocales');

const childRoot = process.cwd();
const parentRoots = parentThemeHelper.getParentThemePaths(childRoot);
const extensionsRoots = extensions.map((extension) => extension.packagePath);

function getFilePathsForLocale(locale) {
    return [
        childRoot,
        ...parentRoots,
        ...extensionsRoots
    ].reduce(
        (acc, root) => {
            const potentialPath = path.join(root, 'i18n', `${locale}.json`);
            if (fs.existsSync(potentialPath)) {
                return acc.concat(potentialPath);
            }

            return acc;
        },
        []
    );
}

function generateImportDeclaration(pathname, chunkName) {
    const posixPathname = pathname.split(path.sep).join(path.posix.sep);
    return `import(/* webpackMode: "lazy", webpackChunkName: "${chunkName}" */ '${posixPathname}')`;
}

function generateLocaleMapContents(localePathMap, defaultLocale) {
    return Object.entries(localePathMap).reduce(
        (acc, [localeKey, localePaths = []]) => {
            const importsForEntry = localePaths.map(
                (localePath) => generateImportDeclaration(localePath, localeKey)
            );

            const importingFunction = `function() { return [\n${importsForEntry.join(',\n')}\n] }`;
            const throwingFunction = 'function() { throw new Error(\'No translation files found for this locale!\') }';
            const defaultFunction = 'function() { return {} }';

            function getProperFunction() {
                // If there are files with translations - provide them
                if (localePaths.length > 0) {
                    return importingFunction;
                }

                // If default locale requested and files not found - return empty translation
                if (localeKey === defaultLocale) {
                    return defaultFunction;
                }

                // If requested locale's files don't exist - throw error in runtime
                return throwingFunction;
            }

            // Generate an entry in the locale map
            const entry = `"${localeKey}": ${getProperFunction()}`;

            return [entry, acc].filter(Boolean).join(',\n');
        },
        ''
    );
}

module.exports = function injectImports(source) {
    const {
        defaultLocale = 'en_US'
    } = loaderUtils.getOptions(this) || {};

    // Get the active locales from the current theme's package.json
    const locales = Array.from(new Set([
        ...getEnabledLocales(),
        defaultLocale // this should be here, so map is not empty!
    ]));

    // Build a map: langCode => paths[]
    const localePathMap = locales.reduce(
        (acc, cur) => {
            acc[cur] = getFilePathsForLocale(cur);
            return acc;
        },
        {}
    );

    // Build the actual localeMap for the application
    // With import() statements
    const localeMapContents = generateLocaleMapContents(localePathMap, defaultLocale);

    // Inject the locale map contents into the application
    const injectedSource = source.replace('/** INJECT__HOOK */', localeMapContents);

    return injectedSource;
};
