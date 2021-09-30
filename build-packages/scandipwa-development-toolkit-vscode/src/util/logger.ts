import { 
	ILogger
} from '@scandipwa/scandipwa-development-toolkit-core';

import * as vscode from 'vscode';

class Logger implements ILogger {
    warn(...messages: string[]) {
        vscode.window.showWarningMessage(messages.join('\n'));
    }
    
    error(...messages: string[]) {
        vscode.window.showErrorMessage(messages.join('\n'));
    }

    log(...messages: string[]) {
        vscode.window.showInformationMessage(messages.join('\n'));
    }

    note(...messages: string[]) {
        this.log(...messages);
    }

    style = {
        file: (text: string) => text,
        command: (text: string) => text,
        misc: (text: string) => text
    }
}

export default new Logger();