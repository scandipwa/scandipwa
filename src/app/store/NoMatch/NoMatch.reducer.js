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

export const getInitialState = () => ({
    noMatch: false
});

export const NoMatchReducer = (
    state = middleware(getInitialState, 'Store/NoMatch/Reducer/getInitialState')(),
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

export default middleware(NoMatchReducer, 'Store/NoMatch/Reducer');
