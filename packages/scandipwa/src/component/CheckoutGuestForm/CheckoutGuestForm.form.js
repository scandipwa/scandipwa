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

import FIELD_TYPE from 'Component/Field/Field.config';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

/**
 * Form for guest checkout
 * @param props
 * @param events
 * @returns {[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean, inputType: string}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *, 'aria-label': *}, events: {onChange}}, ...[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean, inputType: string}, label: *, type: string, attr: {name: string, placeholder: *, 'aria-label': *}, events: {onChange}}]|*[]]}
 * @namespace Component/CheckoutGuestForm/Form/checkoutGuestForm
 */
export const checkoutGuestForm = (props, events) => {
    const { emailValue, isCreateUser } = props;
    const { handleEmailInput, handlePasswordInput } = events;

    return [
        {
            type: FIELD_TYPE.email,
            label: __('Email'),
            attr: {
                name: 'guest_email',
                placeholder: __('Your email'),
                defaultValue: emailValue,
                'aria-label': __('Your email'),
                autocomplete: 'email'
            },
            events: {
                onChange: handleEmailInput
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                inputType: VALIDATION_INPUT_TYPE.email,
                isRequired: true
            }
        },
        ...(isCreateUser ? [{
            type: FIELD_TYPE.password,
            label: __('Create Password'),
            attr: {
                name: 'guest_password',
                placeholder: __('Create Password'),
                'aria-label': __('Create Password')
            },
            addRequiredTag: true,
            events: {
                onChange: handlePasswordInput
            },
            validateOn: ['onChange'],
            validationRule: {
                inputType: VALIDATION_INPUT_TYPE.password,
                isRequired: true
            }
        }] : [])
    ];
};

export default checkoutGuestForm;
