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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { FREE_PAYMENT } from 'Component/CheckoutPayments/CheckoutPayments.config';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import { PaymentMethodType } from 'Type/Checkout.type';

import './CheckoutPayment.style';

/** @namespace Component/CheckoutPayment/Component */
export class CheckoutPayment extends PureComponent {
    static propTypes = {
        method: PaymentMethodType.isRequired,
        onClick: PropTypes.func.isRequired,
        isSelected: PropTypes.bool
    };

    static defaultProps = {
        isSelected: false
    };

    onClick = this.onClick.bind(this);

    onClick() {
        const {
            onClick,
            method
        } = this.props;

        onClick(method);
    }

    renderFreePayment(title) {
        return (
            <li block="CheckoutPayment">
                { title }
            </li>
        );
    }

    render() {
        const {
            onClick,
            isSelected,
            method: { code, title }
        } = this.props;

        if (code === FREE_PAYMENT) {
            onClick({ code });

            return this.renderFreePayment(title);
        }

        // disable checkbox in order to skip direct clicks on checkbox and handle clicks on entire button instead
        return (
            <li block="CheckoutPayment">
                <button
                  block="CheckoutPayment"
                  mods={ { isSelected } }
                  elem="Button"
                  type="button"
                  onClick={ this.onClick }
                >
                    <Field
                      type={ FIELD_TYPE.checkbox }
                      attr={ {
                          id: `option-${ title }`,
                          name: `option-${ title }`,
                          checked: isSelected
                      } }
                      label={ title }
                      isDisabled={ false }
                    />
                </button>
            </li>
        );
    }
}

export default CheckoutPayment;
