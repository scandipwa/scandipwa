/* eslint-disable */

/**
 * Sort plugins by position:
 * @param {Array} plugins
 * @param {string} errorText
 */
const sortPlugins = (plugins, errorText) => plugins
    .sort((a, b) => {
        if (a.position > b.position) return -1;
        if (a.position < b.position) return 1;
        throw new Error(errorText);
    });

/**
 * Get error text to show if two plugins are defined with same positions
 * @param {string} memberName
 * @param {string|null} className
 * @param {string} namespace
 */
const getHandlerErrorText = (memberName, className, namespace) => {
    return `Cannot have equal position on different plugins of the same ${memberName} member
    on ${ className ? `${className} class` : '' } in ${namespace} namespace!`;
};

/**
 * Middlewaring given original member
 * @param {Function} origMember
 * @param {Array} sortedPlugins
 * @param Context origContext
 */
function middlewareFunction(origMember, sortedPlugins, origContext) {
    return function (...args) {
        const starter = typeof origMember === 'function'
            ? (...originalArgs) => origMember.apply(origContext, originalArgs)
            : origMember;

        const newMember = sortedPlugins.reduce(
            (acc, { implementation }) => () => {
                return typeof origMember === 'object'
                    ? implementation(acc, origContext)
                    : implementation(args, acc, origContext);
            },
            starter
        );

        return newMember(args);
    };
}

/**
 * Middleware function is supposed to wrap source classes
 * in order to provide plugin functionality
 * @param {Class} Class
 * @param {string} namespace
 */
function middleware(Class, namespace) {
    Class.prototype.__namespace__ = namespace;

    const applyHandler = function (origFunction, thisArg, originalArgs) {
        const memberName = origFunction.prototype.constructor.name;

        const memberPluginsApply = window.plugins?.[namespace]?.['function']?.['apply'];
        if (memberPluginsApply && !Array.isArray(memberPluginsApply)) {
            throw new Error(`Expected Array in function/apply config section for ${namespace}`);
        }

        if (!memberPluginsApply) {
            return origFunction.apply(thisArg, originalArgs);
        }

        return middlewareFunction(
            origFunction,
            sortPlugins(
                memberPluginsApply,
                getHandlerErrorText(origFunction.prototype.constructor.name, null, namespace)
            ),
            thisArg
        )();
    };

    const getHandler = function (target, memberName, rec) {
        if (memberName === 'Symbol.iterator') {
            return target[Symbol.iterator].bind(target);
        }
        const origMember = Reflect.get(target, memberName, rec);

        const memberPluginsGet = window.plugins?.[namespace]?.['class']?.['get']?.[memberName];
        if (!memberPluginsGet) {
            return origMember;
        }

        const middlewaredFunction = middlewareFunction(
            origMember,
            sortPlugins(
                memberPluginsGet,
                getHandlerErrorText(memberName, Object.getPrototypeOf(target).constructor.name, namespace)
            ),
            target
        );

        if (typeof origMember === 'object') {
            return middlewaredFunction();
        }

        return middlewaredFunction;
    };

    const constructHandler = function (TargetClass, args) {
        const instance = new TargetClass(...args);
        const namespacePluginsConstruct = window.plugins?.[namespace]?.['class']?.['construct'] || {};

        Object.entries(namespacePluginsConstruct).forEach(
            ([memberName, memberPluginsConstruct]) => {
                const origMember = instance[memberName];
                const sortedPlugins = sortPlugins(
                    memberPluginsConstruct,
                    getHandlerErrorText(memberName, TargetClass.name, namespace)
                );

                const newMember = sortedPlugins.reduce(
                    (acc, { implementation }) => {
                        return implementation(acc, instance);
                    },
                    origMember
                );

                instance[memberName] = newMember;
            }
        );

        return instance;
    };

    const handler = {};

    // All classes inherit from extensible classes
    // ~ if `Class` inherits from class other than Object
    // ~ if `Class` is class, not regular function
    if (Class.prototype.__proto__.constructor.name === 'Object') {
        // Apply handler for functions - intercepts function calls
        Object.defineProperty(
            handler,
            'apply',
            { value: applyHandler }
        );
    } else {
        // Get handler for members - intercepts `get` calls, meant for class static members
        Object.defineProperty(
            handler,
            'get',
            { value: getHandler }
        );
        // Construct handler for classes - intercepts `new` operator calls, changes properties
        Object.defineProperty(
            handler,
            'construct',
            { value: constructHandler }
        );
    }

    return new Proxy(Class, handler);
}

module.exports = middleware;
