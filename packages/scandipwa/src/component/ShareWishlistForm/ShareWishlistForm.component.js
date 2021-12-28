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
import transformToNameValuePair from 'Util/Form/Transform';

import shareWishlistForm from './ShareWishlistForm.form';

/** @namespace Component/ShareWishlistForm/Component */
export class ShareWishlistForm extends FieldForm {
    static propTypes = {
        onSave: PropTypes.func.isRequired
    };

    onFormSuccess = this.onFormSuccess.bind(this);

    get fieldMap() {
        return shareWishlistForm();
    }

    onFormSuccess(form, fields) {
        const { onSave } = this.props;
        onSave(transformToNameValuePair(fields));
    }

    renderActions() {
        return (
            <button type="submit" block="Button">
                { __('Share Wishlist') }
            </button>
        );
    }

    getFormProps() {
        return {
            onSubmit: this.onFormSuccess
        };
    }
}

export default ShareWishlistForm;
