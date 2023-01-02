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

import Loader from 'Component/Loader';
import MyAccountAddressTable from 'Component/MyAccountAddressTable/MyAccountAddressTable.component';
import { CustomerAddress } from 'Query/MyAccount.type';
import { ReactElement } from 'Type/Common.type';

import { CheckoutAddressTableComponentProps, CheckoutAddressTableComponentState } from './CheckoutAddressTable.type';

import './CheckoutAddressTable.style';

/** @namespace Component/CheckoutAddressTable/Component */
export class CheckoutAddressTableComponent<
P extends Readonly<CheckoutAddressTableComponentProps> = Readonly<CheckoutAddressTableComponentProps>,
S extends CheckoutAddressTableComponentState = CheckoutAddressTableComponentState,
> extends MyAccountAddressTable<P, S> {
    static defaultProps: Partial<CheckoutAddressTableComponentProps> = {
        ...MyAccountAddressTable.defaultProps,
        isSelected: false,
    };

    __construct(): void {
        this.onAddressClick = this.onAddressClick.bind(this);
    }

    onAddressClick(): void {
        const { address, onClick } = this.props;

        onClick(address as CustomerAddress);
    }

    renderTable(): ReactElement {
        const { isSelected } = this.props;

        return (
            <button
              block="CheckoutAddressTable"
              elem="Button"
              type="button"
              mods={ { isSelected } }
              onClick={ this.onAddressClick }
            >
                { super.renderTable() }
            </button>
        );
    }

    render(): ReactElement {
        const { countries } = this.props;

        return (
            <div block="CheckoutAddressTable">
                <Loader isLoading={ !countries.length } />
                { this.renderTable() }
            </div>
        );
    }
}

export default CheckoutAddressTableComponent;
