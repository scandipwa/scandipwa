import * as fs from 'fs';
import * as path from 'path';

import { ResourceType } from "../types";
import extendableDirectoryMap from './extendable-dir-map';

/**
 * Resource = one component/query/store/etc.
 * Resource file = file belonging to it, e.g. for component it'll be:
 * [component, container, style]
 * index.js files are excluded
 */
export const getFileListForResource = (
    extendableType: ResourceType,
    extendableName: string,
    resourceDirectory: string
): Array<string> => {
    if ([ResourceType.Query].includes(extendableType)) {
        return [`${extendableName}.query.js`];
    }

    if ([ResourceType.Component, ResourceType.Route, ResourceType.Store].includes(extendableType)) {
        return fs.readdirSync(resourceDirectory).filter(
            fileName => fileName.match(/\.js$/) && fileName !== 'index.js'
        );
    }

    throw Error('Unexpected extendable type!');
}

/**
 * Builds a path to the directory of extendable files
 */
export const getRelativeResourceDirectory = (
    resourceName: string,
    resourceType: ResourceType
) => {
    const resourceTypeDirectory = extendableDirectoryMap[resourceType];

    // Queries don't have their own dirs in src/query
    if (resourceType === ResourceType.Query) {
        return resourceTypeDirectory;
    }

    // Other resources do have
    return path.join(resourceTypeDirectory, resourceName);
}