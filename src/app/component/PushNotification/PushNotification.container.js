import React from 'react';
import PropTypes from 'prop-types';
import { NotificationType } from 'Type/NotificationList';
import PushNotification from './PushNotification.component';

const PushNotificationContainer = (props) => {
    const { notification } = props;
    const title = notification.msgText;
    const body = notification.msgDebug;
    const params = {
        ...notification.options,
        body
    };

    return (
      <PushNotification
        title={ title }
        options={ params }
      />
    );
};

PushNotificationContainer.propTypes = {
    notification: NotificationType.isRequired,
    options: PropTypes.shape({
        actions: PropTypes.arrayOf(PropTypes.object),
        badge: PropTypes.string,
        body: PropTypes.string,
        dir: PropTypes.string,
        icon: PropTypes.string,
        image: PropTypes.string,
        lang: PropTypes.string,
        renotify: PropTypes.bool,
        requireInteraction: PropTypes.bool,
        tag: PropTypes.string,
        vibrate: PropTypes.arrayOf(PropTypes.number),
        data: PropTypes.any
    })
};

PushNotificationContainer.defaultProps = {
    options: {}
};

export default PushNotificationContainer;
