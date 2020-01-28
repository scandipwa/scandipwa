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

/**
 * Set of helpers related to Browser Cookie
 * @class CSS
 */
class BrowserCookie {
    /**
     * Loads data from browser cookie
     * @param {String} location Name of the cookie
     * @return {Object} Object stored in a specified path
     * @memberof BrowserCookie
     */
    getItem(location) {
        location = location + "=";
        const cookieValues = document.cookie.split(';');

        for (let i = 0; i < cookieValues.length; i++) {
            var cookie = cookieValues[i];
            while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
            if (cookie.indexOf(location) == 0) return cookie.substring(location.length, cookie.length);
        };

        return null;
    }

    /**
     * Save data to cookies
     * @param {Any} data The value to save to cookie
     * @param {String} location Name of the cookie
     * @param {Number} expiration Time to store entry (in seconds)
     * @return {Void}
     * @memberof BrowserCookie
     */
    setItem(data, location, expiration) {
        let expires = '';

        if (expiration) {
            let date = new Date();
            date.setTime(date.getTime() + (expiration * 1000));
            expires = "; expires=" + date.toUTCString();
        }

        document.cookie = location + "=" + (data || "") + expires + "; path=/";
    }

    /**
     * Delete item from cookies
     * @param {String} location
     * @memberof BrowserCookie
     */
    deleteItem(location) {
        document.cookie = location + '=; Max-Age=-99999999;';
    }
}

export default new BrowserCookie();
