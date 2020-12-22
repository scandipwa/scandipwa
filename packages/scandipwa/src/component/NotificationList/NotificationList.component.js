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
import { PureComponent } from 'react';

import Notification from 'Component/Notification';
import { NotificationListType } from 'Type/NotificationList';

import './NotificationList.style';

/**
 * Notification List
 * @class NotificationList
 * @namespace Component/NotificationList/Component
 */
export class NotificationList extends PureComponent {
    static propTypes = {
        notifications: NotificationListType.isRequired,
        onHideNotification: PropTypes.func.isRequired
    };

    render() {
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

export default NotificationList;
