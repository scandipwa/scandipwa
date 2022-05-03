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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import CheckoutDeliveryOption from 'Component/CheckoutDeliveryOption';
import { ShippingMethodsType, ShippingMethodType } from 'Type/Checkout.type';

import './CheckoutDeliveryOptions.style';

/** @namespace Component/CheckoutDeliveryOptions/Component */
export class CheckoutDeliveryOptions extends PureComponent {
    static propTypes = {
        shippingMethods: ShippingMethodsType.isRequired,
        selectShippingMethod: PropTypes.func.isRequired,
        selectedShippingMethod: ShippingMethodType,
        checkoutReducerShippingMethod: PropTypes.string.isRequired
    };

    static defaultProps = {
        selectedShippingMethod: {}
    };

    state = {
        initialSelectedMethod: null
    };

    componentDidUpdate(prevProps) {
        const { checkoutReducerShippingMethod, shippingMethods, selectShippingMethod } = this.props;
        const { shippingMethods: prevShippingMethods } = prevProps;
        const { initialSelectedMethod } = this.state;

        if (
            checkoutReducerShippingMethod
            && (!prevShippingMethods.length && shippingMethods.length)
        ) {
            shippingMethods.forEach(
                (method) => {
                    const { available, method_code } = method;

                    if (available && method_code === checkoutReducerShippingMethod) {
                        // eslint-disable-next-line react/no-did-update-set-state
                        this.setState({ initialSelectedMethod: method });
                    }
                }
            );
        } else if (initialSelectedMethod) {
            selectShippingMethod(initialSelectedMethod);
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ initialSelectedMethod: null });
        }
    }

    renderHeading() {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Shipping method') }
            </h2>
        );
    }

    renderDeliveryOption(option) {
        const {
            selectShippingMethod,
            selectedShippingMethod: { method_code: selectedMethodCode }
        } = this.props;
        const { initialSelectedMethod } = this.state;

        const { carrier_code, method_code } = option;
        const isSelected = (initialSelectedMethod?.method_code || selectedMethodCode) === method_code;

        return (
            <CheckoutDeliveryOption
              key={ carrier_code }
              isSelected={ isSelected }
              option={ option }
              onClick={ selectShippingMethod }
            />
        );
    }

    renderNoDeliveryOptions() {
        return (
            <p block="CheckoutDeliveryOptions" elem="NoOptions">
                { __('There are no shipping methods available, try different address.') }
            </p>
        );
    }

    renderShippingMethods() {
        const { shippingMethods } = this.props;

        if (!shippingMethods.length) {
            return this.renderNoDeliveryOptions();
        }

        return shippingMethods.map(this.renderDeliveryOption.bind(this));
    }

    render() {
        return (
            <div block="CheckoutDeliveryOptions">
                { this.renderHeading() }
                <ul>
                    { this.renderShippingMethods() }
                </ul>
            </div>
        );
    }
}

export default CheckoutDeliveryOptions;
