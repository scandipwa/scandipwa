// Middleware function to proxy class.

/* eslint-disable arrow-body-style */
/* eslint-disable func-names */

/**
 * @param {String} namespace
 */
function middleware(Class) {
    const { __namespace__ } = Class.prototype;
    const namespacePlugins = window.plugins?.[__namespace__]?.pluginsForStatic;
    // Handle no plugins declared
    if (!namespacePlugins) {
        return Class;
    }

    return new Proxy(Class, {
        get(target, memberName, rec) {
            if (memberName === 'Symbol.iterator') {
                return target[Symbol.iterator].bind(target);
            }

            // if (__namespace__ === 'Component/CheckoutPayments/Component') console.log(`Get ${memberName}`);
            const origMember = Reflect.get(target, memberName, rec);

            const pluginsForCalledMember = namespacePlugins[memberName];
            if (!pluginsForCalledMember) {
                return origMember;
            }

            // Sort plugins by priority
            pluginsForCalledMember.sort((a, b) => {
                if (a.position > b.position) return -1;
                if (a.position < b.position) return 1;
                throw new Error(
                    `Cannot have equal position on different plugins of the same ${memberName} method
                    on ${Object.getPrototypeOf(target).constructor.name} class in ${__namespace__} namespace!`
                );
            });

            const middlewaredFunction = function (...args) {
                const starter = typeof origMember === 'function'
                    ? (...originalArgs) => origMember.apply(this, originalArgs)
                    : origMember;

                const newMember = pluginsForCalledMember.reduce(
                    (acc, { implementation }) => (/** Should more args be here */) => {
                        return typeof origMember === 'object'
                            ? implementation(acc, target)
                            : implementation(args, acc, target);
                    }, starter
                );

                return newMember(args);
            };

            if (typeof origMember === 'object') {
                return middlewaredFunction();
            }

            return middlewaredFunction;
        }
    });
}

module.exports = middleware;
