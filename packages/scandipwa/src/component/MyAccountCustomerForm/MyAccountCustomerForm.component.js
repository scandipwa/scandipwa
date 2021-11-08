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

import FieldForm from 'Component/PureForm/FieldForm';
import { CustomerType } from 'Type/Account.type';
import transformToNameValuePair from 'Util/Form/Transform';

import myAccountCustomerForm from './MyAccountCustomerForm.form';

/** @namespace Component/MyAccountCustomerForm/Component */
export class MyAccountCustomerForm extends FieldForm {
    static propTypes = {
        customer: CustomerType.isRequired,
        onSave: PropTypes.func.isRequired,
        showTaxVatNumber: PropTypes.bool.isRequired
    };

    onFormSuccess = (form, fields) => {
        const { onSave } = this.props;
        onSave(transformToNameValuePair(fields));
    };

    get fieldMap() {
        const {
            showTaxVatNumber,
            customer: {
                firstname = '',
                lastname = '',
                taxvat = ''
            }
        } = this.props;

        return myAccountCustomerForm({
            showTaxVatNumber, firstname, lastname, taxvat
        });
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

    getFormProps() {
        return {
            onSubmit: this.onFormSuccess
        };
    }
}

export default MyAccountCustomerForm;
