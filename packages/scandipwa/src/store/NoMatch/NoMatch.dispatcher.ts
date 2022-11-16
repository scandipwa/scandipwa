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

import { updateNoMatchStore } from 'Store/NoMatch/NoMatch.action';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';
/**
 * NoMatch Dispatcher
 * @class NoMatchDispatcher
 * @namespace Store/NoMatch/Dispatcher
 */
export class NoMatchDispatcher extends SimpleDispatcher {
    updateNoMatch(options: { noMatch: boolean }): void {
        const { noMatch } = options;

        this.dispatch(updateNoMatchStore({ noMatch }));
    }
}

export default new NoMatchDispatcher();
