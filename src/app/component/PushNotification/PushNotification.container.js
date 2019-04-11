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

const PushNotificationContainer = ({ notification }) => {
    const defaultOptions = {
        badge: defaultImage,
        image: defaultImage,
        icon: defaultImage
    };

    const { handleGranted, handleDenied } = notification.handlers;
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
        handleGranted={ handleGranted }
        handleDenied={ handleDenied }
        onBlur={ notification.options.onBlur }
        onFocus={ notification.options.onFocus }
      />
    );
};

PushNotificationContainer.propTypes = {
    notification: NotificationType.isRequired
};

export default PushNotificationContainer;
