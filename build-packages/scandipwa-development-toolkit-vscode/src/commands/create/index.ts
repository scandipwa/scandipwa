import { create, ResourceType } from '@scandipwa/scandipwa-development-toolkit-core';

import { getTargetModule } from '../../options/module-selection';
import { ActionType } from '../../types';
import { getWorkspaceModules } from '../../util/cwd/workspace';
import { handlePossibleError } from '../../util/error-handling';
import { openFile } from '../../util/file';
import logger from '../../util/logger';
import { getResourceParams } from './options';

export const creator = (resourceType: ResourceType) => handlePossibleError(async () => {
    const resourceParams = await getResourceParams(resourceType, ActionType.Create);

    if (resourceParams === null) {
        return;
    }

    const targetModule = await getTargetModule(ActionType.Create, getWorkspaceModules());

    if (targetModule === null) {
        return;
    }

    const createdFiles = await create(
        resourceType,
        resourceParams.resourceName,
        resourceParams,
        targetModule!,
        logger,
    );

    if (createdFiles.length) {
        openFile(createdFiles[0]);
    }
});
