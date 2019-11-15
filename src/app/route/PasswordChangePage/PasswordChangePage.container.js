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
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { MyAccountDispatcher } from 'Store/MyAccount';
import { showNotification } from 'Store/Notification';
import PasswordChangePage from './PasswordChangePage.component';

export const mapStateToProps = state => ({
    passwordResetStatus: state.MyAccountReducer.passwordResetStatus
});

export const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.update(breadcrumbs, dispatch);
    },
    resetPassword(options) {
        MyAccountDispatcher.resetPassword(options, dispatch);
    },
    updateCustomerPasswordResetStatus(options) {
        MyAccountDispatcher.updateCustomerPasswordResetStatus(options, dispatch);
    },
    showNotification(type, message) {
        dispatch(showNotification(type, message));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangePage);
