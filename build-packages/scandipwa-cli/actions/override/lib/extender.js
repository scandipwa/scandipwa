const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const { extend } = require('@scandipwa/scandipwa-development-toolkit-core');
const googleAnalytics = require('@scandipwa/scandipwa-dev-utils/analytics');

const userInteraction = require('./util/user-interaction');
const invokeGenerator = require('../../../common/invoke-generator');

const extender = (resourceType) => async ({
    name,
    targetModule = process.cwd(),
    sourceModule
}) => {
    const isExtendedSuccessfully = await invokeGenerator(
        targetModule,
        (resolvedTargetModule) => extend(
            resourceType,
            name,
            resolvedTargetModule,
            logger,
            userInteraction,
            sourceModule
        )
    );

    if (isExtendedSuccessfully) {
        googleAnalytics.trackEvent('cli-override', name, 0, resourceType);
        googleAnalytics.printAboutAnalytics();
    }
};

module.exports = extender;
