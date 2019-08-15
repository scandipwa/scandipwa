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

import {
    UPDATE_NOMATCH
} from './NoMatch.action';

export const initialState = {
    noMatch: false
};

const NoMatchReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_NOMATCH:
        const { noMatch } = action;

        return { noMatch };

    default:
        return state;
    }
};

export default NoMatchReducer;
