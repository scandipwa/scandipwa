import PropTypes from 'prop-types';

export const NotificationType = PropTypes.shape({
    msgText: PropTypes.string,
    msgType: PropTypes.string,
    msgDebug: PropTypes.any
});

export const NotificationListType = PropTypes.objectOf(NotificationType);
