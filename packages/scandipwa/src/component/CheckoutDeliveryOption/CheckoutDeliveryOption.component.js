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

import {
    DISPLAY_CART_TAX_IN_SHIPPING_BOTH,
    DISPLAY_CART_TAX_IN_SHIPPING_EXL_TAX
} from 'Route/CartPage/CartPage.config';
import { shippingMethodType } from 'Type/Checkout';
import { TotalsType } from 'Type/MiniCart';
import { formatPrice } from 'Util/Price';

import './CheckoutDeliveryOption.style';

/** @namespace Component/CheckoutDeliveryOption/Component */
export class CheckoutDeliveryOption extends PureComponent {
    static propTypes = {
        option: shippingMethodType.isRequired,
        onClick: PropTypes.func.isRequired,
        isSelected: PropTypes.bool,
        totals: TotalsType.isRequired
    };

    static defaultProps = {
        isSelected: false
    };

    onClick = () => {
        const {
            onClick,
            option
        } = this.props;

        onClick(option);
    };

    getOptionPrice() {
        const {
            option: {
                price_incl_tax,
                price_excl_tax
            },
            totals: {
                cart_display_config: {
                    display_tax_in_shipping_amount
                } = {},
                quote_currency_code
            }
        } = this.props;

        if (display_tax_in_shipping_amount === DISPLAY_CART_TAX_IN_SHIPPING_EXL_TAX) {
            return formatPrice(price_excl_tax, quote_currency_code);
        }

        return formatPrice(price_incl_tax, quote_currency_code);
    }

    renderOptionSubPrice() {
        const {
            option: {
                price_excl_tax
            },
            totals: {
                cart_display_config: {
                    display_tax_in_shipping_amount
                } = {},
                quote_currency_code
            }
        } = this.props;

        if (display_tax_in_shipping_amount === DISPLAY_CART_TAX_IN_SHIPPING_BOTH) {
            return (
                <span block="CheckoutDeliveryOption" elem="SubPrice">
                    { __('Excl. tax: ') }
                    { formatPrice(price_excl_tax, quote_currency_code) }
                </span>
            );
        }

        return null;
    }

    renderPrice() {
        return (
            <strong>
                { ` - ${ this.getOptionPrice() }` }
                { this.renderOptionSubPrice() }
            </strong>
        );
    }

    renderRow() {
        const {
            option: {
                carrier_title,
                method_title
            }
        } = this.props;

        return (
            <div block="CheckoutDeliveryOption" elem="Row">
                <span>
                    { __('Carrier method: ') }
                    <strong>{ carrier_title }</strong>
                </span>
                <br />
                <span>
                    { __('Rate: ') }
                    <strong>{ method_title }</strong>
                </span>
                { this.renderPrice() }
            </div>
        );
    }

    render() {
        const {
            isSelected
        } = this.props;

        return (
            <li block="CheckoutDeliveryOption">
                <button
                  block="CheckoutDeliveryOption"
                  mods={ { isSelected } }
                  elem="Button"
                  onClick={ this.onClick }
                  type="button"
                >
                    { this.renderRow() }
                </button>
            </li>
        );
    }
}

export default CheckoutDeliveryOption;
