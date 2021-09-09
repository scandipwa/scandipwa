/* eslint-disable no-magic-numbers, @scandipwa/scandipwa-guidelines/export-level-one */

const path = require('path');

const getDirFromArgs = require('./args/get-dir-from-args');
const getDefinedPages = require('./pages/defined-pages');
const createMockPages = require('./pages/mock-pages');
const createMockRoutes = require('./pages/mock-routes');

const generatePages = async () => {
    const args = process.argv.slice(3);
    const { dir } = getDirFromArgs(args);
    const pages = await getDefinedPages(dir);
    const outputDir = path.join(dir, 'src');

    await createMockPages(pages, outputDir);
    await createMockRoutes(pages, outputDir);

    process.env.NEXTJS_PAGES = JSON.stringify(pages);
};

module.exports = generatePages;
