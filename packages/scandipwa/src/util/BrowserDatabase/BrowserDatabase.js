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

import LocalStorageDriver from './LocalStorageDriver';

// TODO: maybe consider moving to IndexedDB insead of localStorage

/**
 * Set of helpers related to Browser Database
 * @class CSS
 * @namespace Util/BrowserDatabase
 */
export class BrowserDatabase {
    __construct(driver = localStorage) {
        this.driver = driver;
    }

    /**
     * Loads data from browser storage
     * @param {String} location Name of the local storage
     * @return {Object} Object stored in a specified path
     * @memberof BrowserDatabase
     */
    getItem(location) {
        const { driver } = this;

        try {
            const entryObject = JSON.parse(driver.getItem(location));
            const { data, expiration, createdAt } = entryObject;
            const MILLISECONDS_TO_SECONDS = 1000;

            if (expiration && Date.now() - createdAt > expiration * MILLISECONDS_TO_SECONDS) {
                driver.removeItem(location);

                return null;
            }

            return data;
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
    setItem(data, location, expiration) {
        const { driver } = this;

        driver.setItem(location, JSON.stringify({
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
    deleteItem(location) {
        const { driver } = this;

        driver.removeItem(location);
    }
}

export default new BrowserDatabase(new LocalStorageDriver());
