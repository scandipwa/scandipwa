import * as vscode from 'vscode';

export const onDidSave = () => {
    vscode.window.showWarningMessage(
        'You are saving a file from a node_modules folder. This is not recommended.',
    );
}
