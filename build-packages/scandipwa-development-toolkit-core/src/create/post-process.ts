import * as fs from 'fs';
import fixESLint from '../util/eslint';

const ensureProperIndex = (generatedFiles: string[], resourceName: string): void => {
    const createdContainer = generatedFiles.find(generatedFile => generatedFile.includes('.container'));
    const createdComponent = generatedFiles.find(generatedFile => generatedFile.includes('.component'));
    const createdIndex = generatedFiles.find(generatedFile => generatedFile.includes('.index'));

    // In case component has existed and container is created, modify the index file
    if (!(createdContainer && !createdComponent && !createdIndex)) {
        return;
    }

    const indexPath = createdContainer.replace(/\/[^/]+$/, '/index.js');
    const index = fs.readFileSync(indexPath, 'utf-8');

    const fixedIndex = index.replace(
        /export *{ *default *} *from.+;/, 
        `export { default } from './${resourceName}.container';`
    );

    fs.writeFileSync(indexPath, fixedIndex);
}

const postProcess = (
    generatedFiles: string[], 
    resourceName: string
) => {
    // Ensure proper export from index file
    ensureProperIndex(generatedFiles, resourceName);

    // Prettify!
    fixESLint(generatedFiles);
}

export default postProcess;