import * as vscode from 'vscode';
import {
	ResourceType
} from '@scandipwa/scandipwa-development-toolkit-core';

import ContextManager from './util/managers/context';
import { creator } from './commands/create';
import { extender } from './commands/extend';

import extensionCreator from './commands/extension/create';
import { goToChildTheme } from './commands/go-to-child-theme';
import { onDidSave } from './commands/warn-in-source';

const commandMap = {
	'extension.createComponent': creator(ResourceType.Component),
	'extension.createRoute': creator(ResourceType.Route),
	'extension.createQuery': creator(ResourceType.Query),
	'extension.createStore': creator(ResourceType.Store),

	'extension.extendComponent': extender(ResourceType.Component),
	'extension.extendRoute': extender(ResourceType.Route),
	'extension.extendQuery': extender(ResourceType.Query),
	'extension.extendStore': extender(ResourceType.Store),

	'extension.extensionCreate': extensionCreator,

	'extension.goToChildTheme': goToChildTheme,
};

export function activate(context: vscode.ExtensionContext) {
	Object.entries(commandMap).forEach(([ name, handler ]) => {
		context.subscriptions.push(
			vscode.commands.registerCommand(
				name,
				() => {
					ContextManager.createInstance(context);

					handler();
				}
			)
		);
	});

	vscode.commands.executeCommand('setContext', 'extension.scandipwaSupportedLangs', [
		'javascript',
		'javascriptreact',
		'typescript',
		'typescriptreact',
		'scss',
		'css'
	]);

	vscode.workspace.onDidSaveTextDocument(onDidSave);
}

export function deactivate() {}
