import { CUSTOMER } from '../../store/MyAccount/MyAccount.dispatcher';
import { AUTH_TOKEN } from '../Auth/Token';

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

export const WEBSITE_STORAGE = 'storage_per_website';
export const GLOBAL_STORAGE = 'storage_global';

const { website_code, customer_account_share } = window;

/*  Keys which depend on customer_account_share option
    whether they'll be saved in global or shared storage. */
export const KEYS_DEPEND_ON_SHARING = {
    [CUSTOMER]: true,
    [AUTH_TOKEN]: true
};

/** @namespace Util/BrowserDatabase/LocalStorageDriver */
export class LocalStorageDriver {
    updateStorage(storage, destination, path, location, data) {
        const newStorage = { ...storage };

        if (!newStorage[path]) {
            newStorage[path] = {};
        }

        newStorage[path][location] = JSON.parse(data);
        localStorage.setItem(destination, JSON.stringify(newStorage));
    }

    getWebsiteStorage() {
        const websiteStorageTest = localStorage.getItem(WEBSITE_STORAGE);
        const websiteStorage = websiteStorageTest ? JSON.parse(websiteStorageTest) : {};

        const globalStorageTest = localStorage.getItem(GLOBAL_STORAGE);
        const globalStorage = globalStorageTest ? JSON.parse(globalStorageTest) : {};

        return { websiteStorage, globalStorage };
    }

    getSiteStorage(dependsOnSharing) {
        const { websiteStorage, globalStorage } = this.getWebsiteStorage();

        if (dependsOnSharing && customer_account_share === ACCOUNT_SHARE_GLOBAL) {
            return {
                storage: globalStorage,
                destination: GLOBAL_STORAGE,
                path: GLOBAL_STORAGE
            };
        }

        return {
            storage: websiteStorage,
            destination: WEBSITE_STORAGE,
            path: website_code
        };
    }

    getItem(location) {
        const dependsOnSharing = this.dependsOnSharing(location);

        const { storage, path } = this.getSiteStorage(dependsOnSharing);

        return JSON.stringify(storage[path][location]) || null;
    }

    setItem(location, data) {
        const dependsOnSharing = this.dependsOnSharing(location);

        const { storage, destination, path } = this.getSiteStorage(dependsOnSharing);

        this.updateStorage(storage, destination, path, location, data);
    }

    removeItem(location) {
        const dependsOnSharing = this.dependsOnSharing(location);

        this.setItem(location, 'null', dependsOnSharing);
    }

    dependsOnSharing(key) {
        return KEYS_DEPEND_ON_SHARING[key];
    }
}

export default LocalStorageDriver;
