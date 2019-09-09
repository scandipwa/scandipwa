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
import Loader from 'Component/Loader';
import './CheckoutShippingMethods.style';
import CheckoutShippingMethod from 'Component/CheckoutShippingMethod/CheckoutShippingMethod.component';

/**
 * Checkout shipping method selector component
 */
export default class CheckoutShippingMethods extends PureComponent {
    static propTypes = {
        shippingMethods: PropTypes.arrayOf(PropTypes.object).isRequired,
        onSelectShippingMethod: PropTypes.func.isRequired,
        loadingShippingMethods: PropTypes.bool.isRequired
    };

    state = { activeMethod: '' };

    handleShippingMethodChange = (method) => {
        const { method_code } = method;
        const { onSelectShippingMethod } = this.props;
        this.setState({ activeMethod: method_code });
        onSelectShippingMethod(method);
    };

    /**
     * Render single row with shipping method
     * @param identifier
     * @param value
     * @returns {*}
     */
    renderShippingMethod(method) {
        const { activeMethod } = this.state;
        const { method_code } = method;

        return (
            <CheckoutShippingMethod
              isChecked={ method_code === activeMethod }
              method={ method }
              handleShippingMethodChange={ this.handleShippingMethodChange }
            />
        );
    }

    /**
     * Render shipping methods table
     * @returns {*}
     */
    render() {
        const { shippingMethods, loadingShippingMethods } = this.props;
        const areShippingMethodsAvailable = Object.keys(shippingMethods).length;

        return (
            <fieldset block="CheckoutShippingMethods">
                <legend
                  block="CheckoutPage"
                  elem="Heading"
                >
                    { __('Shipping Method') }
                </legend>
                <div>
                    <Loader isLoading={ loadingShippingMethods } />
                    { areShippingMethodsAvailable
                        ? (
                            <table>
                                <tbody>
                                    { shippingMethods.map(method => this.renderShippingMethod(method)) }
                                </tbody>
                            </table>
                        )
                        : (
                            <p>{ __('Please enter shipping address information first!') }</p>
                        ) }
                </div>
            </fieldset>
        );
    }
}
