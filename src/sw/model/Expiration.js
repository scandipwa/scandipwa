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

import DBWrapper from '../util/DBWrapper';

const REQUEST_KEY = 'hash';
const TIMESTAMP_KEY = 'timestamp';

class Expiration {
    constructor(storeName) {
        this.storeName = storeName;
        this.db = new DBWrapper('serviceworkers', 2, {
            onupgradeneeded: event => event.target.result
                .createObjectStore(this.storeName, { keyPath: REQUEST_KEY })
                .createIndex(TIMESTAMP_KEY, TIMESTAMP_KEY, { unique: false })
        });
    }


    /**
     *
     * @param hash
     * @param timestamp
     * @param body
     * @returns {Promise<void>}
     */
    async setTimestamp(hash, body, timestamp = Date.now()) {
        await this.db.put(this.storeName, {
            [REQUEST_KEY]: hash,
            [TIMESTAMP_KEY]: timestamp,
            body
        });
    }

    /**
     * Get all of the timestamps in the indexedDB.
     *
     * @return {Array<Object>}
     */
    async getAllTimestamps() {
        return this.db.getAllMatching(this.storeName, {
            index: TIMESTAMP_KEY
        });
    }

    /**
     * Returns the timestamp stored for a given hash.
     *
     * @param {string} hash
     * @return {number}
     */
    async getTimestamp(hash) {
        return this.db.get(this.storeName, hash);
    }

    /**
     * @param {string} hash
     */
    async deleteHash(hash) {
        await this.db.delete(this.storeName, hash);
    }

    /**
     * Removes the underlying IndexedDB object store entirely.
     */
    async delete() {
        await this.db.deleteDatabase();
        this.db = null;
    }
}

export { Expiration as default };
