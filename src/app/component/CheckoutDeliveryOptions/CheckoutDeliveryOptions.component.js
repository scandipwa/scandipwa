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

import './CheckoutDeliveryOptions.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import CheckoutDeliveryOption from 'Component/CheckoutDeliveryOption';
import { shippingMethodsType } from 'Type/Checkout';

export class CheckoutDeliveryOptions extends PureComponent {
    static propTypes = {
        shippingMethods: shippingMethodsType.isRequired,
        selectShippingMethod: PropTypes.func.isRequired,
        selectedShippingMethodCode: PropTypes.string
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

        const { method_code } = option;
        const isSelected = selectedShippingMethodCode === method_code;

        return (
            <CheckoutDeliveryOption
              key={ method_code }
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
        if (!shippingMethods.length) {
            return this.renderNoDeliveryOptions();
        }

        return shippingMethods.map(this.renderDeliveryOption);
    }

    renderSelectedShippingMethod() {
        const { selectedShippingMethodCode } = this.props;
        const render = this.shippingRenderMap[selectedShippingMethodCode];
        if (!render) {
            return null;
        }

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
