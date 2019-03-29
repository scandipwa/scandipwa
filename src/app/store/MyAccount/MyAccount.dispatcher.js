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

import { RequestDispatcher } from 'Util/Request';
import { SignUpQuery } from 'Query';
import { updateLoadStatus, updateSignUpInfo } from './MyAccount.action';
/**
 * Search Bar Dispatcher
 * @class SearchBarDispatcher
 * @extends RequestDispatcher
 */
class MyAccountDispatcher extends RequestDispatcher {
    constructor() {
        super('SearchBar', 86400);
    }

    onSuccess(data, dispatch) {
        dispatch(updateLoadStatus(false));
        dispatch(updateSignUpInfo(data));
    }

    onError(error, dispatch) {
        dispatch(updateLoadStatus(false));
    }

    prepareRequest(options, dispatch) {
        dispatch(updateLoadStatus(true));
        return SignUpQuery.getQuery(options);
    }
}

export default new MyAccountDispatcher();
