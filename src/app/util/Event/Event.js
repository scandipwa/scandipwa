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

/**
 * Event utility
 *
 * Should be used only for data collecting or 3'rd service integration.
 * For React internal data flows use react specified data flows architecture
 */
class Event {
    /**
     * Dispatch global event
     *
     * @param name Event name
     * @param data Object of passed data to event observer
     *
     * @return {boolean}
     */
    static dispatch(name, data = {}) {
        window.dispatchEvent(new CustomEvent(name, { detail: data }));

        return true;
    }

    /**
     * Event observer
     * Returns callback wrapper as observer identity
     *
     * @param name Event name
     * @param callback Observer callback
     *
     * @return {function|boolean}
     */
    static observer(name, callback) {
        if (callback && typeof callback === 'function') {
            const callbackWrapper = ({ detail: data }) => { callback.call(this, data); };

            window.addEventListener(name, callbackWrapper, false);

            return callbackWrapper;
        }

        return false;
    }

    /**
     * Remove event observer for defined listener
     *
     * @param name Event name
     * @param listener Callback used for observer (function)
     *
     * @return {boolean}
     */
    static removeObserver(name, listener) {
        window.removeEventListener(name, listener, false);

        return true;
    }
}

export default Event;
