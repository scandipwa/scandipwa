const mockTranslations = (format, ...args) => {
    // eslint-disable-next-line fp/no-let
    let i = 0;
    return format.replace(/%s/g, () => args[i++]);
};

module.exports = mockTranslations;
