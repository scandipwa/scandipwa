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
import { hideNotification } from 'Store/Notification';
import NotificationList from './NotificationList.component';

export const mapStateToProps = middleware(
    state => ({
        notifications: state.NotificationReducer.notifications
    }),
    'Component/NotificationList/Container/mapStateToProps'
);

export const mapDispatchToProps = middleware(
    dispatch => ({
        onHideNotification: (id) => {
            dispatch(hideNotification(id));
        }
    }),
    'Component/NotificationList/Container/mapDispatchToProps'
);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);
