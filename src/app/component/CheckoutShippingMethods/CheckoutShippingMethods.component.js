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
        onSelectShippingMethod(method);
        this.setState({ shippingMethod: method });
    };

    /**
     * Render single row with shipping method
     * @param identifier
     * @param value
     * @returns {*}
     */
    renderShippingMethod(identifier, value) {
        const { shippingMethod } = this.state;
        const {
            price,
            title,
            carrier_title
        } = value;

        return (
            <tr key={ identifier } onClick={ () => this.handleShippingMethodChange(identifier) }>
                <td>
                    <Field
                      id={ identifier }
                      type="radio"
                      block="shippingMethodTable"
                      elem={ identifier }
                      value={ identifier }
                      checked={ shippingMethod }
                      onChange={ identifier => this.handleShippingMethodChange(identifier) }
                    />
                </td>
                <td>{ price }</td>
                <td>{ title }</td>
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

        return (
            <fieldset block="CheckoutStep" elem="legend">
                <legend>Shipping Method</legend>
                <table block="CheckoutStep" elem="OptionsTable">
                    <tbody>
                        { Object
                            .keys(shippingMethods)
                            .map(code => this.renderShippingMethod(code, shippingMethods[code])) }
                    </tbody>
                </table>
            </fieldset>
        );
    }
}

CheckoutShippingMethods.propTypes = {
    shippingMethods: PropTypes.object.isRequired,
    onSelectShippingMethod: PropTypes.func.isRequired
};

export default CheckoutShippingMethods;
