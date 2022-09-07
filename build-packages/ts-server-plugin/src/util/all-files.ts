import * as fs from 'fs';
import * as path from 'path';

export const getAllFilesFromPath = (pathname: string): string[] => {
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
