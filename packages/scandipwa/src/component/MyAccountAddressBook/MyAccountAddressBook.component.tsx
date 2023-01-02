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

import { Component } from 'react';

import MyAccountAddressPopup from 'Component/MyAccountAddressPopup';
import MyAccountAddressTable from 'Component/MyAccountAddressTable';
import { CustomerAddress } from 'Query/MyAccount.type';
import { ReactElement } from 'Type/Common.type';
import { getDefaultAddressLabel } from 'Util/Address';

import { MyAccountAddressBookComponentProps, MyAccountAddressBookComponentState } from './MyAccountAddressBook.type';

import './MyAccountAddressBook.style';

/** @namespace Component/MyAccountAddressBook/Component */
export class MyAccountAddressBookComponent<
P extends Readonly<MyAccountAddressBookComponentProps> = Readonly<MyAccountAddressBookComponentProps>,
S extends MyAccountAddressBookComponentState = MyAccountAddressBookComponentState,
> extends Component<P, S> {
    shouldComponentUpdate(nextProps: MyAccountAddressBookComponentProps): boolean {
        const { customer } = this.props;
        const { customer: nextCustomer } = nextProps;

        return customer !== nextCustomer;
    }

    renderPopup(): ReactElement {
        return <MyAccountAddressPopup />;
    }

    renderAddress(address: CustomerAddress, index: number): ReactElement {
        const addressNumber = index + 1;
        const postfix = getDefaultAddressLabel(address);

        return (
            <MyAccountAddressTable
              title={ __('Address #%s%s', addressNumber, postfix) }
              showActions
              address={ address }
              key={ addressNumber }
            />
        );
    }

    renderNoAddresses(): ReactElement {
        return (
            <div>
                <p>{ __('You have no configured addresses.') }</p>
            </div>
        );
    }

    renderActions(): ReactElement {
        const { showCreateNewPopup } = this.props;

        return (
            <button
              block="Button"
              mix={ { block: 'MyAccountAddressBook', elem: 'Button' } }
              mods={ { isHollow: true } }
              onClick={ showCreateNewPopup }
            >
                { __('Add new address') }
            </button>
        );
    }

    renderAddressList(): ReactElement {
        const { customer: { addresses = [] } } = this.props;

        if (!addresses.length) {
            return this.renderNoAddresses();
        }

        return addresses.map(this.renderAddress);
    }

    render(): ReactElement {
        return (
            <div block="MyAccountAddressBook">
                { this.renderActions() }
                { this.renderAddressList() }
                { this.renderPopup() }
            </div>
        );
    }
}

export default MyAccountAddressBookComponent;
