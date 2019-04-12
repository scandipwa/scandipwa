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

import PropTypes from 'prop-types';

export const NotificationType = PropTypes.shape({
    msgText: PropTypes.string,
    msgType: PropTypes.string,
    msgDebug: PropTypes.any
});

export const PushNotificationType = PropTypes.shape({
    supported: PropTypes.bool.isRequired,
    grantType: PropTypes.string.isRequired,
    setPermissions: PropTypes.func.isRequired,
    handleGranted: PropTypes.func,
    handleDenied: PropTypes.func,
    serviceWorkerRegistration: PropTypes.shape({
        // Promise
        then: PropTypes.func,
        catch: PropTypes.func
    }),
    forceAsk: PropTypes.bool, // Ask for web notification permissions
    title: PropTypes.string.isRequired,
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
    }),
    onFocus: PropTypes.bool,
    onBlur: PropTypes.bool
});

export const NotificationListType = PropTypes.objectOf(NotificationType);
