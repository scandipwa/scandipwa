import loadTranslation from "./loadTranslation";

const {
    scandipwa: {
        locales: localeList = ['en_US', 'ru_RU']
    }
} = require("../../package.json");

const DEFAULT_LOCALE = "en_US";

class I18n {
    currentLocale = DEFAULT_LOCALE;
    currentTranslation = {};

    getLocaleList() {
        return localeList;
    }

    getCurrentLocale() {
        return this.currentLocale;
    }

    async setLocale(locale) {
        if (locale === this.currentLocale) {
            return;
        }

        console.log(`Setting ${locale}`);

        this.currentLocale = locale;
        this.currentTranslation = await loadTranslation(locale);

        this.rerenderApplication();
    }

    init(rerenderApplication) {
        window.setLocale = this.setLocale.bind(this);

        if (typeof rerenderApplication !== "function") {
            throw new Error(
                "App component's forceUpdate should be supplied to the i18n init sequence"
            );
        }

        this.rerenderApplication = rerenderApplication;
    }
}

export default new I18n();
