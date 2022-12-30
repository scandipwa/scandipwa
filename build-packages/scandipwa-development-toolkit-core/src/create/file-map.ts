import {
    ComponentResourceParams,
    ContainerFeatures,
    DispatcherType,
    FileMap,
    QueryResourceParams,
    ResourceParams,
    ResourceType,
    StoreResourceParams,
} from '../types';

/**
 * Generate a container template name from the supplied container features
 */
const getContainerTemplateName = (containerFeatures: ContainerFeatures, isTypescript: boolean) => {
    const featuresEntries = Object.entries(containerFeatures);

    const enabledFeatures = featuresEntries.filter(
        ([, enabled]) => enabled,
    );

    // No container options -> no container
    if (!enabledFeatures.length) {
        return null;
    }

    const enabledNames = enabledFeatures.map(
        ([featureName]) => featureName,
    );

    return ['container', ...enabledNames.sort()].join('-').concat(isTypescript ? '.tsx' : '.js');
};

const getTypeTemplateName = (containerFeatures: ContainerFeatures) => {
    const featuresEntries = Object.entries(containerFeatures);

    const enabledFeatures = featuresEntries.filter(
        ([, enabled]) => enabled,
    );

    if (!enabledFeatures.length) {
        return 'type.ts';
    }

    const enabledNames = enabledFeatures.map(
        ([featureName]) => featureName,
    );

    return ['type', ...enabledNames.sort()].join('-').concat('.ts');
};

const hasContainerFeatures = (containerFeatures: ContainerFeatures) => Object.values(containerFeatures).filter(Boolean).length;

/**
 * Map for Components/Routes
 */
const getComponentMap = ({
    containerFeatures,
    isTypescript,
}: ComponentResourceParams) => {
    const fileExtensionType = isTypescript ? 'ts' : 'js';
    const fileExtensionTypeJSX = isTypescript ? 'tsx' : 'js';

    const componentMap = {
        [`component.${fileExtensionTypeJSX}`]: `component.${fileExtensionTypeJSX}`,
        'style.scss': 'stylesheet.scss',
        [`index.${fileExtensionType}`]: hasContainerFeatures(containerFeatures) ? `index-container.${fileExtensionType}` : `index.${fileExtensionType}`,
        [`container.${fileExtensionTypeJSX}`]: getContainerTemplateName(containerFeatures, isTypescript),
    };

    if (isTypescript) {
        componentMap['type.ts'] = getTypeTemplateName(containerFeatures);
    }

    return componentMap;
};

/**
 * Map for Store
 */
const getStoreMap = ({
    dispatcherType = DispatcherType.NoDispatcher,
    isTypescript,
}: StoreResourceParams) => {
    const fileExtensionType = isTypescript ? 'ts' : 'js';

    const storeMap = {
        [`action.${fileExtensionType}`]: `action.${fileExtensionType}`,
        [`dispatcher.${fileExtensionType}`]: dispatcherType === DispatcherType.NoDispatcher ? null : `${dispatcherType}.${fileExtensionType}`,
        [`reducer.${fileExtensionType}`]: `reducer.${fileExtensionType}`,
    };

    if (isTypescript) {
        storeMap['type.ts'] = 'type.ts';
    }

    return storeMap;
};

/**
 * Map for Query
 */
const getQueryMap = ({ isTypescript }: QueryResourceParams) => {
    const fileExtensionType = isTypescript ? 'ts' : 'js';

    return {
        [`query.${fileExtensionType}`]: `query.${fileExtensionType}`,
    };
};

const mapMap: Record<ResourceType, (params: any) => FileMap> = {
    [ResourceType.Component]: getComponentMap,
    [ResourceType.Route]: getComponentMap,
    [ResourceType.Store]: getStoreMap,
    [ResourceType.Query]: getQueryMap,
};

/**
 * Map of templates to use
 */
const getFileMap = (
    resourceType: ResourceType,
    resourceParams: ResourceParams,
) => mapMap[resourceType](resourceParams);

export default getFileMap;
