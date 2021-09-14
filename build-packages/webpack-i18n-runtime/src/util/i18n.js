import loadTranslation from './loadTranslation';
import localeMap from './localeMap';

class I18n {
    constructor() {
        if (window.defaultLocale) {
            this.setLocale(window.defaultLocale);
        }
    }

    currentTranslation = {};

    getLocaleList() {
        return Object.keys(localeMap);
    }

    getCurrentLocale() {
        return this.currentLocale;
    }

    setLocale = async (locale) => {
        // Ignore same locale
        if (locale === this.currentLocale) {
            return;
        }

        // Set the new locale code
        this.currentLocale = locale;

        // Update the current translation map
        this.isLoading = true;
        this.currentTranslation = await loadTranslation(locale);
        this.isLoading = false;

        // Rerender the app for changes to get applied
        this.rerenderApplication();
    };

    /**
     * This method should be called on app init
     * @param {function} rerenderApplication
     */
    init(rerenderApplication) {
        if (typeof rerenderApplication !== 'function') {
            throw new Error("The root component's forceUpdate should be supplied to the i18n init sequence");
        }

        this.rerenderApplication = rerenderApplication;
    }
}

export default new I18n();
