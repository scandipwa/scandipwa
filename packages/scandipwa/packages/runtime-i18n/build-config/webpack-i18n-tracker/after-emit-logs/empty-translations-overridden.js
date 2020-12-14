/**
 * Notify the user about his "String": null translations being overridden from other translation files
 * @param {object} overriddenTranslations
 */
module.exports = (overriddenTranslations) => {
    const overrides = Object.entries(overriddenTranslations).map(
        (([ translatable, newValue ]) => `  - "${translatable}": "${newValue}"`)
    )

    return {
        type: 'note',
        args: [
            'The following strings have been overridden',
            'from the translation files with less priority,',
            'due to their initial values being null:',
            ...overrides
        ]
    }
};
