/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

export const UPDATE_CONTACT_FORM = 'UPDATE_CONTACT_FORM';

/**
 * Send message
 * @param {Object} data
 * @namespace Store/ContactForm/Action/updateContactForm
 */
export const updateContactForm = (data = {}) => ({
    type: UPDATE_CONTACT_FORM,
    data
});
