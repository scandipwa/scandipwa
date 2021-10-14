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
    IDBPDatabase,
    openDB
} from 'idb';

import { SECOND_IN_MILLISECONDS } from './Storage.config';

/** @namespace Util/Storage */
export class Storage {
    private store!: Promise<IDBPDatabase>;

    private databaseName!: string;

    private databaseVersion = 1;

    setDatabaseName(name: string): this {
        this.databaseName = name;

        return this;
    }

    setDatabaseVersion(version: number): this {
        this.databaseVersion = version;

        return this;
    }

    init(): this {
        this.store = openDB(
            this.databaseName,
            this.databaseVersion
        );

        return this;
    }

    /**
     * Get data from storage
     * @param key Name of the storage
     */
    async getItem<T>(key: string, tableName?: string): Promise<T | undefined> {
        const result = await (await this.store).get(tableName || this.databaseName, key) as {
            value: T,
            expiration?: number,
            createdAt?: number,
        };

        const { value, expiration, createdAt } = result || {};

        if (typeof createdAt === 'number' && typeof expiration === 'number') {
            if (expiration && Date.now() - createdAt > expiration * SECOND_IN_MILLISECONDS) {
                await this.deleteItem(key, tableName);

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
    async setItem<T>(key: string, value: T, expiration = 0, tableName?: string): Promise<boolean> {
        await (await this.store).put(
            tableName || this.databaseName,
            {
                value,
                expiration,
                createdAt: Date.now()
            },
            key
        );

        return true;
    }

    /**
     * Delete item from storage
     */
    async deleteItem(key: string, tableName?: string): Promise<boolean> {
        await (await this.store).delete(tableName || this.databaseName, key);

        return true;
    }
}
