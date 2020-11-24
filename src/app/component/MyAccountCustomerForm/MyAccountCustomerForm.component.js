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
import { SHOW_VAT_NUMBER_REQUIRED } from 'Component/MyAccountCreateAccount/MyAccountCreateAccount.config';
import { customerType } from 'Type/Account';

/** @namespace Component/MyAccountCustomerForm/Component */
export class MyAccountCustomerForm extends FieldForm {
    static propTypes = {
        customer: customerType.isRequired,
        onSave: PropTypes.func.isRequired
    };

    onFormSuccess = (fields) => {
        const { onSave } = this.props;
        onSave(fields);
    };

    getDefaultValues(fieldEntry) {
        const [key] = fieldEntry;
        const { customer: { [key]: value } } = this.props;

        return {
            ...super.getDefaultValues(fieldEntry),
            value
        };
    }

    get fieldMap() {
        return {
            firstname: {
                label: __('First name'),
                validation: ['notEmpty']
            },
            lastname: {
                label: __('Last name'),
                validation: ['notEmpty']
            },
            ...this.getVatField()
        };
    }

    getVatField() {
        const { showTaxVatNumber } = this.props;
        const validation = [];

        if (!showTaxVatNumber) {
            return {};
        }

        if (showTaxVatNumber === SHOW_VAT_NUMBER_REQUIRED) {
            validation.push('notEmpty');
        }

        return {
            taxvat: {
                label: __('Tax/VAT Number'),
                validation
            }
        };
    }

    renderActions() {
        return (
            <button
              type="submit"
              block="Button"
              mix={ { block: 'MyAccount', elem: 'Button' } }
            >
                { __('Save customer') }
            </button>
        );
    }
}

export default MyAccountCustomerForm;
