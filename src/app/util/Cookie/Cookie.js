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

const Cookie = {
    set(name, value, expire) {
        const date = new Date();
        date.setTime(date.getTime() + expire);
        const expires = `expires=${ date.toUTCString()}`;
        const domain = `domain=.${ window.location.host }`;

        document.cookie = `${ name }=${ value };${ domain };${ expires };path=/`;
    },

    get(name) {
        const nameString = `${ name }=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const result = decodedCookie
            .split(';')
            .find(cookie => cookie.trimStart().indexOf(nameString) === 0);

        if (result === undefined) {
            return null;
        }
        const cookie = result.trimStart();

        return cookie.substring(nameString.length, cookie.length);
    },

    steal(name) {
        const cookie = this.get(name);
        this.delete(name);

        return cookie;
    },

    isset(name) {
        return this.get(name) !== null;
    },

    delete(name) {
        this.set(name, '', -1);
    }
};

export default Cookie;
