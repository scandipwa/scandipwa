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
import MyAccountCustomerPopup from 'Component/MyAccountCustomerPopup';
import MyAccountCustomerTable from 'Component/MyAccountCustomerTable';
import { MY_ACCOUNT_URL } from 'Route/MyAccount/MyAccount.config';
import { ADDRESS_BOOK, customerType } from 'Type/Account';

import './MyAccountDashboard.style';

/** @namespace Component/MyAccountDashboard/Component */
export class MyAccountDashboard extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired,
        getDefaultAddress: PropTypes.func.isRequired
    };

    renderCustomerPopup() {
        return (
            <MyAccountCustomerPopup />
        );
    }

    renderNoDefaultAddressConfigured(name) {
        return (
            <div key={ name }>
                <p block="MyAccountDashboard" elem="Info">{ __('No %s address configured.', name) }</p>
                { this.renderLinkToAddressBook() }
            </div>
        );
    }

    renderLinkToAddressBook() {
        return (
            <p block="MyAccountDashboard" elem="Info">
                <Link to={ `${MY_ACCOUNT_URL}/${ADDRESS_BOOK}` }>
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

    renderNoAddresses() {
        return (
            <div>
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

        return [
            this.renderDefaultAddressTable(),
            this.renderDefaultAddressTable(true)
        ];
    }

    renderCustomerTable() {
        const { customer } = this.props;

        return (
            <div block="MyAccountDashboard" elem="CustomerData">
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
                { this.renderCustomerPopup() }
            </div>
        );
    }
}

export default MyAccountDashboard;
