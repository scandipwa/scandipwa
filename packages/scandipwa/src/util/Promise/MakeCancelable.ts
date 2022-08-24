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

import { CancelablePromise } from './Promise.type';

/* eslint-disable prefer-promise-reject-errors */
// Disabled due promise being reject with custom error (isCanceled)

/**
 * Promise wrapper to make it cancelable
 * @static
 * @param  {Promise} promise promise which has to be cancelable
 * @return {Promise} Cancelable promise
 * @namespace Util/Promise/MakeCancelable/makeCancelable */
export const makeCancelable = <T>(promise: Promise<T>): CancelablePromise<T> => {
    // eslint-disable-next-line fp/no-let
    let hasCanceled = false;

    const wrappedPromise: Promise<T> = new Promise((resolve, reject) => {
        promise.then(
            /** @namespace Util/Promise/MakeCancelable/makeCancelable/wrappedPromise/promise/then */
            (val) => (!hasCanceled && resolve(val)),
            /** @namespace Util/Promise/MakeCancelable/makeCancelable/wrappedPromise/promise/then/catch */
            (error) => (!hasCanceled && reject(error))
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled = true;
        }
    };
};

export default makeCancelable;
