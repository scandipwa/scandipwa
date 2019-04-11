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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from 'Component/Notification';
import { NotificationListType } from 'Type/NotificationList';
import './NotificationList.style';
import { DENIED } from 'Store/Notification/Notification.reducer';
import PushNotification from 'Component/PushNotification';

/**
 * Notification List
 * @class NotificationList
 */
class NotificationList extends Component {
    render() {
        const {
            onHideNotification,
            notifications,
            grantType,
            supported
        } = this.props;

        return (
            <div className="NotificationList">
                { Object.keys(notifications).map((id) => {
                    return supported && grantType !== DENIED ? (
                        <PushNotification
                          key={ id }
                          notification={ notifications[id] }
                        />
                    ) : (
                        <Notification
                          key={ id }
                          notificationId={ id }
                          notification={ notifications[id] }
                          onHideNotification={ onHideNotification }
                        />
                    );
                }) }
            </div>
        );
    }
}

NotificationList.propTypes = {
    notifications: NotificationListType.isRequired,
    onHideNotification: PropTypes.func.isRequired,
    grantType: PropTypes.string.isRequired,
    supported: PropTypes.bool.isRequired
};

export default NotificationList;
