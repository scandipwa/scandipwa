const logger = require('@scandipwa/scandipwa-dev-utils/logger');

module.exports = (localeMap, defaultLocale) => {
    const missingForLocales = Object
        .entries(localeMap)
        .filter(([localeCode, { missing }]) => localeCode !== defaultLocale && missing.length)
        .map(
            ([localeCode, { missing }]) => `${logger.style.code(localeCode)}: ${logger.style.code(missing.length)}`
        )

    return {
        type: 'warn',
        hideForDefaultLocale: true,
        args: [
            'Some translations are missing!',
            'Please update your translation files and restart the compilation.',
            'See the missing translations below:',
            ...missingForLocales
        ]
    };
}
