/* eslint-disable arrow-body-style */
/* eslint-disable func-names */
function middleware(Class, namespace) {
    // eslint-disable-next-line no-param-reassign
    Class.prototype.__namespace__ = namespace;
    const namespacePlugins = window.plugins?.[namespace]?.['class'];
    // Handle no plugins declared
    if (!namespacePlugins) {
        return Class;
    }

    const {
        get: pluginsForGet,
        construct: pluginsForConstruct
    } = namespacePlugins;

    const getHandler = function get(target, memberName, rec) {
        if (memberName === 'Symbol.iterator') {
            return target[Symbol.iterator].bind(target);
        }

        const origMember = Reflect.get(target, memberName, rec);

        const memberPluginsGet = pluginsForGet[memberName];
        if (!memberPluginsGet) {
            return origMember;
        }

        // Sort plugins by priority
        memberPluginsGet.sort((a, b) => {
            if (a.position > b.position) return -1;
            if (a.position < b.position) return 1;
            throw new Error(
                `Cannot have equal position on different plugins of the same ${memberName} member
                on ${Object.getPrototypeOf(target).constructor.name} class in ${namespace} namespace!`
            );
        });

        const middlewaredFunction = function (...args) {
            const starter = typeof origMember === 'function'
                ? (...originalArgs) => origMember.apply(this, originalArgs)
                : origMember;

            const newMember = memberPluginsGet.reduce(
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
    };

    const constructHandler = function construct(TargetClass, args) {
        const instance = new TargetClass(...args);
        Object.entries(pluginsForConstruct).forEach(([memberName, memberPluginsConstruct]) => {
            const origMember = instance[memberName];
            memberPluginsConstruct.sort((a, b) => {
                if (a.position > b.position) return 1;
                if (a.position < b.position) return -1;
                throw new Error(
                    `Cannot have equal position on different plugins of the same\
                    ${memberName} member on ${TargetClass.name} class in ${namespace} namespace!`
                );
            });

            const newMember = memberPluginsConstruct.reduce((acc, { implementation }) => {
                return implementation(acc, instance);
            }, origMember);

            instance[memberName] = newMember;
        });

        return instance;
    };

    const handler = {};
    if (namespacePlugins.construct) {
        Object.defineProperty(handler, 'construct', {
            value: constructHandler
        });
    }
    if (namespacePlugins.get) {
        Object.defineProperty(handler, 'get', {
            value: getHandler
        });
    }

    return new Proxy(Class, handler);
}

module.exports = middleware;
