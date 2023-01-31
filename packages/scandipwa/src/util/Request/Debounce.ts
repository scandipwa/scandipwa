// TODO
/** @namespace Util/Request/Debounce/debounce */
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

export const debounce = <T>(
    callback: (...args: T[]) => void | Promise<void>, delay: number): (...args: T[]) => void => {
    // eslint-disable-next-line fp/no-let
    let timeout: NodeJS.Timeout;

    return (...args: T[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(this, args as []), delay);
    };
};

/** @namespace Util/Request/Debounce */
export class Debouncer {
    timeout!: NodeJS.Timeout;

    handler = (): void => {};

    startDebounce = <T = unknown>(
        callback: (...args: T[]) => void,
        delay: number,
    ) => (...args: T[]): void => {
        clearTimeout(this.timeout);
        this.handler = () => callback.apply(this, args);
        this.timeout = setTimeout(this.handler, delay);
    };

    cancelDebounce = (): void => {
        clearTimeout(this.timeout);
    };

    cancelDebounceAndExecuteImmediately = (): void => {
        clearTimeout(this.timeout);
        this.handler();
    };
}
