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

import { PureComponent } from 'react';

import { Field, prepareQuery } from 'Util/Query';
import { executeGet } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import Stripe from './Stripe.component';
import { STRIPE_MODE_TEST } from './Stripe.config';

export class StripeContainer extends PureComponent {
    state = {
        isLoading: true,
        storeConfig: {}
    };

    constructor(props) {
        super(props);

        if (window.Stripe) {
            this._requestStripeData();
        } else {
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            document.head.appendChild(script);
            script.addEventListener('load', () => {
                this._requestStripeData();
            }, false);
        }
    }

    containerProps = () => ({
        stripeKey: this._getStripeKey()
    });

    _requestStripeData() {
        const query = new Field('storeConfig')
            .addFieldList([
                'stripe_mode',
                'stripe_live_pk',
                'stripe_test_pk'
            ]);

        executeGet(prepareQuery([query]), 'StripeContainer', ONE_MONTH_IN_SECONDS).then(
            ({ storeConfig }) => this.setState({ isLoading: false, storeConfig }),
            () => this.setState({ isLoading: false })
        );
    }

    _getStripeKey() {
        const {
            storeConfig: {
                stripe_mode,
                stripe_live_pk,
                stripe_test_pk
            }
        } = this.state;

        return stripe_mode === STRIPE_MODE_TEST
            ? stripe_test_pk
            : stripe_live_pk;
    }

    render() {
        return (
            <Stripe
              { ...this.props }
              { ...this.state }
              { ...this.containerProps() }
            />
        );
    }
}

export default StripeContainer;
