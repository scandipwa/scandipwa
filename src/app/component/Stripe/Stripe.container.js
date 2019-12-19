import { PureComponent } from 'react';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { Field, prepareQuery } from 'Util/Query';
import { executeGet } from 'Util/Request';
import Stripe from './Stripe.component';

export const STRIPE_MODE_TEST = 'test';

export class StripeContainer extends PureComponent {
    state = {
        isLoading: true,
        storeConfig: {}
    };

    componentDidMount() {
        this._requestStripeData();
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
