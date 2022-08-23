import { getMosaicConfig } from '@tilework/mosaic-dev-utils/mosaic-config';
import { getPackageJson } from '@tilework/mosaic-dev-utils/package-json';

import { getAllFilesFromPath } from './all-files';
import { getPackagePath } from './package-path';

let visitedDeps: string[] = [];

export const getAllExtensions = (pathname: string = process.cwd(), _isFirst = true): string[] => {
    if (_isFirst) {
        visitedDeps = [];
    }

    if (visitedDeps.indexOf(pathname) !== -1) {
        return [];
    }

    visitedDeps.push(pathname);

    try {
        const packageJson = getPackageJson(pathname);
        const { dependencies = {} } = packageJson;
        const { extensions = {} } = getMosaicConfig(pathname);
        const extensionFolders = Object.keys(extensions).map(
            (packageName) => getPackagePath(packageName)
        );

        return Array.from(
            Object.keys(dependencies).reduce(
                (acc, packageName: string) => {
                    const packagePath = getPackagePath(packageName);
                    const childExtensions = getAllExtensions(packagePath, false);
                    childExtensions.forEach((ext) => acc.add(ext));
                    return acc;
                },
                new Set(extensionFolders)
            )
        );
    } catch (e) {
        return [];
    }
};

export const getAllExtensionsFiles = (sourcePath: string): string[] => {
    const extensions = getAllExtensions(sourcePath);

    return extensions.reduce((acc, extension) => ([
        ...acc,
        ...getAllFilesFromPath(extension)
    ]), [] as string[]);
};
