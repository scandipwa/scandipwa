/* eslint-disable import/prefer-default-export */
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

import { ContactFormActionType, ContactFormStore, UpdateContactFormStoreAction } from './ContactForm.type';

/**
 * Send message
 * @param {Object} data
 * @namespace Store/ContactForm/Action/updateContactStore */
export const updateContactStore = (state: Partial<ContactFormStore>): UpdateContactFormStoreAction => ({
    type: ContactFormActionType.UPDATE_CONTACT_STORE,
    state,
});
