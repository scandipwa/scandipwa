/* eslint-disable no-continue */
const { getParentThemePaths } = require('@tilework/mosaic-dev-utils/parent-theme');
const extensions = require('@tilework/mosaic-dev-utils/extensions');
const { getMosaicConfig } = require('@tilework/mosaic-dev-utils/mosaic-config');
const logger = require('@tilework/mosaic-dev-utils/logger');

const getDefinedPages = async (rootDir) => {
    const themePaths = getParentThemePaths(rootDir);
    const extensionsPaths = extensions.map(({ packagePath }) => packagePath);

    const validTypes = [
        // https://nextjs.org/docs/basic-features/pages#server-side-rendering
        'server',
        // https://nextjs.org/docs/basic-features/pages#static-generation-without-data
        'static-no-data',
        // https://nextjs.org/docs/basic-features/pages#static-generation-with-data
        'static-with-data'
    ];

    const pages = [
        rootDir,
        ...themePaths,
        ...extensionsPaths
    ].reduce(
        // we only allow pages inside of the src folder!
        (acc, pathname) => {
            const { nextPages = {} } = getMosaicConfig(pathname);

            for (let i = 0; i < Object.entries(nextPages).length; i++) {
                const [page, type] = Object.entries(nextPages)[i];

                if (validTypes.indexOf(type) === -1) {
                    logger.error(
                        `The declared page ${ logger.style.file(page) } type ${ logger.style.code(type) } is invalid.`,
                        'At the moment, we only support:',
                        `    - ${ logger.style.code('static-no-data') } (Static Generation without data, ${ logger.style.link('https://nextjs.org/docs/basic-features/pages#static-generation-without-data') })`,
                        `    - ${ logger.style.code('static-with-data') } (Static Generation with data, ${ logger.style.link('https://nextjs.org/docs/basic-features/pages#static-generation-with-data') })`,
                        `    - ${ logger.style.code('server') } (Server-side Rendering, ${ logger.style.link('https://nextjs.org/docs/basic-features/pages#server-side-rendering') })`
                    );

                    process.exit();
                }

                if (acc[page]) {
                    logger.warn(`The page ${ logger.style.file(page) } has two or more declarations.`);

                    if (acc[page] !== type) {
                        logger.error(
                            'The declared page types do not match. Recieved following types:',
                            `    - ${ type }`,
                            `    - ${ acc[page] }`,
                            `Please define ${ logger.style.misc('one and only one') } type per page.`
                        );

                        process.exit();
                    }

                    continue;
                }

                acc[page] = type;
            }

            return acc;
        },
        {}
    );

    return pages;
};

module.exports = getDefinedPages;
