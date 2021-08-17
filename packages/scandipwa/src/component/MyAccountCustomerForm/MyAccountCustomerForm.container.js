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
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { SHOW_VAT_NUMBER_REQUIRED } from 'Component/MyAccountCreateAccount/MyAccountCreateAccount.config';
import { customerType } from 'Type/Account';

import MyAccountCustomerForm from './MyAccountCustomerForm.component';

/** @namespace Component/MyAccountCustomerForm/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    showTaxVatNumber: state.ConfigReducer.show_tax_vat_number
});

/** @namespace Component/MyAccountCustomerForm/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/MyAccountCustomerForm/Container */
export class MyAccountCustomerFormContainer extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired,
        onSave: PropTypes.func.isRequired,
        showTaxVatNumber: PropTypes.string.isRequired
    };

    containerProps() {
        const { customer, onSave } = this.props;

        return {
            customer,
            onSave,
            vatNumberValidation: this.getVatNumberValidation()
        };
    }

    getVatNumberValidation() {
        const { showTaxVatNumber } = this.props;

        if (showTaxVatNumber === SHOW_VAT_NUMBER_REQUIRED) {
            return ['notEmpty'];
        }

        return [];
    }

    render() {
        return (
            <MyAccountCustomerForm
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountCustomerFormContainer);
