/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import {
    MyAccountActionType,
    MyAccountStore,
    UpdateMyAccountStoreAction,
} from './MyAccount.type';

/** @namespace Store/MyAccount/Action/updateMyAccountStore */
export const updateMyAccountStore = (state: Partial<MyAccountStore>): UpdateMyAccountStoreAction => ({
    type: MyAccountActionType.UPDATE_MY_ACCOUNT_STORE,
    state,
});
