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

import { shippingMethodType } from 'Type/Checkout';
import { formatPrice } from 'Util/Price';

import { DELIVERY_METHOD_UNAVAILABLE_MESSAGE } from './CheckoutDeliveryOption.config';

import './CheckoutDeliveryOption.style';

/** @namespace Component/CheckoutDeliveryOption/Component */
export class CheckoutDeliveryOption extends PureComponent {
    static propTypes = {
        option: shippingMethodType.isRequired,
        currency: PropTypes.string.isRequired,
        isSelected: PropTypes.bool,
        optionPrice: PropTypes.number,
        optionSubPrice: PropTypes.number,
        onOptionClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        isSelected: false,
        optionPrice: 0,
        optionSubPrice: null
    };

    getOptionPrice() {
        const {
            currency,
            optionPrice
        } = this.props;

        return formatPrice(optionPrice, currency);
    }

    renderOptionSubPrice() {
        const {
            currency,
            optionSubPrice
        } = this.props;

        if (!optionSubPrice) {
            return null;
        }

        return (
            <span block="CheckoutDeliveryOption" elem="SubPrice">
                { __('Excl. tax: ') }
                { formatPrice(optionSubPrice, currency) }
            </span>
        );
    }

    renderPrice() {
        const {
            option: {
                available
            } = {}
        } = this.props;

        if (!available) {
            return null;
        }

        return (
            <strong>
                { ` - ${ this.getOptionPrice() }` }
                { this.renderOptionSubPrice() }
            </strong>
        );
    }

    renderRate() {
        const {
            option: {
                method_title,
                available
            } = {}
        } = this.props;

        if (!available) {
            return null;
        }

        return (
            <span>
                { __('Rate: ') }
                <strong>{ method_title }</strong>
            </span>
        );
    }

    renderAvailabilityMessage() {
        const {
            option: {
                available
            } = {}
        } = this.props;

        if (available) {
            return null;
        }

        return (
            <div
              block="CheckoutDeliveryOption"
              elem="Message"
            >
                { DELIVERY_METHOD_UNAVAILABLE_MESSAGE }
            </div>
        );
    }

    renderRow() {
        const {
            option: {
                carrier_title
            } = {}
        } = this.props;

        return (
            <div block="CheckoutDeliveryOption" elem="Row">
                <span>
                    { __('Carrier method: ') }
                    <strong>{ carrier_title }</strong>
                </span>
                <br />
                { this.renderRate() }
                { this.renderPrice() }
                { this.renderAvailabilityMessage() }
            </div>
        );
    }

    render() {
        const {
            isSelected,
            onOptionClick,
            option: {
                available
            } = {}
        } = this.props;

        return (
            <li block="CheckoutDeliveryOption">
                <button
                  block="CheckoutDeliveryOption"
                  mods={ { isSelected, isDisabled: !available } }
                  elem="Button"
                  onClick={ onOptionClick }
                  type="button"
                >
                    { this.renderRow() }
                </button>
            </li>
        );
    }
}

export default CheckoutDeliveryOption;
