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
import { changeHeaderState } from 'Store/Header';
import { MyAccountDispatcher } from 'Store/MyAccount';
import { CUSTOMER_ACCOUNT } from 'Component/Header';
import { showNotification } from 'Store/Notification';
import MyAccountOverlay from './MyAccountOverlay.component';

const mapStateToProps = state => ({
    isSignedIn: state.MyAccountReducer.isSignedIn,
    customer: state.MyAccountReducer.customer,
    isPasswordForgotSend: state.MyAccountReducer.isPasswordForgotSend,
    isOverlayVisible: state.OverlayReducer.activeOverlay === CUSTOMER_ACCOUNT
});

const mapDispatchToProps = dispatch => ({
    forgotPassword: options => MyAccountDispatcher.forgotPassword(options, dispatch),
    createAccount: options => MyAccountDispatcher.createAccount(options, dispatch),
    signIn: options => MyAccountDispatcher.signIn(options, dispatch),
    requestCustomerData: options => MyAccountDispatcher.handleData(dispatch, options),
    logout: () => MyAccountDispatcher.logout(null, dispatch),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    setHeaderState: headerState => dispatch(changeHeaderState(headerState))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOverlay);
