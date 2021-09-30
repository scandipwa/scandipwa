const path = require('path');
const createFilesystem = require('@scandipwa/scandipwa-dev-utils/create-filesystem');

const fileSystemCreator = (templateOptions) => (
    (
        filesystem,
        templatePath,
        destinationPath
    ) => {
        filesystem.copyTpl(
            templatePath('package.json'),
            destinationPath('package.json'),
            templateOptions
        );

        filesystem.copy(
            templatePath('sample.gitignore'),
            destinationPath('.gitignore')
        );

        filesystem.copy(
            templatePath('src/**/*'),
            destinationPath('src'),
            { globOptions: { dot: true } }
        );
    }
);

const run = async (options) => {
    const {
        name,
        path: pathname
    } = options;

    const templateOptions = {
        name
    };

    // create filesystem from template
    await createFilesystem(
        pathname,
        path.join(__dirname, 'template'),
        fileSystemCreator(templateOptions)
    );
};

module.exports = run;
