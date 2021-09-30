import * as vscode from 'vscode';

export const openFile = (destFile: string) : void => {
    vscode.workspace.openTextDocument(destFile).then(
        (editor: any) => vscode.window.showTextDocument(editor)
    );
};
