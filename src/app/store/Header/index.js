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

import HeaderReducer from './Header.reducer';
import {
    CHANGE_HEADER_STATE,
    GOTO_PREVIOUS_HEADER_STATE,
    changeHeaderState,
    goToPreviousHeaderState
} from './Header.action';

export {
    HeaderReducer,
    CHANGE_HEADER_STATE,
    changeHeaderState,
    GOTO_PREVIOUS_HEADER_STATE,
    goToPreviousHeaderState
};
