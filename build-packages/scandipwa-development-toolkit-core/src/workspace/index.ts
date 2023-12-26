import { IUserInteraction } from '../types';
const { getPackageJson } = require('@scandipwa/scandipwa-dev-utils/package-json');
const path = require('path');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const { getParentThemePaths } = require('@tilework/mosaic-dev-utils/parent-theme');
const {
    walkDirectoryUp,
    contextTypes: { THEME_TYPE },
} = require('@tilework/mosaic-dev-utils/get-context');
import * as fs from 'fs';
import { VS_CODE_RECOMMENDATIONS } from './suggestedVSCodeExtensions';
const { getExtensionsForCwd } = require('@tilework/mosaic-dev-utils/extensions-core');

//TODO: Add CPWA after release
const corePathnames = ['@scandipwa/scandipwa'];

type ExtensionType = {
    packageName: string;
    packagePath: string;
};

type FolderType = {
    path: string;
    name?: string;
};

const createFolder = (path: string, name?: string): FolderType => {
    return {
        path,
        // JSON.stringify filters the undefined values
        name: name ? (corePathnames.includes(name) ? 'Core ScandiPWA' : name) : undefined,
    };
};

const createWorkspace = async (userInteraction: IUserInteraction) => {
    try {
        const { type: context, pathname: themePathname } = walkDirectoryUp(process.cwd(), THEME_TYPE) as
            | {
                  type: string;
                  pathname: string;
              }
            | {
                  type: undefined;
                  pathname: undefined;
              };

        if (!context) {
            // make sure we are in ScandiPWA theme context
            logger.error(
                'To create a workspace you must be located in ScandiPWA theme directory.',
                `We looked up six folders up starting from ${logger.style.file(process.cwd())}!`,
                `There was no folders containing ${logger.style.file('package.json')}, where ${logger.style.misc(
                    'scandipwa.type'
                )} field was equal to ${logger.style.misc('theme')}.`
            );

            process.exit(1);
        }

        const parentThemes: string[] = getParentThemePaths(themePathname);

        const parentThemeFolders = parentThemes.map((parentThemePathname) => {
            const { name } = getPackageJson(parentThemePathname, context);
            return createFolder(path.relative(themePathname, parentThemePathname), name);
        });

        const { name } = getPackageJson(themePathname);
        const currentThemePath = path.resolve(process.cwd(), themePathname) || '.';
        const currentThemeWorkspaceFolder = createFolder('.', name);

        const themeFolders = [currentThemeWorkspaceFolder, ...parentThemeFolders];

        // This helper functions gets extensions for parent themes as well
        const allExtensions: ExtensionType[] = getExtensionsForCwd(currentThemePath).reverse();

        const includedExtensions =
            (await userInteraction.multiSelect(
                `Select wanted extensions from theme `,
                allExtensions.map(({ packageName, packagePath }) => ({
                    displayName: packageName,
                    value: packagePath,
                }))
            )) ?? [];

        const extensionsFolders = includedExtensions.map((ext) =>
            createFolder(
                ext,
                ext.includes('node_modules') ? ext.split('/').pop() + ' (NO_EDIT - from node_modules)' : undefined
            )
        );

        const workspace = {
            folders: [...themeFolders, ...extensionsFolders],
            extensions: {
                recommendations: VS_CODE_RECOMMENDATIONS,
            },
        };

        const workspaceFile = path.join(currentThemePath, `${name}.code-workspace`);

        fs.writeFileSync(workspaceFile, JSON.stringify(workspace, null, 4), {
            encoding: 'utf8',
        });

        logger.logN(`Workspace file has been created at ${logger.style.file(workspaceFile)}`);
    } catch (e) {
        logger.error("Something went wrong during creation of workspace file", e);
    }
};

export default createWorkspace;
