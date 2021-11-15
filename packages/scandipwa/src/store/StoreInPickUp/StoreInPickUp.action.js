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

export const SET_PICK_UP_STORE = 'SET_PICK_UP_STORE';
export const CLEAR_PICK_UP_STORE = 'CLEAR_PICK_UP_STORE';

/** @namespace Store/StoreInPickUp/Action/setPickUpStore */
export const setPickUpStore = (store) => ({
    type: SET_PICK_UP_STORE,
    store
});

/** @namespace Store/StoreInPickUp/Action/clearPickUpStore */
export const clearPickUpStore = () => ({
    type: CLEAR_PICK_UP_STORE
});
