import * as fs from 'fs-extra';
import * as path from 'path';
import { ILogger, ReplacementInstruction } from '../types';

/**
 * Returns true if override has been prevented
 */
export const preventOverwrite = (dest: string, logger: ILogger): boolean => {
    // Prevent overwriting existing files
    if (fs.existsSync(dest)) {
        logger.warn(
            `File ${logger?.style?.file(dest) || dest} exists and will not be overwritten\n`
        );

        return true;
    }

    return false;
}

export const createNewFileFromTemplate = (
    src: string, 
    dest: string,
    replace: ReplacementInstruction[],
    logger: ILogger
) : boolean => {
    if (!src || !dest) {
        return false;
    }

    // Read the template
    const template = fs.readFileSync(src, 'utf8');

    // Replace all the necessary patterns
    const content = replace.reduce(
        (data, { pattern, replacement }) => data.replace(pattern, replacement), 
        template
    );

    // Handle file already exists
    if (preventOverwrite(dest, logger)) {
        return false;
    }

    // Create the file
    fs.writeFileSync(dest, content);
    return true;
};

/**
 * Create a new file and fill it with given contents
 * @param newFilePath
 * @param contents
 */
export const createNewFileWithContents = (
    newFilePath: string, 
    contents: string,
    logger: ILogger
): boolean => {
    // Make sure parent dir exists
    const parentDirectory = path.dirname(newFilePath);
    fs.ensureDirSync(parentDirectory);

    // Prevent overwrites
    if (preventOverwrite(newFilePath, logger)) {
        return false;
    }

    try {
        // Create the file
        fs.writeFileSync(
            newFilePath,
            contents
        );
    } catch (error) {
        logger.error(error.message);

        return false;
    }

    return true;
};
