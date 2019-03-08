// TODO: maybe consider moving to IndexedDB insead of localStorage

/**
 * Set of helpers related to Browser Database
 * @class CSS
 */
class BrowserDatabase {
    /**
     * Loads data from browser storage
     * @param {String} location Name of the local storage
     * @return {Object} Object stored in a specified path
     * @memberof BrowserDatabase
     */
    getItem(location) {
        try {
            return JSON.parse(localStorage.getItem(location));
        } catch {
            return null;
        }
    }

    /**
     * Save data to local storage
     * @param {Any} data The value to save to local storage
     * @param {String} location Name of the local storage
     * @return {Void}
     * @memberof BrowserDatabase
     */
    setItem(data, location) {
        localStorage.setItem(location, JSON.stringify(data));
    }
}

export default new BrowserDatabase();
