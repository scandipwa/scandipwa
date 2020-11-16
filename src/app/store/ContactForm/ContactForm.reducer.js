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

import { UPDATE_CONTACT_FORM } from './ContactForm.action';

export const initialState = {
    isLoading: false
};

/** @namespace Store/ContactForm/Reducer/contactFormReducer */
export const ContactFormReducer = (state = initialState, action) => {
    const {
        type,
        data
    } = action;

    switch (type) {
    case UPDATE_CONTACT_FORM:
        return { ...state, ...data };

    default:
        return state;
    }
};

export default ContactFormReducer;
