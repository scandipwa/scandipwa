import { 
    ComponentResourceParams, 
    DispatcherType, 
    FileMap, 
    ResourceParams, 
    ResourceType, 
    StoreResourceParams,
    ContainerFeatures
} from "../types";

/**
 * Generate a container template name from the supplied container features
 */
const getContainerTemplateName = (containerFeatures: ContainerFeatures) => {
    const featuresEntries = Object.entries(containerFeatures)

    const enabledFeatures = featuresEntries.filter(
        ([, enabled]) => enabled
    );

    // No container options -> no container
    if (!enabledFeatures.length) {
        return null;
    }

    const enabledNames = enabledFeatures.map(
        ([featureName]) => featureName
    );

    return ['container', ...enabledNames.sort()].join('-').concat('.js');
}

const hasContainerFeatures = (containerFeatures: ContainerFeatures) => {
    return Object.values(containerFeatures).filter(Boolean).length;
}

/**
 * Map for Components/Routes
 */
const getComponentMap = ({ 
    containerFeatures
}: ComponentResourceParams) => ({
    'component.js': 'component.js',
    'style.scss': 'stylesheet.scss',
    'index.js': hasContainerFeatures(containerFeatures) ? 'index-container.js' : 'index.js',
    'container.js': getContainerTemplateName(containerFeatures),
});

/**
 * Map for Store
 */
const getStoreMap = ({ 
    dispatcherType = DispatcherType.NoDispatcher 
}: StoreResourceParams) => ({
    'action.js': 'action.js',
    'dispatcher.js': dispatcherType === DispatcherType.NoDispatcher ? null : `${dispatcherType}.js`,
    'reducer.js': 'reducer.js'
});

/**
 * Map for Query
 */
const getQueryMap = () => ({
    'query.js': 'query.js'
});

const mapMap: Record<ResourceType, (params: any) => FileMap> = {
    [ResourceType.Component]: getComponentMap,
    [ResourceType.Route]: getComponentMap,
    [ResourceType.Store]: getStoreMap,
    [ResourceType.Query]: getQueryMap
};

/**
 * Map of templates to use
 */
const getFileMap = (resourceType: ResourceType, resourceParams: ResourceParams) => mapMap[resourceType](resourceParams);

export default getFileMap;