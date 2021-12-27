/* eslint-disable spaced-comment */
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

import customerEmailAndPasswordFields from './PasswordChangeForm.form';

import './PasswordChangeForm.style';

/** @namespace Component/PasswordChangeForm/Component */
export class PasswordChangeForm extends FieldForm {
    static propsTypes = {
        onFormSubmit: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired
    };

    get fieldMap() {
        return customerEmailAndPasswordFields();
    }

    getFormProps() {
        const { onFormSubmit, onFormError } = this.props;

        return {
            onSubmit: onFormSubmit,
            onError: onFormError
        };
    }

    renderActions() {
        return (
            <div block="PasswordChangeForm" elem="Action">
                <button
                  type="submit"
                  block="PasswordChangeForm"
                  elem="Button"
                  mix={ { block: 'Button' } }
                >
                    { __('Update Password') }
                </button>
            </div>
        );
    }
}

export default PasswordChangeForm;
