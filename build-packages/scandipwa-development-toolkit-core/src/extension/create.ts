const isValidPackageName = require('@scandipwa/scandipwa-dev-utils/validate-package-name');
const generateExtension = require('@scandipwa/csa-generator-extension');
const installDeps = require('@scandipwa/scandipwa-dev-utils/install-deps');
const { 
    walkDirectoryUp, 
    contextTypes: { 
        THEME_TYPE
    } 
} = require('@tilework/mosaic-dev-utils/get-context');

import injectScripts from './lib/inject-scripts';
import addDependency from './lib/add-dependency';
import enableExtension from './lib/enable-extension';

import * as path from 'path';
import { ILogger } from "../types";

const createExtension = async (
    packageName: string,
    enable = true,
    targetModule = process.cwd(),
    logger: ILogger
): Promise<string | null> => {
    const { 
        type: context, 
        pathname: contextPathname 
    } = walkDirectoryUp(targetModule, THEME_TYPE);

    if (!context) {
        // make sure we are in ScandiPWA theme context
        logger.error(
            'To create an extension you must be located in ScandiPWA theme directory.',
            `We looked up six folders up starting from ${ logger.style.file(process.cwd()) }!`,
            `There was no folders containing ${ logger.style.file('package.json') }, where ${ logger.style.misc('scandipwa.type') } field was equal to ${ logger.style.misc('theme') }.`
        );

        return null;
    }

    if (!isValidPackageName(packageName)) {
        // validate extension package name
        return null;
    }

    const relativePackagePath = path.join('packages', packageName);
    const packagePath = path.join(contextPathname, relativePackagePath);

    try {
        await generateExtension({
            name: packageName,
            path: packagePath
        });
    } catch (e) {
        logger.log(e);

        logger.error(
            `Failed to create ScandiPWA extension in ${ logger.style.file(packagePath) }.`,
            'See the error log above.'
        );

        return null;
    }

    try {
        // add package as dependency and install sub-dependencies
        await injectScripts(contextPathname);
        await addDependency(contextPathname, packageName, `file:${ relativePackagePath }`);
        await installDeps(contextPathname);
    } catch (e) {
        logger.log(e);

        logger.error(
            `Failed to install ScandiPWA extension in ${ logger.style.file(contextPathname) }.`,
            'See the error log above.'
        );

        return null;
    }

    if (enable) {
        enableExtension(contextPathname, packageName);
    }

    logger.note(
        `Package ${logger.style.misc(packageName)} has been created successfully!`,
        `See it at ${logger.style.file(relativePackagePath)}`
    );
    
    return relativePackagePath;
};

export default createExtension;