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

import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
/**
 * NoMatch Dispatcher
 * @class NoMatchDispatcher
 * @namespace Store/NoMatch/Dispatcher
 */
export class NoMatchDispatcher {
    updateNoMatch(dispatch, options) {
        const { noMatch } = options;
        dispatch(updateNoMatch(noMatch));
    }
}

export default new NoMatchDispatcher();
