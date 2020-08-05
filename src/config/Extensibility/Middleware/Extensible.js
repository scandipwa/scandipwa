const generateGetHandler = require('./handlers/generateGetHandler');

// Key for processable classes to determine whether they are already extensible
const extensible = Symbol('Extensible');
const cacheIdentityKey = Symbol('CacheIdentityKey');

// Cache to optimise class generation
const generated = [];

module.exports = (BaseClass = class {}) => {
    if (BaseClass[extensible]) {
        return BaseClass;
    }
    const { name } = BaseClass;
    const {
        [cacheIdentityKey]: cacheIdentity = Symbol(`CacheIdentity ${name}`)
    } = BaseClass;

    if (!generated[cacheIdentity]) {
        const generatedClass = class X extends BaseClass {
            constructor(...args) {
                super(...args);
                const { __namespace__ } = Object.getPrototypeOf(this);

                return new Proxy(this, {
                    get: generateGetHandler('instance', __namespace__)
                });
            }

            __construct() {}
        };

        generatedClass[extensible] = true;
        generated[cacheIdentity] = generatedClass;
        Object.defineProperty(
            BaseClass,
            cacheIdentityKey,
            { value: cacheIdentity }
        );
    }

    return generated[cacheIdentity];
};
