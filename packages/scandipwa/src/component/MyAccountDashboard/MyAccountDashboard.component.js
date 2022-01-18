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

import Link from 'Component/Link';
import Loader from 'Component/Loader';
import MyAccountAddressTable from 'Component/MyAccountAddressTable';
import MyAccountCustomerTable from 'Component/MyAccountCustomerTable';
import { ACCOUNT_URL } from 'Route/MyAccount/MyAccount.config';
import { ADDRESS_BOOK, CustomerType } from 'Type/Account.type';

import './MyAccountDashboard.style';

/** @namespace Component/MyAccountDashboard/Component */
export class MyAccountDashboard extends PureComponent {
    static propTypes = {
        customer: CustomerType.isRequired,
        getDefaultAddress: PropTypes.func.isRequired
    };

    renderNoDefaultAddressConfigured(name) {
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

    renderLinkToAddressBook() {
        return (
            <p block="MyAccountDashboard" elem="Info">
                <Link to={ `${ACCOUNT_URL}/${ADDRESS_BOOK}` }>
                    { __('Go to "Address Book", to configure them!') }
                </Link>
            </p>
        );
    }

    renderDefaultAddressTable(isBilling) {
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
                  showAdditionalFields
                  title={ __('Default %s address', name) }
                />
            </div>
        );
    }

    renderAddressBlockTitle() {
        return (
            <div block="MyAccountDashboard" elem="BlockTitle">
                <span>{ __('Address Book') }</span>
                <Link to={ `${ACCOUNT_URL}/${ADDRESS_BOOK}` }>
                    { __('Manage Addresses') }
                </Link>
            </div>
        );
    }

    renderNoAddresses() {
        return (
            <div>
                { this.renderAddressBlockTitle() }
                <p block="MyAccountDashboard" elem="Info">{ __('You have no configured addresses.') }</p>
                { this.renderLinkToAddressBook() }
            </div>
        );
    }

    renderDefaultAddressTables() {
        const { customer: { addresses = [] } } = this.props;

        if (!addresses.length) {
            return this.renderNoAddresses();
        }

        return (
            <div block="MyAccountDashboard" elem="Addresses">
                { this.renderAddressBlockTitle() }
                <div block="MyAccountDashboard" elem="AddressesWrapper">
                    { this.renderDefaultAddressTable() }
                    { this.renderDefaultAddressTable(true) }
                </div>
            </div>
        );
    }

    renderCustomerTable() {
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

    render() {
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

export default MyAccountDashboard;
