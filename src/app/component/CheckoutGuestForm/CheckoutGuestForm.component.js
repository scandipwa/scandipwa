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
import Field from 'Component/Field';
import FieldForm from 'Component/FieldForm/FieldForm.component';

class CheckoutGuestForm extends FieldForm {
    static propTypes = {
        formId: PropTypes.string.isRequired,
        handleEmailInput: PropTypes.func.isRequired,
        handleCreateUser: PropTypes.func.isRequired
    };

    get fieldMap() {
        const {
            handleEmailInput,
            handlePasswordInput,
            formId,
            isCreateUser
        } = this.props;

        const fields = {
            guest_email: {
                form: formId,
                label: __('Email'),
                validation: ['notEmpty', 'email'],
                onChange: handleEmailInput,
                skipValue: true
            }
        };

        if (isCreateUser) {
            fields.guest_password = {
                form: formId,
                label: __('Create Password'),
                onChange: handlePasswordInput,
                validation: ['notEmpty', 'password'],
                type: 'password',
                skipValue: true
            };
        }

        return fields;
    }

    renderHeading() {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Enter personal information') }
            </h2>
        );
    }

    render() {
        const { formId, isCreateUser, handleCreateUser } = this.props;

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
                    <Field
                      type="checkbox"
                      label={ __('Create free account and keep track of your orders') }
                      id="guest_create_user"
                      name="guest_create_user"
                      value={ isCreateUser }
                      skipValue
                      onChange={ handleCreateUser }
                    />
                </FormPortal>
            </div>
        );
    }
}

export default CheckoutGuestForm;
