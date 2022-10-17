const { generateTypeScriptTypes } = require('graphql-schema-typescript');

const options = {};

const schemaPath = process.argv[2];
const outputPath = process.argv[3];

generateTypeScriptTypes(schemaPath, outputPath, options)
    .then(() => {
        console.info('GraphQL types are generated');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
