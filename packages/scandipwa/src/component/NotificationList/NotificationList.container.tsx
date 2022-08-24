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

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { hideNotification } from 'Store/Notification/Notification.action';
import NotificationReducer from 'Store/Notification/Notification.reducer';
import { withReducers } from 'Util/DynamicReducer';
import { RootState } from 'Util/Store/Store.type';

import NotificationList from './NotificationList.component';
import {
    NotificationListContainerMapDispatchProps,
    NotificationListContainerMapStateProps
} from './NotificationList.type';

/** @namespace Component/NotificationList/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): NotificationListContainerMapStateProps => ({
    notifications: state.NotificationReducer.notifications
});

/** @namespace Component/NotificationList/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): NotificationListContainerMapDispatchProps => ({
    onHideNotification: (id) => {
        dispatch(hideNotification(id));
    }
});

export default withReducers({
    NotificationReducer
})(connect(mapStateToProps, mapDispatchToProps)(NotificationList));
