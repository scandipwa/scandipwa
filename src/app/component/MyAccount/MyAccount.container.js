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
    isLoading: state.MyAccountReducer.isLoading,
    data: state.MyAccountReducer.data
});

const mapDispatchToProps = dispatch => ({
    signUp: (options) => {
        MyAccountDispatcher.handleData(dispatch, options);
    }
});

const MyAccountContainer = connect(mapStateToProps, mapDispatchToProps)(MyAccount);

export default MyAccountContainer;
