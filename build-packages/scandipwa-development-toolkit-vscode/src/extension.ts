import * as vscode from 'vscode';
import {
	ResourceType
} from '@scandipwa/scandipwa-development-toolkit-core';

import ContextManager from './util/managers/context';
import { creator } from './commands/create';
import { extender } from './commands/extend';

import extensionCreator from './commands/extension/create';

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
}

export function deactivate() {}
