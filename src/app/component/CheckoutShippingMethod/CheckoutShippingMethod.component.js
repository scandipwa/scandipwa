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
import PropTypes from 'prop-types';
import Field from 'Component/Field';

export default class CheckoutShippingMethod extends PureComponent {
    static propTypes = {
        method: PropTypes.shape({
            price_incl_tax: PropTypes.number,
            method_title: PropTypes.string,
            carrier_title: PropTypes.string,
            method_code: PropTypes.string
        }).isRequired,
        isChecked: PropTypes.bool.isRequired,
        handleShippingMethodChange: PropTypes.func.isRequired
    };

    handleShippingMethodChange = () => {
        const { method, handleShippingMethodChange } = this.props;
        handleShippingMethodChange(method);
    };

    render() {
        const {
            method: {
                price_incl_tax,
                method_title,
                carrier_title,
                method_code
            },
            isChecked
        } = this.props;

        return (
            <tr onClick={ this.handleShippingMethodChange }>
                <td>
                    <Field
                      id={ method_code }
                      name="shipping_method"
                      type="radio"
                      value={ method_code }
                      checked={ isChecked }
                      onChange={ this.handleShippingMethodChange }
                    />
                </td>
                <td
                  block="CheckoutShippingMethods"
                  elem="Information"
                >
                    { __('Shipping carrier method:') }
                    <strong>{ carrier_title }</strong>
                    { __(', price rate') }
                    <strong>{ method_title }</strong>
                </td>
                <td
                  block="CheckoutShippingMethods"
                  elem="Price"
                >
                    { `${price_incl_tax}$` }
                </td>
            </tr>
        );
    }
}
