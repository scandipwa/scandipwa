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

    handlePaymentMethodChange(method) {
        const { onSelectPaymentMethod } = this.props;
        onSelectPaymentMethod(method);
        this.setState({ paymentMethod: method });
    }

    renderPaymentMethod(method) {
        const { title, code } = method;
        const { paymentMethod: { code: paymentMethodCode } } = this.state;

        return (
            <tr key={ code } onClick={ () => this.handlePaymentMethodChange(method) }>
                <td>
                    <Field
                      id={ code }
                      type="radio"
                      name={ code }
                      value={ code }
                      checked={ paymentMethodCode }
                      onChange={ () => this.handlePaymentMethodChange(method) }
                    />
                </td>
                <td>{ title }</td>
            </tr>
        );
    }

    render() {
        const { paymentMethods } = this.props;

        return (
            <fieldset block="CheckoutStep" elem="legend">
                <legend>{ __('Payment Method') }</legend>
                <table block="CheckoutStep" elem="OptionsTable">
                    <tbody>
                        { paymentMethods.map(method => this.renderPaymentMethod(method)) }
                    </tbody>
                </table>
            </fieldset>
        );
    }
}

CheckoutPaymentMethods.propTypes = {
    paymentMethods: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelectPaymentMethod: PropTypes.func.isRequired
};

export default CheckoutPaymentMethods;
