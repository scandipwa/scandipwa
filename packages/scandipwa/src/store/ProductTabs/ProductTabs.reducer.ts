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

import {
    ProductTabsActionType,
    ProductTabsStore, ProductTabsUpdateActiveAction,
} from './ProductTabs.type';

/** @namespace Store/ProductTabs/Reducer/getInitialState */
export const getInitialState = (): ProductTabsStore => ({
    activeTab: '',
});

/** @namespace Store/ProductTabs/Reducer/ProductTabsReducer */
export const ProductTabsReducer: Reducer<
ProductTabsStore,
ProductTabsUpdateActiveAction
> = (
    state = getInitialState(),
    action,
) => {
    const { activeTab, type } = action;

    switch (type) {
    case ProductTabsActionType.UPDATE_ACTIVE_PRODUCT_TAB:
        return { ...state, activeTab };
    default:
        return state;
    }
};

export default ProductTabsReducer;
