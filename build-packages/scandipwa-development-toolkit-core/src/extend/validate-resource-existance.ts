import * as fs from 'fs';
import { ILogger, ResourceType } from '../types';

import { capitalize } from "../util/misc";

/**
 * Returns true if everything is OK
 * And false if the process must be halted
 */
const validateResourceExistance = (
    sourceResource: string,
    sourceModule: string,
    targetModule: string,
    resourceType: ResourceType,
    resourceName: string,
    logger: ILogger
): boolean => {
    // Everything is OK
    if (sourceModule !== targetModule) {
        return true;
    }
    
    // Handle resource falling back to the invoker directory
    const resourceIdentifier = [capitalize(resourceType), resourceName].join('/');

    // Exists in the directory => is already created
    // Here sourceResource === targetResource
    if (fs.existsSync(sourceResource)) {
        logger.error(
            `Resource ${logger.style.file(resourceIdentifier)} has already been created!`,
        );
    // Doesn't exist in the directory => doesn't exist at all
    } else {
        logger.error(
            `Resource ${logger.style.file(resourceIdentifier)} does not exist.`,
            `Run the following command to create it: ${logger.style.command(`scandipwa create ${resourceType} ${capitalize(resourceName)}`)}`
        );
    }

    // Must interrupt
    return false;
}

export default validateResourceExistance;