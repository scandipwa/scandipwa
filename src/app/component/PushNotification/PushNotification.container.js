import React from 'react';
import { connect } from 'react-redux';
import { NotificationType } from 'Type/NotificationList';
import { setBrowserPermission } from 'Store/Notification';
import PushNotification from './PushNotification.component';
import defaultImage from '../../../../media/preview.png';

const mapStateToProps = state => ({
    supported: state.NotificationReducer.nativeSupported,
    grantType: state.NotificationReducer.nativeGrantType
});

const mapDispatchToProps = dispatch => ({
    setPermissions: (value) => {
        dispatch(setBrowserPermission(value));
    }
});

const MappedPushNotification = connect(mapStateToProps, mapDispatchToProps)(PushNotification);

const PushNotificationContainer = (props) => {
    const defaultOptions = {
        badge: defaultImage,
        image: defaultImage,
        icon: defaultImage
    };

    const { notification } = props;
    const title = notification.msgText;
    const body = notification.msgDebug;
    const params = {
        ...defaultOptions,
        ...notification.options,
        body
    };

    return (
      <MappedPushNotification
        title={ title }
        options={ params }
      />
    );
};

PushNotificationContainer.propTypes = {
    notification: NotificationType.isRequired
};

export default PushNotificationContainer;
