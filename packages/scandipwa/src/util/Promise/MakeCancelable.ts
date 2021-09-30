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

// Disabled due promise being reject with custom error (isCanceled)

type CancelablePromise<T> = Promise<T> & { cancel(): void }

/**
 * Promise wrapper to make it cancelable
 * @namespace Util/Promise/MakeCancelable/makeCancelable
 */
export const makeCancelable = <T>(promise: Promise<T>): CancelablePromise<T> => {
    // eslint-disable-next-line fp/no-let
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            /** @namespace Util/Promise/MakeCancelable/makeCancelable/wrappedPromise/promise/then */
            (val) => (!hasCanceled_ && resolve(val)),
            /** @namespace Util/Promise/MakeCancelable/makeCancelable/wrappedPromise/promise/then/catch */
            (error) => (!hasCanceled_ && reject(error))
        );
    }) as CancelablePromise<T>;

    wrappedPromise.cancel = () => {
        hasCanceled_ = true;
    };

    return wrappedPromise;
};

export default makeCancelable;
