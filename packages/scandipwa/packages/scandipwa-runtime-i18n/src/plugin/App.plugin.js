import I18nProvider from '../context/I18n.provider';

const renderContextProviders = (args, callback) => (
    <I18nProvider>
        { callback(...args) }
    </I18nProvider>
);

export default {
    'Component/App/Component': {
        'member-function': {
            renderContextProviders
        }
    }
};
