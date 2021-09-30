import { ResourceType } from "@scandipwa/scandipwa-development-toolkit-core";
import { ActionType } from "../../types";
import UI from '../../util/ui';

export const getResourceName = async (
    resourceType: ResourceType | 'extension',
    actionType: ActionType
): Promise<string | null> => {
    const resourceName = await UI.input(`Name of the ${resourceType} to ${actionType}`);

    if (resourceName === '') {
        throw new Error('Resource name cannot be empty');
    }

    return resourceName;
}