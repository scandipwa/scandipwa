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

// TODO: maybe consider moving to IndexedDB instead of localStorage

/**
 * Set of helpers related to Browser Database
 * @class CSS
 * @namespace Util/BrowserDatabase
 */
export class BrowserDatabase {
    /**
     * Loads data from browser storage
     * @param {String} location Name of the local storage
     * @return {Object} Object stored in a specified path
     * @memberof BrowserDatabase
     */
    getItem<T>(location: string): T | null {
        try {
            const entryObject = JSON.parse(localStorage.getItem(location) || '');
            const { data, expiration, createdAt } = entryObject;
            const MILLISECONDS_TO_SECONDS = 1000;

            if (expiration && Date.now() - createdAt > expiration * MILLISECONDS_TO_SECONDS) {
                localStorage.removeItem(location);

                return null;
            }

            return data as T;
        } catch {
            return null;
        }
    }

    /**
     * Save data to local storage
     * @param {Any} data The value to save to local storage
     * @param {String} location Name of the local storage
     * @param {Number} expiration Time to store entry (in seconds)
     * @return {Void}
     * @memberof BrowserDatabase
     */
    setItem<T>(data: T, location: string, expiration: number): void {
        localStorage.setItem(location, JSON.stringify({
            data,
            expiration,
            createdAt: Date.now()
        }));
    }

    /**
     * Delete item from local storage
     * @param {String} location
     * @memberof BrowserDatabase
     */
    deleteItem(location: string): void {
        localStorage.removeItem(location);
    }
}

export default new BrowserDatabase();
