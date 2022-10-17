import * as vscode from 'vscode';

export const onWillSave = (e: vscode.TextDocumentWillSaveEvent) => {
    const { isDirty } = e.document;

    if (!(/node_modules/.test(e.document.fileName))) {
        return;
    }

    if (!isDirty) {
        return;
    }

    vscode.window.showWarningMessage(
        'You are modifying a file from a node_modules folder. This is not recommended.',
    );
};
