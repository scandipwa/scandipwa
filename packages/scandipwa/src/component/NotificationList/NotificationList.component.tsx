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

import { PureComponent } from 'react';

import Notification from 'Component/Notification';
import { ReactElement } from 'Type/Common.type';

import { NotificationListComponentProps } from './NotificationList.type';

import './NotificationList.style';

/**
 * Notification List
 * @class NotificationList
 * @namespace Component/NotificationList/Component
 */
export class NotificationListComponent<
P extends Readonly<NotificationListComponentProps> = Readonly<NotificationListComponentProps>,
S extends NotificationListComponentState = NotificationListComponentState,
> extends PureComponent<P, S> {
    render(): ReactElement {
        const { onHideNotification, notifications } = this.props;

        return (
            <div block="NotificationList">
                { Object.keys(notifications).map((id) => (
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

export default NotificationListComponent;
