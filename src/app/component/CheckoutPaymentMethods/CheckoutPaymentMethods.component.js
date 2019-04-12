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

class CheckoutPaymentMethods extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paymentMethod: ''
        };
    }

    handlePaymentMethodChange = (method) => {
        const { onSelectPaymentMethod } = this.props;
        onSelectPaymentMethod(method);
        this.setState({ paymentMethod: method });
    };

    renderPaymentMethod(title) {
        const { paymentMethod } = this.state;
        const { paymentMethods } = this.props;
        const currentMethod = paymentMethods[title];

        return (
            <tr key={ title } onClick={ () => this.handlePaymentMethodChange(title) }>
                <td>
                    <Field
                      id={ title }
                      type="radio"
                      block="paymentMethodTable"
                      elem={ title }
                      value={ title }
                      checked={ paymentMethod }
                      onChange={ title => this.handlePaymentMethodChange(title) }
                    />
                </td>
                <td>{ currentMethod.title }</td>
            </tr>
        );
    }

    render() {
        const { paymentMethods } = this.props;

        return (
            <fieldset block="CheckoutStep" elem="legend">
                <legend>Payment Method</legend>
                <table block="CheckoutStep" elem="OptionsTable">
                    <tbody>
                        { Object
                            .keys(paymentMethods)
                            .map(title => this.renderPaymentMethod(title)) }
                    </tbody>
                </table>
            </fieldset>
        );
    }
}

CheckoutPaymentMethods.propTypes = {
    paymentMethods: PropTypes.object.isRequired,
    onSelectPaymentMethod: PropTypes.func.isRequired
};

export default CheckoutPaymentMethods;
