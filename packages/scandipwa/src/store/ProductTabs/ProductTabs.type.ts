import { AnyAction } from 'redux';

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
export interface ProductTabsStore {
    activeTab: string;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ProductTabsReducer: ProductTabsStore;
    }
}

export enum ProductTabsActionType {
    UPDATE_ACTIVE_PRODUCT_TAB = 'UPDATE_ACTIVE_PRODUCT_TAB',
}

export interface ProductTabsUpdateActiveAction extends AnyAction {
    type: ProductTabsActionType.UPDATE_ACTIVE_PRODUCT_TAB;
    activeTab: string;
}
