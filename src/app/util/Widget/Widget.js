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

const Widget = (function init() {
    const _private = new WeakMap();

    const internal = (key) => {
        if (!_private.has(key)) {
            _private.set(key, {});
        }

        return _private.get(key);
    };

    class Widget {
        constructor() {
            if (Widget.instance !== undefined) {
                return Widget.instance;
            }

            internal(this).widgetsMap = new Map();

            Widget.instance = this;
            return this;
        }

        get widgetsEntries() {
            return Array.from(internal(this).widgetsMap);
        }

        get widgets() {
            return Array.from(internal(this).widgetsMap.values());
        }

        get types() {
            return Array.from(internal(this).widgetsMap.keys());
        }

        get(type) {
            return internal(this).widgetsMap.get(type);
        }

        has(type) {
            return internal(this).widgetsMap.has(type);
        }

        set(type, widget) {
            return internal(this).widgetsMap.set(type, widget);
        }
    }

    return Widget;
}());

export default Widget;
