const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const path = require('path');
const { isValidComposer } = require('@scandipwa/scandipwa-dev-utils/composer');

module.exports = () => {
    // Always validate composer, if the Magento extension is enabled
    if (!isValidComposer()) {
        process.exit();
    }

    if (process.env.BUILD_MODE !== 'magento') {
        // Skip if the BUILD_MODE is not set to magento
        return;
    }

    logger.note(
        'Building as a Magento theme!',
        `The ${ logger.style.file('public/index.html') } file content will not be taken into account!`,
        `Using content of ${ logger.style.file('public/index.php') } instead!`
    );

    // Run on some port, otherwise Magneto will try to intercept the request
    process.env.WDS_SOCKET_PORT = process.env.WDS_SOCKET_PORT || 3000;
    process.env.WDS_SOCKET_HOST = process.env.WDS_SOCKET_HOST || 'localhost';

    // Do not open browser, as Magento will serve files
    process.env.BROWSER = 'none';

    const { name: themeName } = require(path.join(process.cwd(), 'composer.json'));
    process.env.PUBLIC_URL = `/static/frontend/${ themeName }/en_US/Magento_Theme/`;
};
