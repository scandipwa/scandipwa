/* eslint-disable @typescript-eslint/ban-ts-comment */
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
    ConfigActionType,
    ConfigStore,
} from './Config.type';

export const MAX_WIDTH = 150;
export const MAX_HEIGHT = 40;
export const DEFAULT_CATEGORY_URL_SUFFIX = '.html';

/** @namespace Store/Config/Reducer/getInitialState */
export const getInitialState = (): Partial<ConfigStore> => ({
    checkoutAgreements: [],
    isLoading: true,
    priceTaxDisplay: {
        product_price_display_type: '',
        shipping_price_display_type: '',
    },
    category_url_suffix: DEFAULT_CATEGORY_URL_SUFFIX,
    device: {
        isMobile: true,
        android: true,
        ios: false,
        blackberry: false,
        opera: false,
        windows: false,
        safari: false,
        standaloneMode: window.matchMedia('(display-mode: standalone)').matches,
    },
});

/** @namespace Store/Config/Reducer/ConfigReducer */
// @ts-ignore
export const ConfigReducer: Reducer<Partial<ConfigStore>> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (ConfigActionType.UPDATE_CONFIG_STATE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};
export default ConfigReducer;
