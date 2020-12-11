const logger = require('@scandipwa/scandipwa-dev-utils/logger');

module.exports = (localeMap) => {
    const unusedForLocales = Object
        .entries(localeMap)
        .filter(([, { unused }]) => Object.keys(unused).length)
        .map(
            ([localeCode, { unused }]) => {
                const unusedStrings = Object.keys(unused);

                return `${logger.style.code(localeCode)}: ${logger.style.code(unusedStrings.length)}`;
            }
        )

    return {
        type: 'warn',
        hideForDefaultLocale: true,
        args: [
            'Some translations are unused!',
            "Consider removing them from your theme's i18n files.",
            'See the unused translations below:',
            ...unusedForLocales
        ]
    };
}
