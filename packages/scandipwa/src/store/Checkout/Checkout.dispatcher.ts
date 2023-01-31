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

import CheckEmailQuery from 'Query/CheckEmail.query';
import { prepareQuery } from 'Util/Query';
import { executePost } from 'Util/Request';

import { updateEmailAvailable } from './Checkout.action';
import { CheckoutDispatcherData } from './Checkout.type';
/**
 * Checkout Dispatcher
 * @class CheckoutDispatcher
 * @extends QueryDispatcher
 * @namespace Store/Checkout/Dispatcher
 */
export class CheckoutDispatcher {
    requestEmailValidation(dispatch: Dispatch, email:string): Promise<void> {
        const query = CheckEmailQuery.getIsEmailAvailableQuery(email);

        return executePost<CheckoutDispatcherData>(prepareQuery([query])).then(
            /** @namespace Store/Checkout/Dispatcher/CheckoutDispatcher/requestEmailValidation/executePost/then */
            (data) => {
                const { isEmailAvailable: { is_email_available } } = data;
                dispatch(updateEmailAvailable(is_email_available));
            },
            /** @namespace Store/Checkout/Dispatcher/CheckoutDispatcher/requestEmailValidation/executePost/then/catch */
            (error) => {
                dispatch(updateEmailAvailable(true));

                return error;
            },
        );
    }
}

export default new CheckoutDispatcher();
