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
import { ValidationInputType } from 'Util/Validator/Config';

/**
 * Form for contacts
 * @namespace Component/ContactForm/Form/contactForm
 */
export const contactForm = (): Partial<FieldContainerProps>[] => [
    {
        type: FieldType.TEXT,
        label: __('Name'),
        attr: {
            name: 'name',
            placeholder: __('Your name'),
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            isRequired: true,
        },
    },
    {
        type: FieldType.EMAIL,
        label: __('Email'),
        attr: {
            name: 'email',
            placeholder: __('Your email'),
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            inputType: ValidationInputType.EMAIL,
            isRequired: true,
        },
    },
    {
        type: FieldType.TEXT,
        label: __('Phone number'),
        attr: {
            name: 'telephone',
            placeholder: __('Phone number'),
        },
        validateOn: ['onChange'],
        validationRule: {
            inputType: ValidationInputType.PHONE,
        },
    },
    {
        type: FieldType.TEXTAREA,
        label: __('What\'s on your mind?'),
        attr: {
            name: 'message',
            placeholder: __('Message'),
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            isRequired: true,
        },
    },
];

export default contactForm;
