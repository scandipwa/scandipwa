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

import { Reducer } from 'redux';

import { ContactFormActionType, ContactFormStore } from './ContactForm.type';

export const initialState = {
    isLoading: false,
};

/** @namespace Store/ContactForm/Reducer/ContactFormReducer */
export const ContactFormReducer: Reducer<ContactFormStore> = (
    state = initialState,
    action,
) => {
    const { state: newState, type } = action;

    if (ContactFormActionType.UPDATE_CONTACT_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default ContactFormReducer;
