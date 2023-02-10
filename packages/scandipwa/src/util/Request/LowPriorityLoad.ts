/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { INTERVAL_OF_CHECK } from './Config';

/** @namespace Util/Request/LowPriorityLoad/waitForPriorityLoad */
export const waitForPriorityLoad = () => new Promise((resolve) => {
    function waitForIt(){
        if (window.isPriorityLoaded) {
            resolve(null);

            return;
        }

        setTimeout(waitForIt, INTERVAL_OF_CHECK);
    }

    waitForIt();
});

/** @namespace Util/Request/LowPriorityLoad/setLoadedFlag */
export const setLoadedFlag = () => {
    window.isPriorityLoaded = true;
};
