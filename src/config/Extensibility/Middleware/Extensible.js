/* eslint-disable max-classes-per-file */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
/* eslint-disable no-param-reassign, @scandipwa/scandipwa-guidelines/export-level-one */
const generateGetHandler = require('./handlers/generateGetHandler');

// Key for processable classes to determine whether they are already extensible
const extensible = Symbol('Extensible');
const cacheIdentityKey = Symbol('CacheIdentityKey');

// Cache to optimise class generation
const generated = [];

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/derived-class-names
class EmptyBase {}

module.exports = (BaseClass = EmptyBase) => {
    // Handle already extensible classes
    if (BaseClass[extensible]) {
        return BaseClass;
    }

    const { name } = BaseClass;
    const {
        // Generate unique cache identities as default value
        [cacheIdentityKey]: cacheIdentity = Symbol(`Cache Identity ${name}`)
    } = BaseClass;

    // If such class is not yet generated => generate the class
    if (!generated[cacheIdentity]) {
        const GeneratedClass = class Extensible extends BaseClass {
            constructor(...args) {
                super(...args);
                const { __namespaces__ } = Object.getPrototypeOf(this);

                return new Proxy(this, {
                    get: generateGetHandler('instance', __namespaces__)
                });
            }

            __construct() {}
        };

        GeneratedClass[extensible] = true;
        generated[cacheIdentity] = GeneratedClass;
        Object.defineProperty(
            BaseClass,
            cacheIdentityKey,
            { value: cacheIdentity, writable: false }
        );
    }

    return generated[cacheIdentity];
};
