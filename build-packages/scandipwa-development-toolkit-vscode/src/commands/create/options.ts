import { 
    ComponentResourceParams, 
    ContainerFeatures, 
    DispatcherType, 
    ResourceParams, 
    ResourceType, 
    StoreResourceParams 
} from "@scandipwa/scandipwa-development-toolkit-core";

import UI from '../../util/ui';
import { getResourceName } from '../common/options';
import { ActionType } from '../../types';

const componentParamGetter = async (): Promise<ComponentResourceParams | null> => {
    const containerFeaturesChoice = await UI.multiSelect(
        'Select container features',
        [{
            displayName: 'Contains business logic',
            value: 'logic'
        },{
            displayName: 'Connected to the global state',
            value: 'state'
        }]
    );

    if (containerFeaturesChoice === null) {
        return null;
    }

    const containerFeatures: ContainerFeatures = {
        logic: containerFeaturesChoice.includes('logic'),
        state: containerFeaturesChoice.includes('state')
    }

    const componentResourceParams: ComponentResourceParams = { 
        containerFeatures 
    };

    return componentResourceParams;
}

const storeParamGetter = async (): Promise<StoreResourceParams | null> => {
    const dispatcherType = await UI.singleSelect(
        'Select dispatcher type',
        [{
            displayName: 'No dispatcher',
            value: DispatcherType.NoDispatcher
        }, {
            displayName: 'Regular dispatcher',
            value: DispatcherType.RegularDispatcher
        }, {
            displayName: 'Query dispatcher',
            value: DispatcherType.QueryDispatcher
        }]
    );

    if (dispatcherType === null) {
        return null;
    }

    const storeResourceParams: StoreResourceParams = {
        dispatcherType
    };

    return storeResourceParams;
}

const getterMap: Record<ResourceType, () => ResourceParams | null> = {
    [ResourceType.Component]: componentParamGetter,
    [ResourceType.Route]: componentParamGetter,
    [ResourceType.Store]: storeParamGetter,
    [ResourceType.Query]: () => ({})
}

export const getResourceParams = async (
    resourceType: ResourceType, 
    actionType: ActionType
): Promise<ResourceParams & {resourceName: string} | null> => {
    const resourceName = await getResourceName(resourceType, actionType);
    if (resourceName === null) {
        return null;
    }

    const typeSpecificResourceParams = await getterMap[resourceType]();
    if (typeSpecificResourceParams === null) {
        return null;
    }

    return {
        resourceName,
        ...typeSpecificResourceParams
    };
}
