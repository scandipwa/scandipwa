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

import './CheckoutGuestForm.style';

import PropTypes from 'prop-types';

import Field from 'Component/Field';
import FieldForm from 'Component/FieldForm/FieldForm.component';
import FormPortal from 'Component/FormPortal';

export class CheckoutGuestForm extends FieldForm {
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

    renderCreateUserCheckbox() {
        const {
            isCreateUser,
            handleCreateUser,
            isEmailConfirmationRequired
        } = this.props;

        // if email confirmation required and user is not logged in
        // the user is 100% not logged in (we are in the guest form)
        // do not show the checkbox to create the user account
        if (isEmailConfirmationRequired) {
            return null;
        }

        return (
            <Field
              type="checkbox"
              label={ __('Create free account and keep track of your orders') }
              id="guest_create_user"
              name="guest_create_user"
              value={ isCreateUser }
              skipValue
              onChange={ handleCreateUser }
            />
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
                    { this.renderCreateUserCheckbox() }
                </FormPortal>
            </div>
        );
    }
}

export default CheckoutGuestForm;
