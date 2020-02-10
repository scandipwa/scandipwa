/* eslint-disable func-names */
/**
 * @param {String} namespace
 */
const pluggable = (namespace) => {
    /**
     * @param {Class} Class
     */
    return function (Class) {
        return (...args) => {
            // First optional chaining operator usage in ScandiPWA
            // const methodsPlugins = window.plugins?.[namespace]?.[Class.prototype.constructor.name];
            const methodsPlugins = window.plugins?.[namespace];
            const instance = new Class(...args);
            // Handle no plugins declared
            if (!methodsPlugins) {
                return instance;
            }

            return new Proxy(instance, {
                // Move to 'construct'
                get(target, methodName) {
                    const origMethod = target[methodName];
                    const methodPlugins = methodsPlugins[methodName];

                    const {
                        before: beforePlugins = [],
                        after: afterPlugins = [],
                        around: aroundPlugins = []
                    } = methodPlugins || {};

                    return function (...args) {
                        const newArguments = beforePlugins.reduce(
                            (prevArgs, curr) => curr(prevArgs, target),
                            args
                        );

                        const newMethod = aroundPlugins.reduce(
                            (acc, curr) => (...originalArgs) => {
                                const args = originalArgs.length ? originalArgs : newArguments;
                                return curr(args, acc, target);
                            },
                            (...originalArgs) => {
                                const args = originalArgs.length ? originalArgs : newArguments;
                                return origMethod(...args);
                            }
                        );

                        const newResult = afterPlugins.reduce(
                            (prevResult, curr) => curr(prevResult, target),
                            newMethod()
                        );

                        return newResult;
                    };
                }
            });
        };
    };
};

module.exports = pluggable;
