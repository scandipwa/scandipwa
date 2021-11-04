/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export const CHECK_INTERVAL = 100;
export const WAIT_TIMEOUT = 10000;

/** @namespace Util/Promise/PauseUntil/pauseUntil */
export async function pauseUntil(condition, error, timeoutMs = WAIT_TIMEOUT, checkInterval = CHECK_INTERVAL) {
    return new Promise((resolve, reject) => {
        const startTime = new Date();
        const wait = setInterval(() => {
            if (condition()) {
                clearInterval(wait);
                resolve('Wait successful');
            }

            if (new Date() - startTime > timeoutMs) {
                clearInterval(wait);
                reject(new Error(error || 'Wait timeout'));
            }
        }, checkInterval);
    });
}
