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
import MyAccount from './MyAccount.component';

const mapStateToProps = state => ({
    isSignedIn: state.MyAccountReducer.isSignedIn,
    customer: state.MyAccountReducer.customer
});

const mapDispatchToProps = dispatch => ({
    forgotPassword(options) {
        MyAccountDispatcher.forgotPassword(options);
    },

    createAccount(options) {
        MyAccountDispatcher.createAccount(options, dispatch);
    },

    signIn(options) {
        MyAccountDispatcher.signIn(options, dispatch);
    },

    requestCustomerData(options) {
        MyAccountDispatcher.handleData(dispatch, options);
    }
});

const MyAccountContainer = connect(mapStateToProps, mapDispatchToProps)(MyAccount);

export default MyAccountContainer;
