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
import Loader from 'Component/Loader';
import { CustomerAddress } from 'Query/MyAccount.type';
import { ReactElement } from 'Type/Common.type';
import { FormattedRegion } from 'Util/Address/Address.type';

import { getAddressTablePairArray } from './MyAccountAddressTable.table';
import { MyAccountAddressTableComponentProps } from './MyAccountAddressTable.type';

import './MyAccountAddressTable.style';

/** @namespace Component/MyAccountAddressTable/Component */
export class MyAccountAddressTable <
Props extends MyAccountAddressTableComponentProps = MyAccountAddressTableComponentProps,
> extends KeyValueTable<Props> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dataPairArray(): DataPair<CustomerAddress | FormattedRegion>[] {
        return getAddressTablePairArray(this.props);
    }

    renderActions(): ReactElement {
        const {
            onEditClick,
            onDeleteClick,
            showActions,
            address,
        } = this.props;

        if (!('default_shipping' in address)) {
            return null;
        }

        const { default_billing, default_shipping } = address;

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
