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
export const setCartId = (token: string): void => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(CART_ID) || {};

    tokens[website_code] = {
        token,
        isCustomerToken: isSignedIn()
    };
    BrowserDatabase.setItem(tokens, CART_ID);
};

/** @namespace Util/Cart/Token/getCartId */
export const getCartId = (): string | null => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(CART_ID) || {};

    const token = tokens[website_code];

    if (token) {
        if (token.isCustomerToken && !isSignedIn()) {
            return null;
        }

        return token.token;
    }

    return null;
};

/** @namespace Util/Cart/Token/deleteCartId */
export const deleteCartId = (): void => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(CART_ID);

    tokens[website_code] = undefined;
    BrowserDatabase.setItem(tokens, CART_ID);
};
