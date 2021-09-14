const path = require('path');
const fs = require('fs');
const glob = require('glob');

const { getParentThemePaths } = require('@tilework/mosaic-dev-utils/parent-theme');
const logger = require('@tilework/mosaic-dev-utils/logger');
const extensions = require('@tilework/mosaic-dev-utils/extensions');

const transformImports = require('./transform-import');

const copiedPages = {};

const copyPages = async (rootDir, projectRoot) => {
    const themePaths = getParentThemePaths(rootDir);
    const extensionsPaths = extensions.map(({ packagePath }) => packagePath);
    const possiblePaths = [
        rootDir,
        ...themePaths,
        ...extensionsPaths
    ].map(
        // we only allow pages inside of the src folder!
        (pathname) => path.join(pathname, 'src/pages')
    );

    const pagePaths = await Promise.all(possiblePaths.map(
        (source) => new Promise((resolve, reject) => {
            glob('**/*', {
                cwd: source,
                absolute: true
            }, (err, files) => {
                if (err) {
                    reject(err);
                }

                resolve(files);
            });
        })
    ));

    const pages = pagePaths.reduce(
        (acc, sourcePagePaths) => {
            sourcePagePaths.forEach((sourcePagePath) => {
                const match = sourcePagePath.match(/[/\\]pages[/\\](.*)\.\D{2,3}/);

                if (!match) {
                    return acc;
                }

                const [, pageRoute] = match;

                // ignore invalid paths
                if (!pageRoute) {
                    return acc;
                }

                // default - add the page to the "copied" list
                if (!acc[pageRoute]) {
                    acc[pageRoute] = sourcePagePath;
                    return acc;
                }

                // page gets redefined - warn
                logger.warn(
                    `The page ${ logger.style.file(pageRoute) } has two or more sources:`,
                    `    1) ${ logger.style.file(acc[pageRoute]) }`,
                    `    2) ${ logger.style.file(sourcePagePath) }`,
                    // TODO: remove when Fallback Plugin is added
                    'Using the first implementation.'
                );
            });

            return acc;
        },
        {}
    );

    Object.entries(pages)
        .map(([ key, sourcePath ]) => {
            // we need collect source file and target file for later usages
            const targetPath = path.join(projectRoot, 'pages', `${ key }.js`);
            
            copiedPages[sourcePath] = targetPath;

            return { sourcePath, targetPath };
        })
        .forEach(({ sourcePath, targetPath }) => {
            const sourceCode = fs.readFileSync(sourcePath, 'utf-8');
            const transformedSource = transformImports(
                sourceCode, 
                (importable) => {
                    const resolvePath = importable[0] === '.' 
                        ? path.dirname(sourcePath) 
                        : rootDir;
                        
                    const resolvedPath = require.resolve(importable, { paths: [resolvePath] });

                    return copiedPages[resolvedPath] || resolvedPath;
                }
            );

            fs.writeFileSync(targetPath, transformedSource);
        });
};

module.exports = copyPages;