/* eslint-disable func-names */

module.exports = function proxyContext(context, namespacePlugins, namespace) {
    return new Proxy(context, {
        get(target, memberName, rec) {
            if (memberName === 'Symbol.iterator') {
                return target[Symbol.iterator].bind(target);
            }

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
                    on ${Object.getPrototypeOf(target).constructor.name} class in ${namespace} namespace!`
                );
            });

            const middlewaredFunction = function (...args) {
                const newMember = pluginsForCalledMember.reduce(
                    (acc, { implementation }) => () => {
                        if (typeof origMember === 'object') {
                            return implementation(acc, rec);
                        }

                        return implementation(args, acc, rec);
                    }, typeof origMember === 'function'
                        ? (...originalArgs) => origMember.apply(rec, originalArgs)
                        : origMember
                );

                return newMember(args);
            };

            if (typeof origMember === 'object') {
                return middlewaredFunction();
            }

            return middlewaredFunction;
        }
    });
};
