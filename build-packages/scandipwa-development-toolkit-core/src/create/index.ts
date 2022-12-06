import * as path from 'path';

import { ILogger, ResourceParams, ResourceType } from '../types';
import generateFilesFromMap from '../util/generate-files-from-map';
import getFileMap from './file-map';
import postProcess from './post-process';
import validateResourceParams from './validate-resource-params';

export const extensionRoot = path.resolve(__dirname, '..', '..', 'src');

/**
 * Entry: validate input and create files
 */
const create = (
    resourceType: ResourceType,
    resourceName: string,
    resourceParams: ResourceParams,
    targetModulePath: string,
    logger: ILogger,
) => {
    const { isTypescript } = resourceParams;
    // Validate input data
    const validationErrors = validateResourceParams(resourceName, resourceType, resourceParams);

    if (validationErrors.length) {
        throw new Error(validationErrors.map(({ message }) => message).join(';'));
    }

    // Get map of files to create
    const fileMap = getFileMap(resourceType, resourceParams);

    // Create the files
    const generatedFiles = generateFilesFromMap(
        fileMap,
        resourceName,
        resourceType,
        isTypescript,
        targetModulePath,
        logger,
    );

    postProcess(generatedFiles, resourceName);

    return generatedFiles;
};

export default create;
