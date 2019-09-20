import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CheckoutAddressBook from 'Component/CheckoutAddressBook';
import { SHIPPING_STEP } from 'Route/Checkout/Checkout.component';
import CheckoutDeliveryOptions from 'Component/CheckoutDeliveryOptions';
import { shippingMethodsType } from 'Type/Checkout';
import Loader from 'Component/Loader';
import Form from 'Component/Form';

import './CheckoutShipping.style';

class CheckoutShipping extends PureComponent {
    static propTypes = {
        onShippingSuccess: PropTypes.func.isRequired,
        onShippingError: PropTypes.func.isRequired,
        onShippingEstimationFieldsChange: PropTypes.func.isRequired,
        shippingMethods: shippingMethodsType.isRequired,
        onShippingMethodSelect: PropTypes.func.isRequired,
        selectedShippingMethod: PropTypes.string,
        onAddressSelect: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    static defaultProps = {
        selectedShippingMethod: ''
    };

    renderActions() {
        const { selectedShippingMethod } = this.props;

        return (
            <button
              type="submit"
              block="Button"
              disabled={ !selectedShippingMethod }
              mix={ { block: 'CheckoutShipping', elem: 'Button' } }
            >
                { __('Proceed to billing') }
            </button>
        );
    }

    renderDelivery() {
        const {
            shippingMethods,
            onShippingMethodSelect
        } = this.props;

        return (
            <CheckoutDeliveryOptions
              shippingMethods={ shippingMethods }
              onShippingMethodSelect={ onShippingMethodSelect }
            />
        );
    }

    renderAddressBook() {
        const {
            onAddressSelect,
            onShippingEstimationFieldsChange
        } = this.props;

        return (
            <CheckoutAddressBook
              onAddressSelect={ onAddressSelect }
              onShippingEstimationFieldsChange={ onShippingEstimationFieldsChange }
            />
        );
    }

    render() {
        const {
            onShippingSuccess,
            onShippingError,
            isLoading
        } = this.props;

        return (
            <Form
              id={ SHIPPING_STEP }
              mix={ { block: 'CheckoutShipping' } }
              onSubmitError={ onShippingError }
              onSubmitSuccess={ onShippingSuccess }
            >
                { this.renderAddressBook() }
                <div>
                    <Loader isLoading={ isLoading } />
                    { this.renderDelivery() }
                    { this.renderActions() }
                </div>
            </Form>
        );
    }
}

export default CheckoutShipping;
