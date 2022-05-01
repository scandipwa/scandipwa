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
import Loader from 'Component/Loader';
import { ReactElement } from 'Type/Common.type';

import { getAddressTablePairArray } from './MyAccountAddressTable.table';
import { MyAccountAddressTableComponentProps } from './MyAccountAddressTable.type';

import './MyAccountAddressTable.style';

/** @namespace Component/MyAccountAddressTable/Component */
export class MyAccountAddressTable extends KeyValueTable<MyAccountAddressTableComponentProps> {
    get dataPairArray(): DataPair[] {
        return getAddressTablePairArray(this.props);
    }

    renderActions(): ReactElement {
        const {
            onEditClick,
            onDeleteClick,
            showActions,
            address: { default_billing, default_shipping }
        } = this.props;

        const isDeleteAllowed = default_shipping || default_billing;

        if (!showActions) {
            return null;
        }

        return (
            <>
                <button
                  block="Button"
                  onClick={ onEditClick }
                  mods={ { isHollow: true } }
                >
                    { __('Edit address') }
                </button>
                <button
                  block="Button"
                  mods={ { isHollow: true, isWithoutBorder: true } }
                  onClick={ onDeleteClick }
                  disabled={ isDeleteAllowed }
                  title={ isDeleteAllowed ? __('Can not delete - address is set as default.') : 'Delete this address' }
                >
                    { __('Delete') }
                </button>
            </>
        );
    }

    render(): ReactElement {
        const { countries, mix } = this.props;

        return (
            <div block="MyAccountAddressTable" mix={ mix }>
                <Loader isLoading={ !countries.length } />
                { this.renderTable() }
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountAddressTable;
