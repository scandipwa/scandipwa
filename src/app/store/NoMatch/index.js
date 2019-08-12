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

import NoMatchReducer from './NoMatch.reducer';
import NoMatchDispatcher, { NoMatchDispatcher as NoMatchDispatcherClass } from './NoMatch.dispatcher';
import {
    UPDATE_NOMATCH,
    updateNoMatch
} from './NoMatch.action';

export {
    NoMatchReducer,
    NoMatchDispatcher,
    NoMatchDispatcherClass,
    UPDATE_NOMATCH,
    updateNoMatch
};
