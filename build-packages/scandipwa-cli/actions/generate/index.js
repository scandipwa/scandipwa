const { createExtension, installExtension, createWorkspace } = require('@scandipwa/scandipwa-development-toolkit-core');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const googleAnalytics = require('@scandipwa/scandipwa-dev-utils/analytics');

module.exports = (yargs) => {
    yargs.command('workspace', 'Create workspace file', createWorkspace);
};
