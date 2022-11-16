/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

import { GQLContactForm } from 'Type/Graphql.type';

export enum ContactFormActionType {
    UPDATE_CONTACT_STORE = 'UPDATE_CONTACT_STORE',
}

export interface UpdateContactFormStoreAction extends AnyAction {
    type: ContactFormActionType.UPDATE_CONTACT_STORE;
    state: Partial<ContactFormStore>;
}

export interface ContactFormStore {
    isLoading: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ContactFormReducer: ContactFormStore;
    }
}

export interface ContactFormDispatcherOptions {
    form: {
        reset?: () => void;
    };
    fields: GQLContactForm;
}
