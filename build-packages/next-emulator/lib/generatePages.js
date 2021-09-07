/* eslint-disable no-magic-numbers, @scandipwa/scandipwa-guidelines/export-level-one */

const getDirFromArgs = require('./args/get-dir-from-args');
const getDefinedPages = require('./pages/defined-pages');
const createMockPages = require('./pages/mock-pages');

const generatePages = async () => {
    const args = process.argv.slice(3);
    const { dir } = getDirFromArgs(args);
    const pages = await getDefinedPages(dir);
    await createMockPages(pages, dir);

    process.env.NEXTJS_PAGES = JSON.stringify(pages);
    process.env.NEXTJS_DIR = dir;
};

module.exports = generatePages;
