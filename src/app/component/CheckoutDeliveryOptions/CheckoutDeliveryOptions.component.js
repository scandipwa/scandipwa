import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { shippingMethodsType } from 'Type/Checkout';
import CheckoutDeliveryOption from 'Component/CheckoutDeliveryOption';

import './CheckoutDeliveryOptions.style';

export const FLAT_RATE = 'flatrate';

class CheckoutDeliveryOptions extends PureComponent {
    static propTypes = {
        shippingMethods: shippingMethodsType.isRequired,
        selectShippingMethod: PropTypes.func.isRequired,
        selectedShippingMethodCode: PropTypes.oneOf([
            FLAT_RATE
        ])
    };

    static defaultProps = {
        selectedShippingMethodCode: null
    };

    shippingRenderMap = {};

    renderHeading() {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Select shipping method') }
            </h2>
        );
    }

    renderDeliveryOption = (option) => {
        const {
            selectedShippingMethodCode,
            selectShippingMethod
        } = this.props;

        const { carrier_code } = option;
        const isSelected = selectedShippingMethodCode === carrier_code;

        return (
            <CheckoutDeliveryOption
              key={ carrier_code }
              isSelected={ isSelected }
              option={ option }
              onClick={ selectShippingMethod }
            />
        );
    };

    renderNoDeliveryOptions() {
        return (
            <p block="CheckoutDeliveryOptions" elem="NoOptions">
                { __('There are no shipping methods available, try different address.') }
            </p>
        );
    }

    renderShippingMethods() {
        const { shippingMethods } = this.props;
        if (!shippingMethods.length) return this.renderNoDeliveryOptions();
        return shippingMethods.map(this.renderDeliveryOption);
    }

    renderSelectedShippingMethod() {
        const { selectedShippingMethodCode } = this.props;
        const render = this.shippingRenderMap[selectedShippingMethodCode];
        if (!render) return null;
        return render();
    }

    render() {
        return (
            <div block="CheckoutDeliveryOptions">
                { this.renderHeading() }
                <ul block="CheckoutPayments" elem="Methods">
                    { this.renderShippingMethods() }
                </ul>
                { this.renderSelectedShippingMethod() }
            </div>
        );
    }
}

export default CheckoutDeliveryOptions;
