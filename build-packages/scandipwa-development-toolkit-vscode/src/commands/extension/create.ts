import { createExtension } from '@scandipwa/scandipwa-development-toolkit-core';

import { getTargetModule } from '../../options/module-selection';
import { ActionType } from '../../types';
import { getWorkspaceThemes } from '../../util/cwd/workspace';
import logger from '../../util/logger';
import { getResourceName } from '../common/options';

const extensionCreator = async () => {
    const resourceName = await getResourceName('extension', ActionType.Create);
    const targetModule = await getTargetModule(ActionType.Create, getWorkspaceThemes(), ['theme']);

    if (!resourceName) {
        logger.error('A name is required to create an extension');
    }

    if (!targetModule) {
        logger.error('A target module is required to create an extension');
    }

    if (!resourceName || !targetModule) {
        return;
    }

    createExtension(resourceName, true, targetModule, logger);
};

export default extensionCreator;
