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

import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import CheckEmailQuery from 'Query/CheckEmail.query';
import { NetworkError } from 'Type/Common.type';
import { QueryDispatcher } from 'Util/Request';

import { updateEmailAvailable } from './Checkout.action';
import { CheckoutDispatcherData } from './Checkout.type';

/**
 * Checkout Dispatcher
 * @class CheckoutDispatcher
 * @extends QueryDispatcher
 * @namespace Store/Checkout/Dispatcher
 */
export class CheckoutDispatcher<
P extends Readonly<string> = Readonly<string>,
S extends CheckoutDispatcherData = CheckoutDispatcherData,
> extends QueryDispatcher <P, S> {
    __construct(): void {
        super.__construct('Checkout');
    }

    onSuccess(data: CheckoutDispatcherData, dispatch: Dispatch): void {
        const { isEmailAvailable: { is_email_available } } = data;

        dispatch(updateEmailAvailable(is_email_available));
    }

    onError(error: NetworkError | NetworkError[], dispatch: Dispatch): unknown {
        dispatch(updateEmailAvailable(true));

        return error;
    }

    prepareRequest(email: string): Query<'isEmailAvailable', { is_email_available: boolean }> {
        return CheckEmailQuery.getIsEmailAvailableQuery(email);
    }
}

export default new CheckoutDispatcher();
