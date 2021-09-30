const { create } = require('@scandipwa/scandipwa-development-toolkit-core');
const { DispatcherType } = require('@scandipwa/scandipwa-development-toolkit-core');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const googleAnalytics = require('@scandipwa/scandipwa-dev-utils/analytics');

const invokeGenerator = require('../../../common/invoke-generator');

const dispatcherTypeMap = {
    no: DispatcherType.NoDispatcher,
    query: DispatcherType.QueryDispatcher,
    regular: DispatcherType.RegularDispatcher
};

const creator = (resourceType) => async ({
    name,
    container = false,
    redux = false,
    dispatcherType,
    targetModule
}) => {
    const isCreatedSuccessfully = await invokeGenerator(
        targetModule,
        (resolvedTargetModule) => create(
            resourceType,
            name,
            {
                containerFeatures: {
                    logic: container,
                    state: redux
                },
                dispatcherType: dispatcherTypeMap[dispatcherType]
            },
            resolvedTargetModule,
            logger
        )
    );

    if (isCreatedSuccessfully) {
        googleAnalytics.trackEvent('cli-creation', name, 0, resourceType);
        googleAnalytics.printAboutAnalytics();
    }
};

module.exports = creator;
