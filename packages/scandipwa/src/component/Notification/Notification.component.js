/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';

import Html from 'Component/Html';
import { NotificationType } from 'Type/NotificationList.type';
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
        onHideNotification: PropTypes.func.isRequired,
        lifeTime: PropTypes.number,
        id: PropTypes.string
    };

    static defaultProps = {
        lifeTime: 0,
        id: ''
    };

    state = { isNotificationVisible: true };

    notification = createRef();

    hideNotification = this.hideNotification.bind(this);

    componentDidMount() {
        const { notification: { msgType }, lifeTime } = this.props;

        // Make sure error notification stays a little longer
        if (msgType.toLowerCase() === ERROR_TYPE) {
            this.hideTimeout = setTimeout(() => this.hideNotification(), lifeTime || ERROR_NOTIFICATION_LIFETIME);
        } else {
            this.hideTimeout = setTimeout(() => this.hideNotification(), lifeTime || NOTIFICATION_LIFETIME);
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
    hideNotification() {
        const { onHideNotification, notificationId } = this.props;

        this.setState({ isNotificationVisible: false });

        // give CSS time to animate
        this.CSSHideTimeout = setTimeout(() => {
            onHideNotification(notificationId);
        }, ANIMATION_DURATION);
    }

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
        const { notification, id } = this.props;
        const { isNotificationVisible } = this.state;
        const { msgText, msgType } = notification;

        const mods = {
            type: msgType.toLowerCase(),
            is: isNotificationVisible ? 'opening' : 'closing'
        };

        const message = msgText.value || msgText;

        return (
            <div block="Notification" mods={ mods } ref={ this.notification } id={ id }>
                <button block="Notification" elem="Button" onClick={ this.hideNotification }> Close </button>
                <p block="Notification" elem="Text">
                    <Html content={ message } />
                </p>
                { this.renderDebug() }
            </div>
        );
    }
}

export default Notification;
