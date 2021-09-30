import * as vscode from 'vscode';

const { walkDirectoryUp } = require('@tilework/mosaic-dev-utils/get-context');

import { proposeFromHistory, unshiftUniqueToHistory, removeDeadFsEntries } from '../history';
import { HALT, SKIP } from './keys';
import { isScandipwaModule } from './workspace';

export const selectModuleWithHistory = async (
    message: string, 
    historyKey: string,
    skipOption?: string,
    additionalHistoryEntries?: string[],
    allowedModuleTypes?: string[]
): Promise<string | undefined | null> => {
    removeDeadFsEntries(historyKey);
    const selectedFromHistory = await proposeFromHistory(
        historyKey, 
        message, 
        undefined, 
        skipOption,
        additionalHistoryEntries
    );

    // Handle selection halted
    if (selectedFromHistory === HALT) {
        return null;
    }

    // Handle skip option selected
    if (skipOption && selectedFromHistory === SKIP) {
        return undefined;
    }

    // Handle selected one of previously selected ones
    if (typeof selectedFromHistory === 'string') {
        unshiftUniqueToHistory(historyKey, selectedFromHistory);
        return walkDirectoryUp(selectedFromHistory).pathname;
    }

    // Initialize for non-mac
    const options: vscode.OpenDialogOptions = {
        canSelectFolders: true,
        canSelectFiles: false,
        canSelectMany: false,
        title: message
    };

    // On Mac, open window does not have a title
    if (process.platform === 'darwin') {
        options.openLabel = message;
    }

    // Provide selection with FS
    const selectedDirectories = await vscode.window.showOpenDialog(options);

    // Handle not selecting anything
    if (!selectedDirectories?.length) {
        return undefined;
    }

    // Preserve the selected value
    const targetDirectory = walkDirectoryUp(selectedDirectories[0].fsPath);
    if (allowedModuleTypes && !isScandipwaModule(targetDirectory, allowedModuleTypes)) {
        throw new Error('Selected module\'s type is not allowed for this action!');
    }

    unshiftUniqueToHistory(historyKey, targetDirectory);

    return targetDirectory;
};