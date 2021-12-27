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

import KeyValueTable from 'Component/KeyValueTable';
import { CustomerType } from 'Type/Account.type';

/** @namespace Component/MyAccountCustomerTable/Component */
export class MyAccountCustomerTable extends KeyValueTable {
    static propTypes = {
        handleOnEditInformation: PropTypes.func.isRequired,
        handleOnEditPassword: PropTypes.func.isRequired,
        customer: CustomerType.isRequired
    };

    get dataPairArray() {
        const { customer } = this.props;

        return [
            {
                key: 'firstname',
                label: __('First name'),
                source: customer
            },
            {
                key: 'lastname',
                label: __('Last name'),
                source: customer
            },
            {
                key: 'taxvat',
                label: __('Tax/VAT Number'),
                source: customer
            },
            {
                key: 'email',
                label: __('Email'),
                source: customer
            }
        ];
    }

    renderActions() {
        const { handleOnEditInformation, handleOnEditPassword } = this.props;

        return (
            <>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                  onClick={ handleOnEditInformation }
                >
                    { __('Edit details') }
                </button>
                <button
                  block="Button"
                  mods={ { isHollow: true, isWithoutBorder: true } }
                  onClick={ handleOnEditPassword }
                >
                    { __('Change password') }
                </button>
            </>
        );
    }

    render() {
        return (
            <div block="MyAccountCustomerTable">
                { this.renderTable() }
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountCustomerTable;
