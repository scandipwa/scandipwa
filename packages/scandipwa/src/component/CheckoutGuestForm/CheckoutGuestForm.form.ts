/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { FieldType } from 'Component/Field/Field.config';
import { FieldContainerProps } from 'Component/Field/Field.type';
import { validatePassword } from 'Util/Validator';
import { ValidationInputType } from 'Util/Validator/Config';

import { CheckoutGuestFormEvents, CheckoutGuestFormProps } from './CheckoutGuestForm.type';

/**
 * Form for guest checkout
 * @param props
 * @param events
 * @returns {[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean, inputType: string}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *, 'aria-label': *}, events: {onChange}}, ...[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean, inputType: string}, label: *, type: string, attr: {name: string, placeholder: *, 'aria-label': *}, events: {onChange}}]|*[]]}
 * @namespace Component/CheckoutGuestForm/Form/checkoutGuestForm
 */
export const checkoutGuestForm = (
    props: CheckoutGuestFormProps,
    events: CheckoutGuestFormEvents,
): Partial<FieldContainerProps>[] => {
    const {
        emailValue, range, isCreateUser, minimumPasswordCharacter,
    } = props;
    const { handleEmailInput, handlePasswordInput } = events;

    return [
        {
            type: FieldType.EMAIL,
            label: __('Email'),
            attr: {
                name: 'guest_email',
                placeholder: __('Your email'),
                defaultValue: emailValue,
                'aria-label': __('Your email'),
                autoComplete: 'email',
            },
            events: {
                onChange: handleEmailInput,
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                inputType: ValidationInputType.EMAIL,
                isRequired: true,
            },
        },
        ...(isCreateUser ? [{
            type: FieldType.PASSWORD,
            label: __('Create Password'),
            attr: {
                name: 'guest_password',
                placeholder: __('Create Password'),
                'aria-label': __('Create Password'),
            },
            addRequiredTag: true,
            events: {
                onChange: handlePasswordInput,
            },
            validateOn: ['onChange'],
            validationRule: {
                inputType: ValidationInputType.PASSWORD,
                isRequired: true,
                match: (value: string) => validatePassword(value, range, minimumPasswordCharacter),
            },
        }] : []),
    ];
};

export default checkoutGuestForm;
