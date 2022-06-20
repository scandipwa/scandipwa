/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export const WEBSITE_CODE = 'Token.website_code';
export const WEBSITE_QUOTE_TOKENS = 'Token.website_quote_tokens';

/** @namespace Util/Cart/TokenController */
export class TokenController {
    website_code = null;

    __construct() {
        // console.log('TOKEN CONTORLLER INITIALIZED');

    }

    setWebsiteCode(code) {
        this.website_code = code;
        // console.log('WEBSITE_CODE', code);
        BrowserDatabase.setItem(code, WEBSITE_CODE);
    }

    getQuoteIdForCurrentWebsite() {
        const tokens = BrowserDatabase.getItem(WEBSITE_QUOTE_TOKENS);

        if (tokens) {
            const token = tokens[this.website_code];

            if (token) {
                if (token.isCustomerToken && !isSignedIn()) {
                    return null;
                }

                return token.token;
            }

            return null;
        }

        return null;
    }

    setQuoteIdForCurrentWebsite(token) {
        const tokens = BrowserDatabase.getItem(WEBSITE_QUOTE_TOKENS) || {};
        tokens[this.website_code] = {
            token,
            isCustomerToken: isSignedIn()
        };
        BrowserDatabase.setItem(tokens, WEBSITE_QUOTE_TOKENS);
    }

    deleteQuoteId() {
        const tokens = BrowserDatabase.getItem(WEBSITE_QUOTE_TOKENS);
        delete tokens[this.website_code];
        BrowserDatabase.setItem(tokens, WEBSITE_QUOTE_TOKENS);
    }
}

export default new TokenController();
