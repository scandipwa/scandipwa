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

import { Dispatch } from 'redux';

import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
/**
 * NoMatch Dispatcher
 * @class NoMatchDispatcher
 * @namespace Store/NoMatch/Dispatcher
 */
export class NoMatchDispatcher {
    updateNoMatch(dispatch: Dispatch, options: { noMatch: boolean }): void {
        const { noMatch } = options;

        dispatch(updateNoMatch(noMatch));
    }
}

export default new NoMatchDispatcher();
