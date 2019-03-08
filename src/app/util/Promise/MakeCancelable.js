/* eslint-disable prefer-promise-reject-errors */
// Disabled due promise being reject with custom error (isCanceled)

/**
 * Promise wrapper to make it cancelable
 * @static
 * @param  {Promise} promise promise which has to be cancelable
 * @return {Promise} Cancelable promise
 */
const makeCancelable = (promise) => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            val => (!hasCanceled_ && resolve(val)),
            error => (!hasCanceled_ && reject(error))
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        }
    };
};

export default makeCancelable;
