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
import getStore from 'Util/Store';

export const GUEST_QUOTE_ID = 'guest_quote_id';
export const WEBSITE_QUOTE_TOKENS = 'Token.website_quote_tokens';

/** @namespace Util/Cart/Token/getWebsiteCodeFromStore */
export function getWebsiteCodeFromStore() {
    const state = getStore().getState();
    const {
        website_code
    } = state.ConfigReducer;

    return website_code;
}

/** @namespace Util/Cart/Token/setGuestQuoteId */
export const setGuestQuoteId = (token) => {
    const website_code = getWebsiteCodeFromStore();

    const tokens = BrowserDatabase.getItem(WEBSITE_QUOTE_TOKENS) || {};
    tokens[website_code] = {
        token,
        isCustomerToken: isSignedIn()
    };
    BrowserDatabase.setItem(tokens, WEBSITE_QUOTE_TOKENS);
};

/** @namespace Util/Cart/Token/getGuestQuoteId */
export const getGuestQuoteId = () => {
    const website_code = getWebsiteCodeFromStore();

    console.log('WEBSITE_CODE_FROM_STORE', website_code);

    const tokens = BrowserDatabase.getItem(WEBSITE_QUOTE_TOKENS);

    if (tokens) {
        const token = tokens[website_code];

        if (token) {
            if (token.isCustomerToken && !isSignedIn()) {
                return null;
            }

            return token.token;
        }

        return null;
    }

    return null;
};

/** @namespace Util/Cart/Token/deleteGuestQuoteId */
export const deleteGuestQuoteId = () => {
    const website_code = getWebsiteCodeFromStore();

    const tokens = BrowserDatabase.getItem(WEBSITE_QUOTE_TOKENS);
    tokens[website_code] = undefined;
    BrowserDatabase.setItem(tokens, WEBSITE_QUOTE_TOKENS);
};
