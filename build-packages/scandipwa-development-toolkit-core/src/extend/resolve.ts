const FallbackPlugin = require('@tilework/mosaic-webpack-fallback-plugin');
const { walkDirectoryUp } = require('@tilework/mosaic-dev-utils/get-context');

import * as path from 'path';

import { ResourceType, SourceType } from "../types";
import { getRelativeResourceDirectory } from "./fs-interactions";

/**
 * Returns path to a resource's folder
 * Or to the resource file itself, if a query is given
 *
 * @param {*} resourceName string
 * @param {*} resourceType string
 */
export const resolveExtendableResourcePath = (
    resourceName: string, 
    resourceType: ResourceType,
    strictSourceModule?: string,
    cwd?: string
) => {
    const relativeResourceDirectory = getRelativeResourceDirectory(resourceName, resourceType);

    // If source module is specified explicitly -> use it
    if (strictSourceModule) {
        const scandipwaModule = walkDirectoryUp(strictSourceModule).pathname;

        return path.join(scandipwaModule, relativeResourceDirectory);
    }

    // Queries don't have their own directories
    if (resourceType === ResourceType.Query) {
        const queryName = `${resourceName}.query.js`;
        const queryFilePath = path.join(relativeResourceDirectory, queryName);

        return FallbackPlugin.getFallbackPathname(queryFilePath, cwd);
    }

    // If a directory with resource's name exists -> resource exists
    return FallbackPlugin.getFallbackPathname(relativeResourceDirectory, cwd);
};


export const resolveTargetResourceDirectory = (
    relativeResourceDirectory: string,
    targetModulePath: string,
    sourceModuleType: SourceType,
    sourceModuleName: string
) => {
    // Handle specific folder structure for extensions
    // When overriding @scandipwa/paypal/src/component/Paypal
    // Expected path   src/@scandipwa/paypal/component/PayPal
    if (sourceModuleType === SourceType.Extension) {
        const shortenedRelativeResourceDirectory = relativeResourceDirectory.replace(/^(\.\/)?src\/?/, '');

        return path.join(targetModulePath, 'src', sourceModuleName, shortenedRelativeResourceDirectory);
    }

    return path.join(targetModulePath, relativeResourceDirectory);
}
