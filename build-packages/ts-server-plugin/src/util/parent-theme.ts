import { getParentTheme } from '@tilework/mosaic-dev-utils/parent-theme';
import * as fs from 'fs';
import * as path from 'path';

const getPackagePath = (packageName: string, context: string = process.cwd()): string => {
    const possibleRelativePath = path.join(
        process.cwd(),
        packageName,
        'package.json'
    );

    const isPathReference = fs.existsSync(possibleRelativePath);

    if (isPathReference) {
        return path.join(possibleRelativePath, '..');
    }

    // This is not a local package, path based extension -> try loading it as a package
    return path.join(
        require.resolve(`${ packageName }/package.json`, { paths: [context] }),
        '..'
    );
};

const getParentThemes = (pathname: string = process.cwd(), rootTheme: string = pathname): string[] => {
    const parentThemePackage = getParentTheme(pathname);

    if (!parentThemePackage) {
        return [];
    }

    const parentThemePathname = getPackagePath(parentThemePackage, rootTheme);

    return [
        parentThemePathname,
        ...getParentThemes(parentThemePathname, rootTheme)
    ];
};

const getAllFilesFromPath = (pathname: string): string[] => {
    const files = fs.readdirSync(pathname);

    return files.reduce((acc, file) => {
        if (/node_modules/gm.test(file)) {
            // ^^^ ignore node_modules
            return acc;
        }

        const filePath = path.join(pathname, file);

        if (!fs.statSync(filePath).isDirectory()) {
            if (!(/\.[tj]sx?$/gm.test(file))) {
                // ^^^ Ignore non-js files
                return acc;
            }

            return [...acc, filePath];
        }

        return [...acc, ...getAllFilesFromPath(filePath)];
    }, [] as string[]);
};

export const getAllThemeFiles = (sourcePath: string): string[] => {
    const themes = [
        sourcePath,
        ...getParentThemes(sourcePath)
    ];

    return themes.reduce((acc, theme) => ([
        ...acc,
        ...getAllFilesFromPath(theme)
    ]), [] as string[]);
};
