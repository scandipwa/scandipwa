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

// import ConfigQuery from 'Query/Config.query';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';

export const GUEST_QUOTE_ID = 'guest_quote_id';
export const WEBSITE_CODE = 'Token.website_code';
export const WEBSITE_QUOTE_TOKENS = 'Token.website_quote_tokens';

/** @namespace Util/Cart/Token/Old/setGuestQuoteId */
export const setGuestQuoteId = (token) => {
    BrowserDatabase.setItem({
        token,
        isCustomerToken: isSignedIn()
    }, GUEST_QUOTE_ID);
};

/** @namespace Util/Cart/Token/Old/getGuestQuoteId */
export const getGuestQuoteId = () => {
    const {
        token,
        isCustomerToken
    } = BrowserDatabase.getItem(GUEST_QUOTE_ID) || {};

    if (isCustomerToken && !isSignedIn()) {
        return null;
    }

    return token;
};

/** @namespace Util/Cart/Token/Old/deleteGuestQuoteId */
export const deleteGuestQuoteId = () => BrowserDatabase.deleteItem(GUEST_QUOTE_ID);
