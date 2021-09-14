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

export class TranslatedValue extends String {
    // Translate and inject values during the initialization
    constructor(value, args = []) {
        super(getTranslatedStringWithInjectedValues(value, args));

        this.value = value;
        this.injectables = args;
    }

    // Reload the translation each time toString() is  called
    toString() {
        return getTranslatedStringWithInjectedValues(this.value, this.injectables);
    }
}

export default function __(string, ...values) {
    return new TranslatedValue(string, values);
}
