module.exports = (plugin, memberName) => {
    const { implementation } = plugin;

    if (typeof plugin === 'function') {
        return plugin;
    }

    if (typeof implementation === 'function') {
        return implementation;
    }

    throw new Error(
        `No implementation found in plugin definition for member ${memberName}.`
    );
};
