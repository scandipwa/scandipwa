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

import CheckoutDeliveryOption from 'Component/CheckoutDeliveryOption';
import { StoreInPickUpCode } from 'Component/StoreInPickUp/StoreInPickUp.config';
import { ShippingMethod } from 'Query/Checkout.type';
import { ReactElement } from 'Type/Common.type';

import { CheckoutDeliveryOptionsComponent } from './CheckoutDeliveryOptions.type';

import './CheckoutDeliveryOptions.style';

/** @namespace Component/CheckoutDeliveryOptions/Component */
export class CheckoutDeliveryOptions extends PureComponent<CheckoutDeliveryOptionsComponent> {
    static defaultProps = {
        selectedShippingMethod: {}
    };

    shippingRenderMap: Record<string, () => ReactElement> = {
        [StoreInPickUpCode.METHOD_CODE]: this.handleSelectStoreInPickUp.bind(this)
    };

    renderHeading(): ReactElement {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Shipping method') }
            </h2>
        );
    }

    handleSelectStoreInPickUp(): ReactElement {
        const {
            handleSelectDeliveryMethod,
            isShippingMethodPreSelected
        } = this.props;

        if (!isShippingMethodPreSelected) {
            handleSelectDeliveryMethod();
        }

        return null;
    }

    renderDeliveryOption(option: ShippingMethod): ReactElement {
        const {
            selectShippingMethod,
            selectedShippingMethod: { method_code: selectedMethodCode = '' } = {}
        } = this.props;

        const { carrier_code, method_code } = option;
        const isSelected = selectedMethodCode === method_code;

        return (
            <CheckoutDeliveryOption
              key={ carrier_code }
              isSelected={ isSelected }
              option={ option }
              onClick={ selectShippingMethod }
            />
        );
    }

    renderNoDeliveryOptions(): ReactElement {
        return (
            <p block="CheckoutDeliveryOptions" elem="NoOptions">
                { __('There are no shipping methods available, try different address.') }
            </p>
        );
    }

    renderShippingMethods(): ReactElement {
        const { shippingMethods } = this.props;

        if (!shippingMethods.length) {
            return this.renderNoDeliveryOptions();
        }

        return shippingMethods.map(this.renderDeliveryOption.bind(this));
    }

    renderSelectedShippingMethod(): ReactElement {
        const { selectedShippingMethod: { method_code = '' } = {} } = this.props;
        const render = this.shippingRenderMap[method_code];

        if (!render) {
            return null;
        }

        return render();
    }

    render(): ReactElement {
        return (
            <div block="CheckoutDeliveryOptions">
                { this.renderHeading() }
                <ul>
                    { this.renderShippingMethods() }
                </ul>
                { this.renderSelectedShippingMethod() }
            </div>
        );
    }
}

export default CheckoutDeliveryOptions;
