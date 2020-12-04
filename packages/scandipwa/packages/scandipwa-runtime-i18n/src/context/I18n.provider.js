/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one, react/no-unused-state */
import PropTypes from 'prop-types';
import React, { createContext } from 'react';

import loadLocalization from '../util/loadLocalization';

const {
    scandipwa: { locales: localeList }
} = require('../../package.json');

const defaultLocalization = require('../../../../i18n/en_US.json');

export const I18nContext = createContext();

class I18nProvider extends React.PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired
    };

    state = {
        // These will remain unchanged, they are kept here for performance purposes
        localeList,
        setLocale: this.setLocale.bind(this),

        // These will get changed on language change
        locale: 'en_US',
        currentLocalization: defaultLocalization
    };

    cache = {};

    componentDidMount() {
        window.setLocale = this.state.setLocale;
    }

    componentDidUpdate(_, prevState) {
        const { locale: currentLocale } = this.state;
        // If locale is unchanged - keep everything as-is
        if (prevState.locale === currentLocale) {
            return;
        }

        // Else update the loaded localization
        this.updateLocalization();
    }

    setLocale(locale) {
        this.setState({ locale });
    }

    getLocalizationFromCache() {
        const { locale } = this.state;
        const { [locale]: localization } = this.cache;

        return localization;
    }

    async updateLocalization() {
        const { locale } = this.state;

        // First of all, try to load from cache
        const cachedLocalization = this.getLocalizationFromCache();
        if (cachedLocalization) {
            this.setState({ currentLocalization: cachedLocalization });
            return;
        }

        // If no such locale in the cache => import from file
        const loadedLocalization = await loadLocalization(locale);

        // Save the freshly imported localization to the cache
        this.cache[locale] = loadedLocalization;

        // Update the provider: set the localization
        this.setState({ currentLocalization: loadedLocalization });
    }

    render() {
        const { children } = this.props;

        return (
            <I18nContext.Provider value={ this.state }>
                { children }
            </I18nContext.Provider>
        );
    }
}

export default I18nProvider;
