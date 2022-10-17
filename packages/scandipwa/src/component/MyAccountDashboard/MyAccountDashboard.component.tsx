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

import { PureComponent } from 'react';

import Link from 'Component/Link';
import Loader from 'Component/Loader';
import MyAccountAddressTable from 'Component/MyAccountAddressTable';
import MyAccountCustomerTable from 'Component/MyAccountCustomerTable';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { MyAccountTabs } from 'Type/Account.type';
import { ReactElement } from 'Type/Common.type';

import { MyAccountDashboardComponentProps } from './MyAccountDashboard.type';

import './MyAccountDashboard.style';

/** @namespace Component/MyAccountDashboard/Component */
export class MyAccountDashboardComponent extends PureComponent<MyAccountDashboardComponentProps> {
    renderNoDefaultAddressConfigured(name: string): ReactElement {
        return (
            <div
              key={ name }
              block="MyAccountDashboard"
              elem="DefaultAddress"
            >
                <p block="MyAccountDashboard" elem="Info">{ __('No %s address configured.', name) }</p>
                { this.renderLinkToAddressBook() }
            </div>
        );
    }

    renderLinkToAddressBook(): ReactElement {
        return (
            <p block="MyAccountDashboard" elem="Info">
                <Link to={ `${AccountPageUrl.ACCOUNT_URL}/${MyAccountTabs.ADDRESS_BOOK}` }>
                    { __('Go to "Address Book", to configure them!') }
                </Link>
            </p>
        );
    }

    renderDefaultAddressTable(isBilling: boolean): ReactElement {
        const { getDefaultAddress } = this.props;
        const name = isBilling ? __('billing') : __('shipping');
        const address = getDefaultAddress(isBilling);

        if (!address) {
            return this.renderNoDefaultAddressConfigured(name);
        }

        return (
            <div
              key={ name }
              block="MyAccountDashboard"
              elem="DefaultAddress"
            >
                <MyAccountAddressTable
                  address={ address }
                  title={ __('Default %s address', name) }
                />
            </div>
        );
    }

    renderAddressBlockTitle(): ReactElement {
        return (
            <div block="MyAccountDashboard" elem="BlockTitle">
                <span>{ __('Address Book') }</span>
                <Link to={ `${AccountPageUrl.ACCOUNT_URL}/${MyAccountTabs.ADDRESS_BOOK}` }>
                    { __('Manage Addresses') }
                </Link>
            </div>
        );
    }

    renderNoAddresses(): ReactElement {
        return (
            <div>
                { this.renderAddressBlockTitle() }
                <p block="MyAccountDashboard" elem="Info">{ __('You have no configured addresses.') }</p>
                { this.renderLinkToAddressBook() }
            </div>
        );
    }

    renderDefaultAddressTables(): ReactElement {
        const { customer: { addresses = [] } } = this.props;

        if (!addresses.length) {
            return this.renderNoAddresses();
        }

        return (
            <div block="MyAccountDashboard" elem="Addresses">
                { this.renderAddressBlockTitle() }
                <div block="MyAccountDashboard" elem="AddressesWrapper">
                    { this.renderDefaultAddressTable(false) }
                    { this.renderDefaultAddressTable(true) }
                </div>
            </div>
        );
    }

    renderCustomerTable(): ReactElement {
        const { customer } = this.props;

        return (
            <div block="MyAccountDashboard" elem="CustomerData">
                <div block="MyAccountDashboard" elem="BlockTitle">
                    <span>{ __('Account Information') }</span>
                </div>
                <MyAccountCustomerTable
                  customer={ customer }
                  title={ __('My profile') }
                />
            </div>
        );
    }

    render(): ReactElement {
        const { customer } = this.props;

        return (
            <div block="MyAccountDashboard">
                <Loader isLoading={ !Object.keys(customer).length } />
                { this.renderCustomerTable() }
                { this.renderDefaultAddressTables() }
            </div>
        );
    }
}

export default MyAccountDashboardComponent;
