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
import CheckoutPaymentMethod from 'Component/CheckoutPaymentMethod/CheckoutPaymentMethod.component';

export default class CheckoutPaymentMethods extends PureComponent {
    static propTypes = {
        paymentMethods: PropTypes.arrayOf(PropTypes.object).isRequired,
        onSelectPaymentMethod: PropTypes.func.isRequired
    };

    state = { paymentMethod: '' };

    handlePaymentMethodChange = (method) => {
        const { onSelectPaymentMethod } = this.props;
        onSelectPaymentMethod(method);
        this.setState({ paymentMethod: method });
    };

    renderPaymentMethod(method) {
        const { code } = method;
        const { paymentMethod: { code: paymentMethodCode } } = this.state;

        return (
            <CheckoutPaymentMethod
              key={ code }
              method={ method }
              isChecked={ paymentMethodCode === code }
              handlePaymentMethodChange={ this.handlePaymentMethodChange }
            />
        );
    }

    render() {
        const { paymentMethods } = this.props;

        return (
            <fieldset block="CheckoutStep" elem="legend">
                <legend block="CheckoutPage" elem="Heading">{ __('Payment Method') }</legend>
                <table block="CheckoutStep" elem="OptionsTable">
                    <tbody>
                        { paymentMethods.map(method => this.renderPaymentMethod(method)) }
                    </tbody>
                </table>
            </fieldset>
        );
    }
}
