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

    // Magento will handle the theme
    process.env.WDS_SOCKET_PORT = 3000;
    process.env.WDS_SOCKET_HOST = 'localhost';
    process.env.BROWSER = 'none';

    const { name: themeName } = require(path.join(process.cwd(), 'composer.json'));
    process.env.PUBLIC_URL = `/static/version${ Date.now() }/frontend/${ themeName }/${ process.env.PWA_LOCALE || 'en_US' }/Magento_Theme/`;
};
