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
