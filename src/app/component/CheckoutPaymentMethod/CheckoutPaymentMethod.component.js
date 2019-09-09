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

export default class CheckoutPaymentMethod extends PureComponent {
    static propTypes = {
        method: PropTypes.object.isRequired,
        handlePaymentMethodChange: PropTypes.func.isRequired,
        isChecked: PropTypes.bool.isRequired
    };

    handlePaymentMethodChange = () => {
        const { method, handlePaymentMethodChange } = this.props;
        handlePaymentMethodChange(method);
    };

    render() {
        const {
            isChecked,
            method: { code, title } = {}
        } = this.props;

        return (
            <tr key={ code } onClick={ this.handlePaymentMethodChange }>
                <td>
                    <Field
                      id={ code }
                      type="radio"
                      name={ code }
                      value={ code }
                      checked={ isChecked }
                      onChange={ this.handlePaymentMethodChange }
                    />
                </td>
                <td>{ title }</td>
            </tr>
        );
    }
}
