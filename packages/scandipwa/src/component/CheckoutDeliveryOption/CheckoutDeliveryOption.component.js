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
import { createRef, PureComponent } from 'react';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import { ShippingMethodType } from 'Type/Checkout.type';
import { formatPrice } from 'Util/Price';

import { DELIVERY_METHOD_UNAVAILABLE_MESSAGE } from './CheckoutDeliveryOption.config';

import './CheckoutDeliveryOption.style';

/** @namespace Component/CheckoutDeliveryOption/Component */
export class CheckoutDeliveryOption extends PureComponent {
    static propTypes = {
        option: ShippingMethodType.isRequired,
        currency: PropTypes.string.isRequired,
        isSelected: PropTypes.bool,
        optionPrice: PropTypes.number,
        optionSubPrice: PropTypes.number,
        onOptionClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        isSelected: false,
        optionPrice: 0,
        optionSubPrice: 0
    };

    state = { isOverflowed: false };

    rowRef = createRef();

    subPriceRef = createRef();

    componentDidMount() {
        if (this.rowRef.current && this.subPriceRef.current) {
            const rowLeft = this.rowRef.current.getBoundingClientRect().left;
            const SubPriceLeft = this.subPriceRef.current.getBoundingClientRect().left;

            if (rowLeft > SubPriceLeft) {
                this.setState({ isOverflowed: true });
            }
        }
    }

    renderSubPrice() {
        const {
            currency,
            optionSubPrice
        } = this.props;

        const { isOverflowed } = this.state;

        if (!optionSubPrice) {
            return null;
        }

        return (
            <span
              block="CheckoutDeliveryOption"
              elem="SubPrice"
              mods={ { isOverflowed } }
              ref={ this.subPriceRef }
            >
                { __('Excl. tax: %s', formatPrice(optionSubPrice, currency)) }
            </span>
        );
    }

    getOptionPrice() {
        const {
            currency,
            optionPrice
        } = this.props;

        return formatPrice(optionPrice, currency);
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
                { this.renderSubPrice() }
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
            <div
              block="CheckoutDeliveryOption"
              elem="Row"
              ref={ this.rowRef }
            >
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
            option: {
                carrier_title,
                available
            } = {},
            onOptionClick,
            isSelected
        } = this.props;

        return (
            <li
              block="CheckoutDeliveryOption"
              mods={ {
                  isDisabled: !available,
                  isActive: isSelected,
                  isHoverExcluded: !available || isSelected
              } }
            >
                <button
                  block="CheckoutDeliveryOption"
                  mods={ { isDisabled: !available } }
                  elem="Button"
                  type="button"
                  onClick={ onOptionClick }
                  disabled={ !available }
                >
                    <Field
                      type={ FIELD_TYPE.radio }
                      attr={ {
                          id: `option-${ carrier_title }`,
                          name: `option-${ carrier_title }`,
                          checked: !!isSelected
                      } }
                    />
                    { this.renderRow() }
                </button>
            </li>
        );
    }
}

export default CheckoutDeliveryOption;
