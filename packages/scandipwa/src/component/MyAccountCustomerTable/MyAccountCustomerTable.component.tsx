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

import KeyValueTable from 'Component/KeyValueTable';
import { DataPair } from 'Component/KeyValueTable/KeyValueTable.type';
import { ReactElement } from 'Type/Common.type';

import { MyAccountCustomerTableComponentProps } from './MyAccountCustomerTable.type';

/** @namespace Component/MyAccountCustomerTable/Component */
export class MyAccountCustomerTable extends KeyValueTable<MyAccountCustomerTableComponentProps> {
    dataPairArray(): DataPair<typeof customer>[] {
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

    renderActions(): ReactElement {
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

    render(): ReactElement {
        return (
            <div block="MyAccountCustomerTable">
                { this.renderTable() }
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountCustomerTable;
