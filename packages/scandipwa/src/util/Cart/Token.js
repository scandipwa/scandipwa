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

import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';

export const GUEST_QUOTE_ID = 'guest_quote_id';

/** @namespace Util/Token/setGuestQuoteId */
export const setGuestQuoteId = (token) => {
    BrowserDatabase.setItem({
        token,
        isCustomerToken: isSignedIn()
    }, GUEST_QUOTE_ID);
};

/** @namespace Util/Token/getGuestQuoteId */
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

/** @namespace Util/Token/deleteGuestQuoteId */
export const deleteGuestQuoteId = () => BrowserDatabase.deleteItem(GUEST_QUOTE_ID);
