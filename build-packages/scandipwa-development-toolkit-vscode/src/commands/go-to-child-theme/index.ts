import fs from 'fs';
import * as vscode from 'vscode';
import logger from '../../util/logger';

const { getMosaicConfig } = require('@tilework/mosaic-dev-utils/mosaic-config');

import { getWorkspaceModules, getWorkspaceThemes } from '../../util/cwd/workspace';
import { openFile } from '../../util/file';
import { ExtendConfig, suggestExtension } from './suggest-extend';
import { resolveTargetResourceDirectory } from '@scandipwa/scandipwa-development-toolkit-core/out/extend/resolve';
import { getModuleInformation } from '@scandipwa/scandipwa-development-toolkit-core/out/util/module';
const { walkDirectoryUp } = require('@scandipwa/scandipwa-dev-utils/get-context');

const fileContextCache: { [key: string]: {
	isPWA: boolean;
	childThemePath?: string;
	extendConfig?: ExtendConfig;
} } = {};

const updateFileContextCache = (uri: vscode.Uri, force = false) => {
	if (!force && fileContextCache[uri.fsPath]) {
		return;
		// ^^^ skip update if present (and update is not forced)
	}

	try {
		const workspaceModules = getWorkspaceModules();
		const workspaceThemes = getWorkspaceThemes(workspaceModules);

		// console.log(workspaceThemes);

		if (!workspaceThemes.length) {
			throw new Error('No workspace is a theme');
		}

		const cwd = workspaceThemes[0];
		const { sourceDirectories }: { sourceDirectories: string[] } = getMosaicConfig(cwd);
		const firstMatchedRelativePath = sourceDirectories.map(sourceDirectory => {
			const match = uri.fsPath.match(new RegExp(`[\\\\/](${sourceDirectory}[\\\\/].*)`));

			if (!match) {
				return '';
			}

			return match[1];
		}).filter(Boolean)[0];

		if (!firstMatchedRelativePath) {
			throw new Error('Unable to detect relative path');
		}

		try {
			// I have not idea why this fails for extension... ;/
			const { pathname: sourceModulePath } = walkDirectoryUp(uri.fsPath);

			if (!sourceModulePath) {
				throw new Error('Unable to detect NPM module of the file');
			}

			const {
				name: sourceModuleName,
				type: sourceModuleType
			} = getModuleInformation(sourceModulePath);

			const childThemePath = resolveTargetResourceDirectory(
				firstMatchedRelativePath,
				cwd,
				sourceModuleType,
				sourceModuleName
			);

			if (childThemePath === uri.fsPath) {
				// triggered when overriding file from current theme
				// throw new Error('File has no override yet');
				fileContextCache[uri.fsPath] = {
					isPWA: true
				};

				return;
			}

			if (!fs.existsSync(childThemePath)) {
				throw new Error('Override file does not exist');
			}

			fileContextCache[uri.fsPath] = {
				isPWA: true,
				childThemePath
			};
		} catch (e) {
			fileContextCache[uri.fsPath] = {
				isPWA: true,
				extendConfig: {
					cwd,
					relativePath: firstMatchedRelativePath,
					originalPath: uri.fsPath
				}
			};
		}
	} catch (e) {
		fileContextCache[uri.fsPath] = {
			isPWA: false
		}
	}
};

export const goToChildTheme = async () => {
	const activeEditor = vscode.window.activeTextEditor;

	if (!activeEditor) {
		logger.error('No active editor');
		return;
	}

	updateFileContextCache(activeEditor.document.uri);

	const { fsPath } = activeEditor.document.uri;
	const extendConfig = fileContextCache[fsPath]?.extendConfig;

	if (extendConfig) {
		try {
			await suggestExtension(extendConfig);
			updateFileContextCache(activeEditor.document.uri, true);
		} catch (e) {
			if (e instanceof Error) {
				logger.error(e.message);
			}
		}
	}

	try {
		const childPath = fileContextCache[fsPath]?.childThemePath;
		const isPWA = fileContextCache[fsPath]?.isPWA;

		if (!childPath) {
			if (isPWA) {
				logger.warn('Override can not be created for this file');
			} else {
				logger.warn('File you attempt to override is not coming from ScandiPWA');
			}
			return;
		}

		openFile(childPath);
	} catch (e) {
		logger.error('Can not open override file');
	}
};
