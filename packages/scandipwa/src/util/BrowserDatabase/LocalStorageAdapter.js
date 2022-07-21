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
export const ACCOUNT_SHARE_GLOBAL = 'global';
export const ACCOUNT_SHARE_PER_WEBSITE = 'per_website';

export const WEBSITE_STORAGE = 'storage_website';
export const GLOBAL_STORAGE = 'storage_global';

const { website_code, customer_account_share } = window;

/** @namespace Util/BrowserDatabase/LocalStorageAdapter */
export class LocalStorageAdapter {
    updateStorage(storage, destination, path, location, data) {
        const newStorage = { ...storage };

        if (!newStorage[path]) {
            newStorage[path] = {};
        }

        newStorage[path][location] = JSON.parse(data);
        localStorage.setItem(destination, JSON.stringify(newStorage));
    }

    getWebsiteStorage() {
        const websiteStorage = JSON.parse(localStorage.getItem(WEBSITE_STORAGE) || '{}');
        const globalStorage = JSON.parse(localStorage.getItem(GLOBAL_STORAGE) || '{}');

        return { websiteStorage, globalStorage };
    }

    getSiteStorage(dependsOnSharing) {
        const { websiteStorage, globalStorage } = this.getWebsiteStorage();

        if (dependsOnSharing && customer_account_share === ACCOUNT_SHARE_GLOBAL) {
            return {
                storage: globalStorage,
                destination: GLOBAL_STORAGE,
                path: 'global'
            };
        }

        return {
            storage: websiteStorage,
            destination: WEBSITE_STORAGE,
            path: website_code
        };
    }

    getItem(location, dependsOnSharing) {
        const { storage, path } = this.getSiteStorage(dependsOnSharing);

        return JSON.stringify(storage[path][location]) || null;
    }

    setItem(location, data, dependsOnSharing) {
        const { storage, destination, path } = this.getSiteStorage(dependsOnSharing);

        this.updateStorage(storage, destination, path, location, data);
    }

    removeItem(location, dependsOnSharing) {
        this.setItem(location, 'null', dependsOnSharing);
    }
}

export default LocalStorageAdapter;
