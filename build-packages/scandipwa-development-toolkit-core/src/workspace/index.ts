import { MosaicConfig, getMosaicConfig } from "@tilework/mosaic-dev-utils/mosaic-config";
import { IUserInteraction } from "../types";
import { WorkspaceConfiguration, WorkspaceFolder } from "vscode";
const { getPackageJson } = require("@scandipwa/scandipwa-dev-utils/package-json");
const path = require('path');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const { getParentThemePaths } = require('@tilework/mosaic-dev-utils/parent-theme');
const { walkDirectoryUp, contextTypes: { THEME_TYPE } } = require('@tilework/mosaic-dev-utils/get-context');
import * as fs from 'fs';

const corePathnames = ['@scandipwa/scandipwa'];

const createFolder = (path: string, name: string) => {
    return {
        path: path,
        name: corePathnames.includes(name) ? 'Core ScandiPWA' : name,
    };
};

const createWorkspace = (userInteraction: IUserInteraction) => {
    try {
        const { type: context, pathname: themePathname } = walkDirectoryUp(process.cwd(), THEME_TYPE) as {
            type: string,
            pathname: string;
        } |
        {
            type: undefined;
            pathname: undefined;
        };

        if (!context) {
            // make sure we are in ScandiPWA theme context
            logger.error(
                'To deploy your code you must be located in ScandiPWA theme directory.',
                `We looked up six folders up starting from ${logger.style.file(process.cwd())}!`,
                `There was no folders containing ${logger.style.file('package.json')}, where ${logger.style.misc('scandipwa.type')} field was equal to ${logger.style.misc('theme')}.`
            );

            process.exit(1);
        }

        const parentThemes: string[] = getParentThemePaths(themePathname);

        const parentThemeFolders = parentThemes.map(parentThemePathname => {
            const { name } = getPackageJson(parentThemePathname, context);
            return createFolder(path.relative(themePathname, parentThemePathname), name);
        });

        const { name } = getPackageJson(themePathname);
        const currentThemePath = path.resolve(process.cwd(), themePathname) || '.';
        const currentThemeWorkspaceFolder = createFolder('.', name);

        const themeFolders = [currentThemeWorkspaceFolder, ...parentThemeFolders];

        const workspace = {
            folders: [
                ...themeFolders
            ]
        };

        fs.writeFileSync(path.join(currentThemePath, `${name}.code-workspace`), JSON.stringify(workspace, null, 4), { encoding: 'utf8' });

    }
    catch (e) {
        logger.note(e);
    }
};

export default createWorkspace;