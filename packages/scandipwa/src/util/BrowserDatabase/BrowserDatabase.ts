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

// TODO: maybe consider moving to IndexedDB insead of localStorage

/**
 * Set of helpers related to Browser Database
 * @class CSS
 * @namespace Util/BrowserDatabase
 */
export class BrowserDatabase {
    /**
     * Loads data from browser storage
     * @param location Name of the local storage
     */
    getItem<T>(location: string): T | null {
        try {
            const entryObject = JSON.parse(localStorage.getItem(location) as string);
            const { data, expiration, createdAt } = entryObject;
            const MILLISECONDS_TO_SECONDS = 1000;

            if (expiration && Date.now() - createdAt > expiration * MILLISECONDS_TO_SECONDS) {
                localStorage.removeItem(location);

                return null;
            }

            return data;
        } catch {
            return null;
        }
    }

    /**
     * Save data to local storage
     * @param data The value to save to local storage
     * @param location Name of the local storage
     * @param expiration Time to store entry (in seconds)
     */
    setItem<T>(data: T, location: string, expiration?: number): void {
        localStorage.setItem(location, JSON.stringify({
            data,
            expiration,
            createdAt: Date.now()
        }));
    }

    /**
     * Delete item from local storage
     */
    deleteItem(location: string): boolean {
        localStorage.removeItem(location);

        return true;
    }
}

export default new BrowserDatabase();
