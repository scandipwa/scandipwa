/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { formatPrice } from 'Util/Price';

import { DELIVERY_METHOD_UNAVAILABLE_MESSAGE } from './CheckoutDeliveryOption.config';
import { CheckoutDeliveryOptionComponentProps } from './CheckoutDeliveryOption.type';

import './CheckoutDeliveryOption.style';

/** @namespace Component/CheckoutDeliveryOption/Component */
export class CheckoutDeliveryOptionComponent extends PureComponent<CheckoutDeliveryOptionComponentProps> {
    static defaultProps: Partial<CheckoutDeliveryOptionComponentProps> = {
        isSelected: false,
        optionPrice: 0,
        optionSubPrice: 0,
    };

    renderSubPrice(): ReactElement {
        const {
            currency,
            optionSubPrice,
        } = this.props;

        if (!optionSubPrice) {
            return null;
        }

        return (
            <div
              block="CheckoutDeliveryOption"
              elem="SubPrice"
            >
                { __('Excl. tax: %s', formatPrice(optionSubPrice, currency as GQLCurrencyEnum)) }
            </div>
        );
    }

    getOptionPrice(): string {
        const {
            currency,
            optionPrice,
        } = this.props;

        return formatPrice(optionPrice, currency as GQLCurrencyEnum);
    }

    renderPrice(): ReactElement {
        const {
            option: {
                available,
            } = {},
        } = this.props;

        if (!available) {
            return null;
        }

        return (
            <strong>
                { ` - ${ this.getOptionPrice() }` }
            </strong>
        );
    }

    renderRate(): ReactElement {
        const {
            option: {
                method_title,
                available,
            } = {},
        } = this.props;

        if (!available) {
            return null;
        }

        return (
            <div>
                { __('Rate: ') }
                <strong>{ method_title }</strong>
                { this.renderPrice() }
            </div>
        );
    }

    renderAvailabilityMessage(): ReactElement {
        const {
            option: {
                available,
            } = {},
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

    renderRow(): ReactElement {
        const {
            option: {
                carrier_title,
                available,
            } = {},
        } = this.props;

        return (
            <div
              block="CheckoutDeliveryOption"
              elem="Row"
            >
                <div block="CheckoutDeliveryOption" elem="Span" mods={ { isDisabled: !available } }>
                    { __('Carrier method: ') }
                    <strong>{ carrier_title }</strong>
                </div>
                { this.renderRate() }
                { this.renderSubPrice() }
                { this.renderAvailabilityMessage() }
            </div>
        );
    }

    render(): ReactElement {
        const {
            option: {
                carrier_title,
                available,
            } = {},
            onOptionClick,
            isSelected,
        } = this.props;

        return (
            <li
              block="CheckoutDeliveryOption"
              mods={ {
                  isDisabled: !available,
                  isActive: isSelected,
                  isHoverExcluded: !available || isSelected,
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
                      type={ FieldType.RADIO }
                      attr={ {
                          id: `option-${ carrier_title }`,
                          name: `option-${ carrier_title }`,
                          checked: !!isSelected,
                      } }
                    />
                    { this.renderRow() }
                </button>
            </li>
        );
    }
}

export default CheckoutDeliveryOptionComponent;
