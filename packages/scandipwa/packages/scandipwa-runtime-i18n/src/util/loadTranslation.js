import mergeTranslations from './mergeTranslations';

/**
 * Entry format:
 * locale: [
 *   child translation,
 *   parent translation,
 *   grandparent translation,
 *   ...
 *   extensions' translations
 * ]
 */
function loadTranslationFiles(locale) {
    switch(locale) {
    case 'en_US':
        return [
            import(/* webpackMode: "lazy", webpackChunkName: "en_US" */'../../../../i18n/en_US.json')
        ]
    case 'ru_RU':
        return [
            import(/* webpackMode: "lazy", webpackChunkName: "ru_RU" */'../../../../i18n/ru_RU.json')
        ]
    case 'lv_LV':
        return [
            import(/* webpackMode: "lazy", webpackChunkName: "lv_LV" */'../../../../i18n/lv_LV.json')
        ]
    case 'fr_FR':
        return [
            import(/* webpackMode: "lazy", webpackChunkName: "fr_FR" */'../../../../i18n/fr_FR.json')
        ]

    default:
        throw new Error('Such locale is not provided!');
    }
}

// Strategy pattern ensures proper chunk splitting
export default async function loadTranslations(locale) {
    // Import the translations
    const translations = await Promise.all(loadTranslationFiles(locale));

    return mergeTranslations(translations);
}