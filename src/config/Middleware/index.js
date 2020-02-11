/* eslint-disable arrow-body-style */
/* eslint-disable func-names */
/**
 * @param {String} namespace
 */
const middleware = (namespace) => {
    /**
     * @param {Class} Class
     */
    return function (Class) {
        return (...args) => {
            // First optional chaining operator usage in ScandiPWA
            const classPlugins = window.plugins?.[namespace];
            const instance = new Class(...args);

            // Handle no plugins declared
            if (!classPlugins) {
                return instance;
            }

            return new Proxy(instance, {
                get(target, methodName) {
                    if (methodName === Symbol.iterator) {
                        return target[Symbol.iterator].bind(target);
                    }
                    if (typeof target[methodName] !== 'function') {
                        return target[methodName];
                    }

                    const origMethod = target[methodName];
                    const middleware = classPlugins[methodName];

                    middleware.sort((a, b) => {
                        if (a.position > b.position) return -1;
                        if (a.position < b.position) return 1;
                        throw new Error(
                            `Cannot have equal position on different plugins of the same ${methodName} method
                            on ${Object.getPrototypeOf(target).constructor.name} class in ${namespace} namespace!`
                        );
                    });

                    return function (...args) {
                        const newMethod = middleware.reduce(
                            (acc, curr) => () => {
                                return curr.implementation(args, acc, target);
                            },
                            (...originalArgs) => {
                                return origMethod(...originalArgs);
                            }
                        );

                        return newMethod();
                    };
                }
            });
        };
    };
};

module.exports = middleware;
