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

import { createBrowserHistory } from 'history';

/** @namespace Util/History/Index/createBrowserHistoryWithStateInRoot */
export function createBrowserHistoryWithStateInRoot() {
    const browserHistory = createBrowserHistory({ basename: '/' });

    const changeListeners = [];

    const prevLocation = { pathname: '' };

    browserHistory.listen((location) => {
        const { pathname: newLocationPath } = location;

        if (newLocationPath !== prevLocation.pathname) {
            changeListeners.forEach((listener) => listener && listener(newLocationPath, prevLocation.pathname));
            prevLocation.pathname = newLocationPath;
        }
    });

    const subscribe = (callback) => changeListeners.push(callback);
    const unsubscribe = (fn) => {
        const unsubscribeIndex = changeListeners.findIndex(fn);

        changeListeners[unsubscribeIndex] = undefined;
    };

    const proxyHandler = {
        get(target, prop, receiver) {
            if (prop === 'onChange') {
                return (callback) => {
                    subscribe(callback);

                    return () => {
                        unsubscribe(callback);
                    };
                };
            }

            return Reflect.get(target, prop, receiver);
        }
    };

    return new Proxy(browserHistory, proxyHandler);
}

export const history = createBrowserHistoryWithStateInRoot({ basename: '/' });
export default history;
