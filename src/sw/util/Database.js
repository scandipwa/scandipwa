import localforage from 'localforage';
import Logger from './Logger';

class Database {
    constructor(name, storeName, version = 1) {
        this.logger = new Logger('database', { groupCollapsed: '#ff478e' });
        this.name = `${name}:${storeName}`;
        this.localforage = localforage.createInstance({ name, version, storeName });
        this.localforage.keys().then((keys) => {
            this.logger.groupCollapsed(`Connected to database: "${name}", table: "${storeName}".`);
            this.logger.groupCollapsed('View available keys here.');
            this.logger.unprefixed.log(keys);
            this.logger.groupEnd();
            this.logger.groupEnd();
        });
    }

    /**
     * Write payload in to database by key
     * @param key
     * @param payload
     * @returns {Promise<any>}
     */
    writeItem(key, payload) {
        this.logger.groupCollapsed(`Writing ${key} to "${this.name}."`);
        this.logger.groupCollapsed('View payload here.');
        this.logger.unprefixed.log(payload);
        this.logger.groupEnd();
        this.logger.groupEnd();
        return this.localforage.setItem(key, payload);
    }

    /**
     * Read payload from database
     * @param key
     * @returns {Promise<any>}
     */
    readItem(key) {
        return this.localforage.getItem(key).then((payload) => {
            this.logger.groupCollapsed(`Reading ${key} from "${this.storeName}."`);
            this.logger.groupCollapsed('View resulting payload here.');
            this.logger.unprefixed.log(payload);
            this.logger.groupEnd();
            this.logger.groupEnd();
            return Promise.resolve(payload);
        });
    }

    /**
     * Delete item from database by key
     * @param key
     * @returns {Promise<void>}
     */
    deleteItem(key) {
        return this.localforage.removeItem(key);
    }
}

export { Database as default };
