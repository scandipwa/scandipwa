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

import { FieldType } from 'Component/Field/Field.config';
import { ValidationInputType } from 'Util/Validator/Config';

/**
 * Form for contacts
 * @namespace Component/ContactForm/Form/contactForm
 */
export const contactForm = () => [
    {
        type: FieldType.text,
        label: __('Name'),
        attr: {
            name: 'name',
            placeholder: __('Your name')
        },
        addRequiredTag: true,
        validateOn: [ 'onChange' ],
        validationRule: {
            isRequired: true
        }
    },
    {
        type: FieldType.email,
        label: __('Email'),
        attr: {
            name: 'email',
            placeholder: __('Your email')
        },
        addRequiredTag: true,
        validateOn: [ 'onChange' ],
        validationRule: {
            inputType: ValidationInputType.email,
            isRequired: true
        }
    },
    {
        type: FieldType.text,
        label: __('Phone number'),
        attr: {
            name: 'telephone',
            placeholder: __('Phone number')
        },
        validateOn: [ 'onChange' ],
        validationRule: {
            inputType: ValidationInputType.phone
        }
    },
    {
        type: FieldType.textarea,
        label: __('What\'s on your mind?'),
        attr: {
            name: 'message',
            placeholder: __('Message')
        },
        addRequiredTag: true,
        validateOn: [ 'onChange' ],
        validationRule: {
            isRequired: true
        }
    }
];

export default contactForm;
