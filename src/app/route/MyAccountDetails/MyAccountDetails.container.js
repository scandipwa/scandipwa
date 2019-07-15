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

import { connect } from 'react-redux';
import { MyAccountDispatcher } from 'Store/MyAccount';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { showNotification } from 'Store/Notification';
import MyAccountDetails from './MyAccountDetails.component';

const mapStateToProps = state => ({
    isSignedIn: state.MyAccountReducer.isSignedIn,
    customer: state.MyAccountReducer.customer,
    countryList: state.ConfigReducer.countries
});

const mapDispatchToProps = dispatch => ({
    requestCustomerData(options) {
        return MyAccountDispatcher.requestCustomerData(options, dispatch);
    },
    updateCustomerData(options) {
        return MyAccountDispatcher.updateCustomerData(options, dispatch);
    },
    changeCustomerPassword(options, customer) {
        return MyAccountDispatcher.changeCustomerPassword(options, customer, dispatch);
    },
    updateCustomerAddress(id, options) {
        return MyAccountDispatcher.updateCustomerAddress(id, options, dispatch);
    },
    createCustomerAddress(options) {
        return MyAccountDispatcher.createCustomerAddress(options, dispatch);
    },

    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.update(breadcrumbs, dispatch);
    },

    showNotification(type, message) {
        dispatch(showNotification(type, message));
    }
});

const MyAccountDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(MyAccountDetails);

export default MyAccountDetailsContainer;
