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
import { createRef, PureComponent } from 'react';

import { NotificationType } from 'Type/NotificationList';
import CSS from 'Util/CSS';

import {
    ANIMATION_DURATION, ERROR_NOTIFICATION_LIFETIME, ERROR_TYPE, NOTIFICATION_LIFETIME
} from './Notification.config';

import './Notification.style';

/**
 * Notification block
 * @class Notification
 * @namespace Component/Notification/Component
 */
export class Notification extends PureComponent {
    static propTypes = {
        notificationId: PropTypes.string.isRequired,
        notification: NotificationType.isRequired,
        onHideNotification: PropTypes.func.isRequired
    };

    state = { isNotificationVisible: true };

    notification = createRef();

    componentDidMount() {
        const { notification: { msgType } } = this.props;

        // Make sure error notification stays a little longer
        if (msgType.toLowerCase() === ERROR_TYPE) {
            this.hideTimeout = setTimeout(() => this.hideNotification(), ERROR_NOTIFICATION_LIFETIME);
        } else {
            this.hideTimeout = setTimeout(() => this.hideNotification(), NOTIFICATION_LIFETIME);
        }

        CSS.setVariable(this.notification, 'animation-duration', `${ANIMATION_DURATION}ms`);
    }

    componentWillUnmount() {
        // clear started timeouts, to assure we are not changing state of unmounted component
        clearTimeout(this.hideTimeout);
        clearTimeout(this.CSSHideTimeout);
    }

    /**
     * Remove notification from screen
     * @return {void
     */
    hideNotification = () => {
        const { onHideNotification, notificationId } = this.props;
        this.setState({ isNotificationVisible: false });

        // give CSS time to animate
        this.CSSHideTimeout = setTimeout(() => {
            onHideNotification(notificationId);
        }, ANIMATION_DURATION);
    };

    renderDebug() {
        const { notification: { msgDebug } } = this.props;

        if (!msgDebug) {
            return null;
        }

        if (process.env.NODE_ENV === 'production') {
            return null;
        }

        // eslint-disable-next-line no-console
        console.warn(msgDebug); // so we know what was in notification

        return (
            <pre block="Notification" elem="Debug">
                { JSON.stringify(msgDebug) }
            </pre>
        );
    }

    render() {
        const { notification } = this.props;
        const { isNotificationVisible } = this.state;
        const { msgText, msgType } = notification;

        const mods = {
            type: msgType.toLowerCase(),
            is: isNotificationVisible ? 'opening' : 'closing'
        };

        return (
            <div block="Notification" mods={ mods } ref={ this.notification }>
                <button block="Notification" elem="Button" onClick={ this.hideNotification }>Close</button>
                <p block="Notification" elem="Text">{ msgText }</p>
                { this.renderDebug() }
            </div>
        );
    }
}

export default Notification;
