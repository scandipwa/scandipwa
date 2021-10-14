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

import {
    createStore, del, get, set, UseStore
} from 'idb-keyval';

import { SECOND_IN_MILLISECONDS } from './Storage.config';

export class Storage {
    private store!: UseStore;

    constructor(
        databaseName: string,
        storeName?: string,
    ) {
        this.store = createStore(databaseName, storeName || databaseName);
    }

    /**
     * Get data from storage
     * @param key Name of the storage
     */
    async getItem<T>(key: string): Promise<T | undefined> {
        const result = await get<{
            value: T,
            expiration?: number,
            createdAt?: number,
        }>(key, this.store);

        const { value, expiration, createdAt } = result || {};

        if (typeof createdAt === 'number' && typeof expiration === 'number') {
            if (expiration && Date.now() - createdAt > expiration * SECOND_IN_MILLISECONDS) {
                await del(key, this.store);

                return undefined;
            }
        }

        return value;
    }

    /**
     * Save data to storage
     * @param data The value to save to storage
     * @param location Name of the storage
     * @param expiration Time to store entry (in seconds)
     */
    async setItem<T>(key: string, value: T, expiration = 0): Promise<boolean> {
        await set(
            key,
            {
                value,
                expiration,
                createdAt: Date.now()
            },
            this.store
        );

        return true;
    }

    /**
     * Delete item from storage
     */
    async deleteItem(key: string): Promise<boolean> {
        await del(key, this.store);

        return true;
    }
}
