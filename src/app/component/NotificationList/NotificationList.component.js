/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
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

/**
 * Notification List
 * @class NotificationList
 */
class NotificationList extends Component {
    render() {
        const { onHideNotification, notifications } = this.props;

        return (
            <div className="NotificationList">
                { Object.keys(notifications).map(id => (
                    <Notification
                      key={ id }
                      notificationId={ id }
                      notification={ notifications[id] }
                      onHideNotification={ onHideNotification }
                    />
                )) }
            </div>
        );
    }
}

NotificationList.propTypes = {
    notifications: NotificationListType.isRequired,
    onHideNotification: PropTypes.func.isRequired
};

export default NotificationList;
