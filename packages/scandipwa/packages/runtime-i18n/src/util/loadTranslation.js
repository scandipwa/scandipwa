import mergeTranslations from './mergeTranslations';
import localeMap from './localeMap';

// Strategy pattern ensures proper chunk splitting
export default async function loadTranslation(locale) {
    // Get the translation fetcher from the locale map
    const loadTranslationFiles = localeMap[locale];
    if (!loadTranslationFiles) {
        throw new Error('Unknown locale!');
    }

    // Import the translations
    const translations = await Promise.all(loadTranslationFiles());

    return mergeTranslations(translations);
}