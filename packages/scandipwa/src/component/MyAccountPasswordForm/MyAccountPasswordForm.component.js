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

/** @namespace Component/MyAccountPasswordForm/Component */
export class MyAccountPasswordForm extends FieldForm {
    static propTypes = {
        onPasswordChange: PropTypes.func.isRequired
    };

    onFormSuccess = (fields) => {
        const { onPasswordChange } = this.props;
        onPasswordChange(fields);
    };

    get fieldMap() {
        return {
            currentPassword: {
                type: 'password',
                label: __('Current Password'),
                validation: ['notEmpty']
            },
            newPassword: {
                type: 'password',
                label: __('New password'),
                validation: ['notEmpty']
            }
        };
    }

    renderActions() {
        return (
            <button block="Button" mix={ { block: 'MyAccount', elem: 'Button' } }>
                { __('Change password') }
            </button>
        );
    }
}

export default MyAccountPasswordForm;
