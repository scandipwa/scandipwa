import * as fs from 'fs-extra';
import * as path from 'path';

import { FileMap, ILogger, ResourceType } from '../types';
import { createNewFileFromTemplate } from './file';

const getIsNested = (resourceType: ResourceType) => resourceType !== ResourceType.Query;

/**
 * Generate files from the filemap
 * Returns relative paths to the created files
 *
 * @param fileMap
 * @param options
 * @returns {string[]}
 */
const generateFilesFromMap = (
    fileMap: FileMap,
    resourceName: string,
    resourceType: ResourceType,
    isTypescript: boolean,
    targetModulePath: string,
    logger: ILogger,
): string[] => {
    // Calculate the resource path
    const resourceTypeDirectory = path.join(targetModulePath, 'src', resourceType);
    const resourceDirectory = getIsNested(resourceType)
        ? path.join(resourceTypeDirectory, resourceName)
        : resourceTypeDirectory;

    const templateDirectory = path.resolve(__dirname, '..', `templates/${isTypescript ? 'typescript' : 'javascript'}`);

    // Ensure parent direcotory exists for files which'll be generated below
    fs.ensureDirSync(resourceDirectory);

    // Process entry point
    const createdFiles: string[] = Object.entries(fileMap).reduce(
        (createdFiles, [postfix, templateName]) => {
            // Handle skippable entries
            if (!templateName || !postfix) {
                return createdFiles;
            }

            // Calculate the template path
            const templatePath = path.join(templateDirectory, templateName);

            // Index.js is not a postfix, it should be handled differently
            const newFileName = postfix === 'index.js'
                ? 'index.js'
                : `${resourceName}.${postfix}`;

            // Calculate the new file path
            const newFilePath = path.join(resourceDirectory, newFileName);

            // Create a new file
            const createdNewFile = createNewFileFromTemplate(
                templatePath,
                newFilePath,
                [{
                    pattern: /Placeholder/g,
                    replacement: resourceName,
                }, {
                    pattern: /PLACEHOLDER/g,
                    replacement: resourceName.toUpperCase(),
                }],
                logger,
            );

            // Handle file not created
            if (!createdNewFile) {
                return createdFiles;
            }

            // Preserve path to the new file
            return createdFiles.concat(newFilePath);
        },
        [] as string[],
    );

    return createdFiles;
};

export default generateFilesFromMap;
