import i18n from './i18n';

function injectValues(string, ...values) {
    // eslint-disable-next-line fp/no-let
    let i = 0;

    return string.replace(/%s/g, () => values[i++]);
}

function translateString(string) {
    return i18n.currentTranslation[string] || string;
}

function getTranslatedStringWithInjectedValues(string, values) {
    return injectValues(translateString(string), ...values);
}

export default function __(string, ...values) {
    return getTranslatedStringWithInjectedValues(string, values);
}
