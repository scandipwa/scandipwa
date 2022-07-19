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

import {
    UPDATE_NOMATCH
} from './NoMatch.action';

/** @namespace Store/NoMatch/Reducer/getInitialState */
export const getInitialState = () => ({
    noMatch: false
});

/** @namespace Store/NoMatch/Reducer/NoMatchReducer */
export const NoMatchReducer = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case UPDATE_NOMATCH:
        const { noMatch } = action;

        return { noMatch };

    default:
        return state;
    }
};

export default NoMatchReducer;
