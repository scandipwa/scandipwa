/* eslint-disable arrow-body-style */
/* eslint-disable func-names */
function middleware(Class, namespace) {
    Class.prototype.__namespace__ = namespace;

    const getHandler = function(target, memberName, rec) {
        if (memberName === 'Symbol.iterator') {
            return target[Symbol.iterator].bind(target);
        }
        const origMember = Reflect.get(target, memberName, rec);

        const memberPluginsGet = window.plugins?.[namespace]?.['class']?.['get']?.[memberName];
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
                (acc, { implementation }) => () => {
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

    const constructHandler = function(TargetClass, args) {
        const instance = new TargetClass(...args);
        const namespacePluginsConstruct = window.plugins?.[namespace]?.['class']?.['construct'];

        Object.entries(namespacePluginsConstruct || {}).forEach(([memberName, memberPluginsConstruct]) => {
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

    const handler = {
        get: getHandler,
        construct: constructHandler
    };

    return new Proxy(Class, handler);
}

module.exports = middleware;
