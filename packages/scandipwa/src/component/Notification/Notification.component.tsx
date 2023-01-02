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

import Html from 'Component/Html';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import CSS from 'Util/CSS';

import {
    ANIMATION_DURATION, ERROR_NOTIFICATION_LIFETIME, ERROR_TYPE, NOTIFICATION_LIFETIME,
} from './Notification.config';
import { NotificationComponentProps, NotificationComponentState } from './Notification.type';

import './Notification.style';

/**
 * Notification block
 * @class Notification
 * @namespace Component/Notification/Component
 */
export class NotificationComponent<
P extends Readonly<NotificationComponentProps> = Readonly<NotificationComponentProps>,
S extends NotificationComponentState = NotificationComponentState,
> extends PureComponent <P, S> {
    static defaultProps: Partial<NotificationComponentProps> = {
        lifeTime: 0,
        id: '',
    };

    state: S = { isNotificationVisible: true } as S;

    notification = createRef<HTMLDivElement>();

    hideTimeout: ReturnType<typeof setTimeout> = setTimeout(noopFn);

    CSSHideTimeout: ReturnType<typeof setTimeout> = setTimeout(noopFn);

    __construct() {
        this.hideNotification = this.hideNotification.bind(this);
    }

    componentDidMount(): void {
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
            is: isNotificationVisible ? 'opening' : 'closing',
        };

        return (
            <div block="Notification" mods={ mods } ref={ this.notification } id={ id }>
                <button block="Notification" elem="Button" onClick={ this.hideNotification }> Close </button>
                <p block="Notification" elem="Text">
                    <Html content={ msgText } />
                </p>
                { this.renderDebug() }
            </div>
        );
    }
}

export default NotificationComponent;
