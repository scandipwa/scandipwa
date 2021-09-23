import * as path from 'path';
import * as fs from 'fs';
import { getIsSemver } from "./semver";
import { getPackageJson } from '@scandipwa/scandipwa-dev-utils/package-json';

/**
 * * Priority:
 * - If semver version is provided - validate and use it
 * - If explicit path is provided - make sure it exists and use it
 * - If "local" flag is set - find the package and use it
 * 
 * * throws an Error on invalid data
 */
const getVersionConstraint = (
    packageName: string,
    packageSemverVersion: string | undefined,
    targetModule: string,
    explicitPath: string | undefined,
    useLocalPackagesDirectory: boolean | undefined
): string | undefined => {
    const generateLinkUri = (relative: string) => `file:${relative}`;

    if ([packageSemverVersion, explicitPath, useLocalPackagesDirectory].filter(Boolean).length > 1) {
        throw new Error(
            'Several of the following have been provided\n' +
            ' - semver version\n' +
            ' - explicit path to the module\n' +
            ' - flag to use the local "packages" directory\n' +
            'Please, stick to one and try again.'
        );
    }

    // If a semver version is provided - use it
    if (packageSemverVersion) {
        if (!getIsSemver(packageSemverVersion)) {
            throw new Error('The provided semver version is not valid!');
        }

        return packageSemverVersion;
    }

    // If an explicit path is provided - use it
    if (explicitPath) {
        const absolutePath = path.resolve(targetModule, explicitPath);
        if (!fs.existsSync(absolutePath)) {
            throw new Error('The provided directory does not exist!');
        }

        const relativePath = path.relative(targetModule, absolutePath);
        return generateLinkUri(relativePath);
    }

    // If should use local package, but the path is not explicitly provided
    // Resolve the necessary path
    if (useLocalPackagesDirectory) {
        const localPackagesDirectory = path.resolve(targetModule, 'packages');
        const expectedPath = path.resolve(localPackagesDirectory, packageName);

        // Handle proper directory structure
        if (fs.existsSync(expectedPath)) {
            return generateLinkUri(expectedPath);
        }

        // Support flat directory structure (without @vendor part)
        // Might be convenient for projects with little amount of modules
        const localPackagesContents = fs.readdirSync(localPackagesDirectory);
        const firstLevelPackage = localPackagesContents.find(
            (directoryName) => getPackageJson(
                path.join(localPackagesDirectory, directoryName)
            ).name === packageName
        );

        if (firstLevelPackage) {
            const absolutePath = path.join(localPackagesDirectory, firstLevelPackage);
            const relativePath = path.relative(targetModule, absolutePath);

            return generateLinkUri(relativePath);
        }

        throw new Error(`Module "${packageName}" has not been found!`);
    }

    return undefined;
};

export default getVersionConstraint;