import { extend, ResourceType } from "@scandipwa/scandipwa-development-toolkit-core";

import { getSourceModule, getTargetModule } from "../../options/module-selection";
import { ActionType } from "../../types";
import { openFile } from "../../util/file";
import logger from "../../util/logger";
import ui from '../../util/ui';
import { getResourceName } from "../common/options";
import { getWorkspaceThemes, getWorkspaceModules } from '../../util/cwd/workspace';
import { handlePossibleError } from "../../util/error-handling";

export const extender = (resourceType: ResourceType) => handlePossibleError(async () => {
    const resourceName = await getResourceName(resourceType, ActionType.Extend);
    if (resourceName === null) {
        return;
    }

    const workspaceModules = getWorkspaceModules();
    const workspaceThemes = getWorkspaceThemes(workspaceModules);

    const targetModule = await getTargetModule(ActionType.Extend, workspaceThemes, ['theme']);
    if (targetModule === null) {
        return;
    }

    const sourceModule = await getSourceModule(ActionType.Extend, true, workspaceModules);
    if (sourceModule === null) {
        return;
    }

    const createdFiles = await extend(
        resourceType,
        resourceName,
        targetModule as string,
        logger,
        ui,
        sourceModule,
    );

    if (createdFiles.length) {
        openFile(createdFiles[0]);
    }
});