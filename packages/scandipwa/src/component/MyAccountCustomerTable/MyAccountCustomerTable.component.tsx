/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import KeyValueTable from 'Component/KeyValueTable';
import { DataPair } from 'Component/KeyValueTable/KeyValueTable.type';
import { Customer } from 'Query/MyAccount.type';
import { ReactElement } from 'Type/Common.type';

import { MyAccountCustomerTableComponentProps } from './MyAccountCustomerTable.type';

import './MyAccountCustomerTable.style';

/** @namespace Component/MyAccountCustomerTable/Component */
export class MyAccountCustomerTableComponent extends KeyValueTable<MyAccountCustomerTableComponentProps> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dataPairArray(): DataPair<Partial<Customer>>[] {
        const { customer } = this.props;

        return [
            {
                key: 'firstname',
                label: __('First name'),
                source: customer,
            },
            {
                key: 'lastname',
                label: __('Last name'),
                source: customer,
            },
            {
                key: 'taxvat',
                label: __('Tax/VAT Number'),
                source: customer,
            },
            {
                key: 'email',
                label: __('Email'),
                source: customer,
            },
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
                <div block="MyAccountCustomerTable" elem="TableWrapper">
                    { this.renderTable() }
                </div>
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountCustomerTableComponent;
