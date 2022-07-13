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

export const GUEST_QUOTE_ID = 'guest_quote_id';

/** @namespace Util/Cart/Token/setGuestQuoteId */
export const setGuestQuoteId = (token) => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(GUEST_QUOTE_ID) || {};
    tokens[website_code] = {
        token,
        isCustomerToken: isSignedIn()
    };
    BrowserDatabase.setItem(tokens, GUEST_QUOTE_ID);
};

/** @namespace Util/Cart/Token/getGuestQuoteId */
export const getGuestQuoteId = () => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(GUEST_QUOTE_ID) || {};

    const token = tokens[website_code];

    if (token) {
        if (token.isCustomerToken && !isSignedIn()) {
            return null;
        }

        return token.token;
    }

    return null;
};

/** @namespace Util/Cart/Token/deleteGuestQuoteId */
export const deleteGuestQuoteId = () => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(GUEST_QUOTE_ID);
    tokens[website_code] = undefined;
    BrowserDatabase.setItem(tokens, GUEST_QUOTE_ID);
};
