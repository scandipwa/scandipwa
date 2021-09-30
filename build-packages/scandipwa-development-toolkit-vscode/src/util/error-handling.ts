import * as vscode from 'vscode';

/**
 * This catches all the potential errors that are uncaught by callback
 * And notifies the user about it without extra information like trace
 * 
 * @param {function} callback
 */
export const handlePossibleError = (callback: Function | Promise<Function>) => async () => {
    try {
        await (await callback)()
    } catch (error) {
        vscode.window.showErrorMessage(error.message);

        console.error(error);
    }
}