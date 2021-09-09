/* eslint-disable */
const path = require('path');
const fs = require('fs');

const createMockRoutes = (pages, projectRoot) => {
    const dest = path.join(projectRoot, 'pages', 'routes.js');
    const routes = Object.keys(pages);
    const imports = [];
    const exports = [];

    routes.forEach((page) => {
        const pageId = page.replace(/\W/g, '_');
        imports.push(`import * as ${pageId} from './${page}';`);
        exports.push(pageId);
    });

    const result = [
        '/* eslint-disable */',
        imports.join('\n'),
        `\nexport default {\n    ${exports.join(',\n    ')}\n};\n`
    ].join('\n');

    fs.writeFileSync(dest, result, { encoding: 'utf8' });
};

module.exports = createMockRoutes;
