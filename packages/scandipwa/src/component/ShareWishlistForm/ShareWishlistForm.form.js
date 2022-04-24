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
 * Returns fields for share wishlist form
 * @returns {Object}
 * @namespace Component/ShareWishlistForm/Form/shareWishlistForm
 */
export const shareWishlistForm = () => [
    {
        type: FieldType.EMAIL,
        label: __('Email addresses, separated by commas'),
        attr: {
            name: 'emails',
            placeholder: __('Email addresses, separated by commas'),
            'aria-label': __('Email address')
        },
        validateOn: [ 'onChange' ],
        validationRule: {
            inputType: ValidationInputType.emailList,
            isRequired: true
        },
        addRequiredTag: true
    },
    {
        label: __('Message'),
        type: FieldType.TEXTAREA,
        attr: {
            name: 'message',
            placeholder: __('Message'),
            'aria-label': __('Message')
        }
    }
];

export default shareWishlistForm;
