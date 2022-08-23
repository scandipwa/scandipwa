import { getParentTheme } from '@tilework/mosaic-dev-utils/parent-theme';

import { getAllFilesFromPath } from './all-files';
import { getPackagePath } from './package-path';

export const getParentThemes = (pathname: string = process.cwd(), rootTheme: string = pathname): string[] => {
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
