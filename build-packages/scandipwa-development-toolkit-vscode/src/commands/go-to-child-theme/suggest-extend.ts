import path from 'path';
import { extend, ResourceType } from "@scandipwa/scandipwa-development-toolkit-core";

import logger from '../../util/logger';
import ui from '../../util/ui';

const { walkDirectoryUp } = require('@scandipwa/scandipwa-dev-utils/get-context');

export type ExtendConfig = {
	cwd: string;
	relativePath: string;
	originalPath: string;
};


const getFileType = (pathname: string): ResourceType | null => {
	const possiblePaths = ['route', 'component', 'store', 'query'];
	return possiblePaths.find((pathPiece) => pathname.includes(pathPiece)) as ResourceType;
};

const getResourceName = (pathname: string) => {
    const { name: filename } = path.parse(pathname);
    const [name, postfix = ''] = filename.split('.');

    if (postfix.length < 3) {
        throw new Error('A filename does not follow postfix convention');
    }

    return name;
};

export const suggestExtension = async (extendConfig: ExtendConfig | undefined) => {
	if (!extendConfig) {
		return;
	}

	const { cwd: targetModulePathname, relativePath, originalPath } = extendConfig;
	const resourceType = getFileType(relativePath);

	if (!resourceType) {
		logger.error('Can not override this type of resource.');
		return;
	}

	const { pathname: sourceModulePathname } = walkDirectoryUp(originalPath);
    const resourceName = getResourceName(relativePath);

    await extend(
        resourceType,
        resourceName,
        targetModulePathname,
        logger,
        ui,
        sourceModulePathname,
    );
}
