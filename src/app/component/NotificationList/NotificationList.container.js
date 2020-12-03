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

import { hideNotification } from 'Store/Notification/Notification.action';

import NotificationList from './NotificationList.component';

/** @namespace Component/NotificationList/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    notifications: state.NotificationReducer.notifications
});

/** @namespace Component/NotificationList/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    onHideNotification: (id) => {
        dispatch(hideNotification(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);
