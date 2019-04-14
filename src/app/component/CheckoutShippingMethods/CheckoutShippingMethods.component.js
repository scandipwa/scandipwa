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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from 'Component/Field';

/**
 * Checkout shipping method selector component
 */
class CheckoutShippingMethods extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shippingMethod: ''
        };
    }

    handleShippingMethodChange = (method) => {
        const { onSelectShippingMethod } = this.props;
        const { code } = method;
        onSelectShippingMethod(method);
        this.setState({ shippingMethod: code });
    };

    /**
     * Render single row with shipping method
     * @param identifier
     * @param value
     * @returns {*}
     */
    renderShippingMethod(method) {
        const {
            price_incl_tax,
            method_title,
            carrier_title,
            method_code
        } = method;

        return (
            <tr key={ method_code } onClick={ () => this.handleShippingMethodChange(method) }>
                <td>
                    <Field
                      id={ method_code }
                      type="radio"
                      block="shippingMethodTable"
                      name="shipping_method"
                      elem={ method_code }
                      value={ method_code }
                      checked={ method_code }
                      onChange={ () => this.handleShippingMethodChange(method) }
                    />
                </td>
                <td>{ price_incl_tax }</td>
                <td>{ method_title }</td>
                <td>{ carrier_title }</td>
            </tr>
        );
    }

    /**
     * Render shipping methods table
     * @returns {*}
     */
    render() {
        const { shippingMethods } = this.props;

        console.log(shippingMethods);

        return (
            <fieldset block="CheckoutStep" elem="legend">
                <legend>Shipping Method</legend>
                <table block="CheckoutStep" elem="OptionsTable">
                    <tbody>
                        { shippingMethods.map(method => this.renderShippingMethod(method)) }
                    </tbody>
                </table>
            </fieldset>
        );
    }
}

CheckoutShippingMethods.propTypes = {
    shippingMethods: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelectShippingMethod: PropTypes.func.isRequired
};

export default CheckoutShippingMethods;
