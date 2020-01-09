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
import './CheckoutGuestForm.style';
import FormPortal from 'Component/FormPortal';
import FieldForm from 'Component/FieldForm/FieldForm.component';

class CheckoutGuestForm extends FieldForm {
    static propTypes = {
        formId: PropTypes.string.isRequired,
        handleEmailInput: PropTypes.func.isRequired
    };

    get fieldMap() {
        const { handleEmailInput, formId } = this.props;

        return {
            guest_email: {
                form: formId,
                label: __('Email'),
                validation: ['notEmpty', 'email'],
                onChange: handleEmailInput,
                skipValue: true
            }
        };
    }

    renderHeading() {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Enter personal information') }
            </h2>
        );
    }

    render() {
        const { formId } = this.props;

        return (
            <div
              block="CheckoutGuestForm"
              mix={ { block: 'FieldForm' } }
            >
                { this.renderHeading() }
                <FormPortal
                  id={ formId }
                  name="CheckoutGuestForm"
                >
                    { this.renderFields() }
                </FormPortal>
            </div>
        );
    }
}

export default CheckoutGuestForm;
