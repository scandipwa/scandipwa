import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export const isScandipwaModule = (
    pathname: string, 
    includeTypes?: string[]
): boolean => {
    const { 
        scandipwa: { 
            type = undefined
        } = {} 
    } = require(path.join(pathname, 'package.json'));

    if (!type) {
        return false;
    }

    if (includeTypes?.length && !includeTypes?.includes(type)) {
        return false;
    }

    return true;
}

const getLocalModulesOfDir = (pathname: string): string[] => {
    const localModules = path.join(pathname, 'packages');

    // Handle no local modules
    if (!fs.existsSync(localModules)) {
        return [];
    }

    const localModulesDirs = fs.readdirSync(localModules).filter(
        (entry) => fs.lstatSync(path.join(localModules, entry)).isDirectory()
    );

    const unscopedModules = localModulesDirs.filter(
        (dirname) => fs.existsSync(path.join(localModules, dirname, 'package.json'))
    );

    const scopes = localModulesDirs.filter((dirname) => !unscopedModules.includes(dirname));

    const scopedModules = scopes.reduce(
        (modules, scope) => {
            const scopePath = path.join(localModules, scope);
            const scopeContents = fs.readdirSync(scopePath);
            const scopeModuleNames = scopeContents.filter(
                dirname => fs.existsSync(path.join(scopePath, dirname, 'package.json'))
            );

            const scopeModuleRelativePaths = scopeModuleNames.map(
                (scopeModuleName) => path.join(scope, scopeModuleName)
            )

            return modules.concat(scopeModuleRelativePaths);
        },
        [] as string[]
    );

    const absolutize = (module: string): string => path.resolve(localModules, module);

    return [
        ...unscopedModules,
        ...scopedModules
    ]
        .map(absolutize)
        .filter((modulePath) => isScandipwaModule(modulePath));
}

const getModulesOfDir = (pathname: string): string[] => {
    const foundModules = getLocalModulesOfDir(pathname);

    // Check if the requested pathname is a module itself
    if (isScandipwaModule(pathname, ['theme', 'extension'])) {
        foundModules.push(pathname);
    }

    return foundModules;
};

export const getWorkspaceModules = (): string[] => {
    const openDirectories = vscode.workspace.workspaceFolders;

    if (!openDirectories) {
        return [];
    }

    return openDirectories.reduce(
        (modules, dir) => modules.concat(getModulesOfDir(dir.uri.fsPath)),
        [] as string[]
    );
}

export const getWorkspaceThemes = (
    workspaceModules: string[] = getWorkspaceModules()
): string[] => {
    const workspaceThemes = workspaceModules.filter(
        (modulePath) => isScandipwaModule(modulePath, ['theme'])
    );

    return workspaceThemes;
}
