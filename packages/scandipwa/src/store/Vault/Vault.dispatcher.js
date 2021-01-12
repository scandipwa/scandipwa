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

import VaultQuery from 'Query/Vault.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { updateStoredPaymentMethods, updateVaultIsLoading } from 'Store/Vault/Vault.action';
import { fetchMutation, QueryDispatcher } from 'Util/Request';

/**
 * Vault Dispatcher
 * @class VaultDispatcher
 * @extends VaultDispatcher
 * @namespace Store/Vault/Dispatcher
 */
export class VaultDispatcher extends QueryDispatcher {
    __construct() {
        super.__construct('Vault');
    }

    static deletePaymentMethod(dispatch, options) {
        const { public_hash } = options;
        dispatch(updateVaultIsLoading(true));
        fetchMutation(VaultQuery.getDeleteCardFromVaultMutation(
            public_hash
        )).then(
            /** @namespace Store/Vault/Dispatcher/getDeleteCardFromVaultMutationThen */
            ({ deletePaymentToken: { storedPaymentMethods } }) => {
                dispatch(updateStoredPaymentMethods(storedPaymentMethods));
                dispatch(showNotification('success', __('Stored Payment Method was successfully removed!')));
            },
            /** @namespace Store/Vault/Dispatcher/getDeleteCardFromVaultMutationError */
            (error) => {
                dispatch(updateVaultIsLoading(false));
                dispatch(showNotification('error', error[0].message));
                return null;
            }
        );
    }

    onError(error, dispatch) {
        dispatch(updateVaultIsLoading(false));
        dispatch(showNotification('error', 'Error fetching stored payments!', error));
    }

    onSuccess(data, dispatch) {
        const { storedPaymentMethods } = data;
        dispatch(updateStoredPaymentMethods(storedPaymentMethods));
    }

    prepareRequest() {
        return VaultQuery.getQuery();
    }
}

export default new VaultDispatcher();
