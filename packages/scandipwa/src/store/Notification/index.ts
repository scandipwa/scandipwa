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

import { useDispatch } from 'react-redux';

import { hideNotification, showNotification } from './Notification.action';

export const useNotificationStore = () => {
    const dispatch = useDispatch();

    return {
        showNotification(messageType: string, messageText: string, debug?: string) {
            dispatch(showNotification(messageType, messageText, debug));
        },
        hideNotification(id: number) {
            dispatch(hideNotification(id));
        }
    };
};
