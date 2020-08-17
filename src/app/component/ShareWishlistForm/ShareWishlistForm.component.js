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

import FieldForm from 'Component/FieldForm';

/** @namespace Component/ShareWishlistForm/Component */
export class ShareWishlistForm extends FieldForm {
    static propTypes = {
        onSave: PropTypes.func.isRequired
    };

    onFormSuccess = (fields) => {
        const { onSave } = this.props;
        onSave(fields);
    };

    get fieldMap() {
        return {
            emails: {
                label: __('Email addresses, separated by commas'),
                validation: ['notEmpty', 'emails']
            },
            message: {
                type: 'textarea',
                label: __('Message')
            }
        };
    }

    renderActions() {
        return (
            <button type="submit" block="Button">
                { __('Share Wishlist') }
            </button>
        );
    }
}

export default ShareWishlistForm;
