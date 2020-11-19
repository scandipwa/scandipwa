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

import { Field } from 'Util/Query';
import { fetchMutation } from 'Util/Request';

/** @namespace Util/Braintree */
export class Braintree {
    isLoading = false;

    __construct(containerId) {
        super.__construct();
        this.containerId = containerId;
    }

    async create() {
        const { default: dropIn } = await import('braintree-web-drop-in');
        const authorization = await this.requestBraintreeClientToken();
        this.braintreeDropIn = await dropIn.create({
            authorization,
            container: `#${ this.containerId }`
        });

        return true;
    }

    requestBraintreeClientToken() {
        const mutation = (new Field('createBraintreeClientToken')).setAlias('token');
        return fetchMutation(mutation).then(
            /** @namespace Util/Braintree/fetchMutationThen */
            ({ token }) => token
        );
    }

    requestPaymentNonce = () => this.braintreeDropIn.requestPaymentMethod();
}

export default Braintree;
