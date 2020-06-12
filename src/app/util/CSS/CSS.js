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
 * Set of helpers related to CSS
 * @class CSS
 */
class CSS {
    /**
     * Change CSS custom property in referenced node scope
     * @static
     * @param  {HTMLElement} ref React reference to an HTML element (node).
     * @param  {String} name CSS variable name (without `--`).
     * @param  {String} value CSS variable value.
     * @return {void}
     * @memberof CSS
     */
    static setVariable(ref, name, value) {
        if (ref.current) {
            ref.current.style.setProperty(`--${name}`, value);
        }
    }
}

export default CSS;
