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
            const classPlugins = window.plugins?.[namespace];
            const instance = new Class(...args);

            // Handle no plugins declared
            if (!classPlugins) {
                return instance;
            }

            return new Proxy(instance, {
                get(target, methodName, rec) {
                    if (methodName === Symbol.iterator) {
                        return target[Symbol.iterator].bind(target);
                    }

                    const origMethod = Reflect.get(target, methodName, rec);
                    if (typeof target[methodName] !== 'function') {
                        return origMethod;
                    }

                    const middlewares = classPlugins[methodName];
                    if (!middlewares) {
                        return origMethod;
                    }

                    middlewares.sort((a, b) => {
                        if (a.position > b.position) return -1;
                        if (a.position < b.position) return 1;
                        throw new Error(
                            `Cannot have equal position on different plugins of the same ${methodName} method
                            on ${Object.getPrototypeOf(target).constructor.name} class in ${namespace} namespace!`
                        );
                    });

                    return function (...args) {
                        const newMethod = middlewares.reduce(
                            (acc, { implementation }) => () => {
                                return implementation(args, acc, target);
                            },
                            // eslint-disable-next-line prefer-arrow-callback
                            (...originalArgs) => {
                                return origMethod.apply(this, originalArgs);
                            }
                        );

                        return newMethod(args);
                    };
                }
            });
        };
    };
};

module.exports = middleware;
