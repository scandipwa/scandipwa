const logger = require('@scandipwa/scandipwa-dev-utils/logger');

module.exports = (unusedTranslationMap) => {
    const unusedForLocales = Object
        .entries(unusedTranslationMap)
        .map(
            ([localeCode, unused]) => {
                return [
                    `${logger.style.code(localeCode)}: ${logger.style.code(unused.size)}`,
                    ...Array.from(unused, (unusedString) => `  - ${unusedString}`)
                ];
            }
        );

    return {
        type: 'warn',
        args: [
            'Some translations are unused!',
            "Consider removing them from your theme's i18n files.",
            'See the unused translations below.',
            ...unusedForLocales.flat()
        ]
    };
}
