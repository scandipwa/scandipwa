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

<<<<<<< HEAD:packages/scandipwa/src/util/Cart/Token.ts
/** @namespace Util/Cart/Token/setGuestQuoteId */
export const setGuestQuoteId = (token: string): void => {
    BrowserDatabase.setItem({
=======
/** @namespace Util/Cart/Token/setCartId */
export const setCartId = (token) => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(CART_ID) || {};

    tokens[website_code] = {
>>>>>>> scandipwa/master:packages/scandipwa/src/util/Cart/Token.js
        token,
        isCustomerToken: isSignedIn()
    };
    BrowserDatabase.setItem(tokens, CART_ID);
};

<<<<<<< HEAD:packages/scandipwa/src/util/Cart/Token.ts
/** @namespace Util/Cart/Token/getGuestQuoteId */
export const getGuestQuoteId = (): string | null => {
    const {
        token,
        isCustomerToken
    } = BrowserDatabase.getItem(GUEST_QUOTE_ID) || {};
=======
/** @namespace Util/Cart/Token/getCartId */
export const getCartId = () => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(CART_ID) || {};

    const token = tokens[website_code];
>>>>>>> scandipwa/master:packages/scandipwa/src/util/Cart/Token.js

    if (token) {
        if (token.isCustomerToken && !isSignedIn()) {
            return null;
        }

        return token.token;
    }

    return null;
};

<<<<<<< HEAD:packages/scandipwa/src/util/Cart/Token.ts
/** @namespace Util/Cart/Token/deleteGuestQuoteId */
export const deleteGuestQuoteId = (): void => BrowserDatabase.deleteItem(GUEST_QUOTE_ID);
=======
/** @namespace Util/Cart/Token/deleteCartId */
export const deleteCartId = () => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(CART_ID);

    tokens[website_code] = undefined;
    BrowserDatabase.setItem(tokens, CART_ID);
};
>>>>>>> scandipwa/master:packages/scandipwa/src/util/Cart/Token.js
