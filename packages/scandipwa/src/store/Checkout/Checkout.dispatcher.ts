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

import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import CheckEmailQuery from 'Query/CheckEmail.query';
import { QueryDispatcher } from 'Util/Request';

import { updateEmailAvailable } from './Checkout.action';
import { CheckoutDispatcherData } from './Checkout.type';

/**
 * Checkout Dispatcher
 * @class CheckoutDispatcher
 * @extends QueryDispatcher
 * @namespace Store/Checkout/Dispatcher
 */
export class CheckoutDispatcher extends QueryDispatcher<string, CheckoutDispatcherData> {
    __construct(): void {
        super.__construct('Checkout');
    }

    onSuccess(data: CheckoutDispatcherData, dispatch: Dispatch): void {
        const { isEmailAvailable: { is_email_available } } = data;
        dispatch(updateEmailAvailable(is_email_available));
    }

    onError(error: unknown, dispatch: Dispatch): unknown {
        dispatch(updateEmailAvailable(true));

        return error;
    }

    prepareRequest(email: string): Query<'isEmailAvailable', unknown, false> {
        return CheckEmailQuery.getIsEmailAvailableQuery(email) as Query<'isEmailAvailable', unknown, false>;
    }
}

export default new CheckoutDispatcher();
