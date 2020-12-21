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

import { paymentMethodType } from 'Type/Checkout';

import './CheckoutPayment.style';

/** @namespace Component/CheckoutPayment/Component */
export class CheckoutPayment extends PureComponent {
    static propTypes = {
        method: paymentMethodType.isRequired,
        onClick: PropTypes.func.isRequired,
        isSelected: PropTypes.bool
    };

    static defaultProps = {
        isSelected: false
    };

    onClick = () => {
        const {
            onClick,
            method
        } = this.props;

        onClick(method);
    };

    render() {
        const {
            isSelected,
            method: { title }
        } = this.props;

        return (
            <li block="CheckoutPayment">
                <button
                  block="CheckoutPayment"
                  mods={ { isSelected } }
                  elem="Button"
                  onClick={ this.onClick }
                  type="button"
                >
                    { title }
                </button>
            </li>
        );
    }
}

export default CheckoutPayment;
