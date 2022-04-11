/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

import { GQLContactForm } from 'Type/Graphql.type';

export enum ContactFormActionType {
    UPDATE_CONTACT_FORM = 'UPDATE_CONTACT_FORM'
}

export interface UpdateContactFormAction extends AnyAction {
    type: ContactFormActionType.UPDATE_CONTACT_FORM;
    data: {
        isLoading: boolean;
    };
}

export type ContactFormStore = {
    isLoading: boolean;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ContactFormReducer: ContactFormStore;
    }
}

export type ContactFormDispatcherOptions = {
    form: {
        reset?: () => void;
    };
    fields: GQLContactForm;
};
