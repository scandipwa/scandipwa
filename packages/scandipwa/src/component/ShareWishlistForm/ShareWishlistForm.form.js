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

import FIELD_TYPE from 'Component/PureForm/Field/Field.config';

export const shareWishlistForm = () => [
    {
        type: FIELD_TYPE.email,
        label: __('Email addresses, separated by commas'),
        attr: {
            name: 'emails',
            placeholder: __('Email addresses, separated by commas'),
            'aria-label': __('Email address')
        },
        validateOn: ['onChange'],
        validationRule: {
            isRequired: true
        }
    },
    {
        label: __('Message'),
        type: FIELD_TYPE.textarea,
        attr: {
            name: 'message',
            placeholder: __('Message'),
            'aria-label': __('Message')
        }
    }
];

export default shareWishlistForm;
