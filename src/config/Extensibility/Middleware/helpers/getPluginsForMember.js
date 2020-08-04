module.exports = (namespace, targetSpecifier, memberName) => {
    if (targetSpecifier === 'function') {
        return globalThis.plugins?.[namespace]?.[targetSpecifier];
    }

    const { value } = Object.getOwnPropertyDescriptor(
        globalThis.plugins?.[namespace]?.[targetSpecifier] || {},
        memberName
    ) || {};

    return value;
};
