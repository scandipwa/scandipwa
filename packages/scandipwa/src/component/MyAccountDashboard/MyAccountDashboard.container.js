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
import { connect } from 'react-redux';

import { ADDRESS_BOOK, CustomerType, TabMapType } from 'Type/Account.type';

import MyAccountDashboard from './MyAccountDashboard.component';

/** @namespace Component/MyAccountDashboard/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer
});

/** @namespace Component/MyAccountDashboard/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/MyAccountDashboard/Container */
export class MyAccountDashboardContainer extends PureComponent {
    static propTypes = {
        customer: CustomerType.isRequired,
        changeTabName: PropTypes.func.isRequired,
        tabMap: TabMapType.isRequired
    };

    containerFunctions = {
        getDefaultAddress: this.getDefaultAddress.bind(this),
        changeToAddressBook: this.changeToAddressBook.bind(this)
    };

    containerProps() {
        const { customer } = this.props;
        return { customer };
    }

    changeToAddressBook() {
        const { changeTabName, tabMap } = this.props;
        const { tabName } = tabMap[ADDRESS_BOOK];
        changeTabName(tabName);
    }

    getDefaultAddress(isBilling) {
        const { customer: { addresses = [] } } = this.props;
        const key = isBilling ? 'default_billing' : 'default_shipping';

        return addresses.find(({ [key]: defaultAddress }) => defaultAddress);
    }

    render() {
        return (
            <MyAccountDashboard
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountDashboardContainer);
