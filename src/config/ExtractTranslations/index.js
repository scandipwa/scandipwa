const extractTranslations = (format, ...args) => {
    let i = 0;
    return format.replace(/%s/g, () => args[i++]);
};

module.exports = extractTranslations;
