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

import { createRef, PureComponent } from 'react';

<<<<<<< HEAD:packages/scandipwa/src/component/Notification/Notification.component.tsx
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
=======
import Html from 'Component/Html';
import { NotificationType } from 'Type/NotificationList.type';
>>>>>>> scandipwa/master:packages/scandipwa/src/component/Notification/Notification.component.js
import CSS from 'Util/CSS';

import {
    ANIMATION_DURATION, ERROR_NOTIFICATION_LIFETIME, ERROR_TYPE, NOTIFICATION_LIFETIME
} from './Notification.config';
import { NotificationComponentProps, NotificationComponentState } from './Notification.type';

import './Notification.style';

/**
 * Notification block
 * @class Notification
 * @namespace Component/Notification/Component
 */
export class Notification extends PureComponent<NotificationComponentProps, NotificationComponentState> {
    static defaultProps: Partial<NotificationComponentProps> = {
        lifeTime: 0,
        id: ''
    };

    state: NotificationComponentState = { isNotificationVisible: true };

    notification = createRef<HTMLDivElement>();

    hideTimeout: ReturnType<typeof setTimeout> = setTimeout(noopFn);

    CSSHideTimeout: ReturnType<typeof setTimeout> = setTimeout(noopFn);

<<<<<<< HEAD:packages/scandipwa/src/component/Notification/Notification.component.tsx
    componentDidMount(): void {
=======
    hideNotification = this.hideNotification.bind(this);

    componentDidMount() {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/Notification/Notification.component.js
        const { notification: { msgType }, lifeTime } = this.props;

        // Make sure error notification stays a little longer
        if (msgType.toLowerCase() === ERROR_TYPE) {
            this.hideTimeout = setTimeout(() => this.hideNotification(), lifeTime || ERROR_NOTIFICATION_LIFETIME);
        } else {
            this.hideTimeout = setTimeout(() => this.hideNotification(), lifeTime || NOTIFICATION_LIFETIME);
        }

        CSS.setVariable(this.notification, 'animation-duration', `${ANIMATION_DURATION}ms`);
    }

    componentWillUnmount(): void {
        // clear started timeouts, to assure we are not changing state of unmounted component
        clearTimeout(this.hideTimeout);
        clearTimeout(this.CSSHideTimeout);
    }

    /**
     * Remove notification from screen
     * @return {void
     */
    hideNotification(): void {
        const { onHideNotification, notificationId } = this.props;

        this.setState({ isNotificationVisible: false });

        // give CSS time to animate
        this.CSSHideTimeout = setTimeout(() => {
            onHideNotification(notificationId);
        }, ANIMATION_DURATION);
    }

    renderDebug(): ReactElement {
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

    render(): ReactElement {
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
