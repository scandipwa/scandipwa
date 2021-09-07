const path = require('path');
const fs = require('fs');
const glob = require('glob');

const createFilesystem = require('@tilework/mosaic-dev-utils/create-filesystem');

const createMockPages = (pages, projectRoot) => createFilesystem(
    path.join(projectRoot, 'pages'),
    path.join(__dirname, 'template'),
    (
        filesystem,
        templatePath,
        destinationPath
    ) => {
        // clear pages directory
        glob.sync('pages/**/*.js', {
            cwd: projectRoot,
            absolute: true
        }).forEach(
            (file) => fs.unlinkSync(file)
        );

        // regenerate it using the template
        Object.entries(pages).forEach(([page, type]) => {
            const namespaces = {
                namespace: `Pages/${page}/Page`,
                static_namespace: `Pages/${page}/getStaticProps`,
                server_namespace: `Pages/${page}/getServerSideProps`
            };

            filesystem.copyTpl(
                templatePath(`${type}.js`),
                destinationPath(`${page}.js`),
                {
                    emptyPageArgs: JSON.stringify({
                        type,
                        page,
                        namespaces
                    }),
                    ...namespaces
                }
            );
        });
    }
);

module.exports = createMockPages;