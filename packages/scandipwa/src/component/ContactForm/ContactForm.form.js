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
 * Form for contacts
 * @namespace Component/ContactForm/Form/contactForm
 */
export const contactForm = () => [
    {
        type: FIELD_TYPE.text,
        label: __('Name'),
        attr: {
            name: 'name',
            placeholder: __('Your name')
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            isRequired: true
        }
    },
    {
        type: FIELD_TYPE.email,
        label: __('Email'),
        attr: {
            name: 'email',
            placeholder: __('Your email')
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            inputType: VALIDATION_INPUT_TYPE.email,
            isRequired: true
        }
    },
    {
        type: FIELD_TYPE.text,
        label: __('Phone number'),
        attr: {
            name: 'telephone',
            placeholder: __('Phone number')
        },
        validateOn: ['onChange'],
        validationRule: {
            inputType: VALIDATION_INPUT_TYPE.phone
        }
    },
    {
        type: FIELD_TYPE.textarea,
        label: __('What\'s on your mind?'),
        attr: {
            name: 'message',
            placeholder: __('Message')
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            isRequired: true
        }
    }
];

export default contactForm;
