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
import Field from 'Component/Field';

const shippingMethods = {
    freeshipping_freeshipping: {
        title: "Economy",
        carrier_title: "Free Ground Shipping",
        price: "0.00",
    },
    flatrate_flatrate: {
        title: "Flatrate",
        carrier_title: "Flatrate shipping",
        price: "10.00",
    },
    ups_11: {
        title: "UPS Standard",
        carrier_title: "United Parcel Service",
        price: "15.00",
    }
};

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
        this.props.onSelectShippingMethod(method);
        this.setState({shippingMethod: method});
    };

    /**
     * Render single row with shipping method
     * @param identifier
     * @param value
     * @returns {*}
     */
    renderShippingMethod(identifier, value) {
        const { shippingMethod } = this.state;

        return (
            <tr key={ identifier } onClick={ e => this.handleShippingMethodChange(identifier) }>
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
                <td>{ value.price }</td>
                <td>{ value.title }</td>
                <td>{ value.carrier_title }</td>
            </tr>
        );
    }

    /**
     * Render shipping methods table
     * @returns {*}
     */
    render() {
        return (
            <fieldset block="CheckoutStep" elem="legend">
                <legend>Shipping Method</legend>
                <table block="CheckoutStep" elem="OptionsTable">
                    <tbody>
                    { Object.keys(shippingMethods).map((index) => {
                        return this.renderShippingMethod(index, shippingMethods[index]);
                    }) }
                    </tbody>
                </table>
            </fieldset>
        );
    }
}

export default CheckoutShippingMethods;
