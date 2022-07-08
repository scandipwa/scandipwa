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

import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';

export const CART_ID = 'cart_id';

/** @namespace Util/Cart/Token/setCartId */
export const setCartId = (token) => {
    BrowserDatabase.setItem({
        token,
        isCustomerToken: isSignedIn()
    }, CART_ID);
};

/** @namespace Util/Cart/Token/getCartId */
export const getCartId = () => {
    const {
        token,
        isCustomerToken
    } = BrowserDatabase.getItem(CART_ID) || {};

    if (isCustomerToken && !isSignedIn()) {
        return null;
    }

    return token;
};

/** @namespace Util/Cart/Token/deleteCartId */
export const deleteCartId = () => BrowserDatabase.deleteItem(CART_ID);
