import * as path from 'path';
import * as fs from 'fs-extra';

import { ILogger, IUserInteraction, StylesOption } from "../types";
import { createNewFileFromTemplate } from '../util/file';

// Initial paths' calculation
const templateDirectory = path.join(__dirname, '..', 'templates');
const templatePath = path.join(templateDirectory, 'stylesheet.scss');

export const getStyleFileName = (
    resourceName: string, 
    stylesOption: StylesOption
) => {
    if (stylesOption === StylesOption.extend) {
        return `${resourceName}.override.style.scss`;
    }

    return `${resourceName}.style.scss`;
};

/**
 * Create style file from template
 */
export const createStyleFile = (
    resourceName: string,
    targetResourceDirectory: string,
    stylesOption: StylesOption,
    logger: ILogger
): string => {
    // Calculate target file name and path
    const styleFileName = getStyleFileName(resourceName, stylesOption);
    const targetPath = path.join(targetResourceDirectory, styleFileName);

    // Ensure parent directory
    fs.ensureDirSync(path.dirname(targetPath));

    // Create the file
    createNewFileFromTemplate(
        templatePath, 
        targetPath, 
        [{
            pattern: /Placeholder/g,
            replacement: resourceName
        }], 
        logger
    );

    return targetPath;
};

export const selectStylesOption = (userInteraction: IUserInteraction) => userInteraction.singleSelect(
    'What would you like to do with styles?',
    [{
        displayName: 'Keep',
        value: StylesOption.keep
    },
    {
        displayName: 'Extend',
        value: StylesOption.extend
    },
    {
        displayName: 'Override',
        value: StylesOption.override
    }]
);
