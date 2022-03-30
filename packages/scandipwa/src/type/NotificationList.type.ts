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

export type Notification = {
    msgText?: string;
    msgType?: string;
    msgDebug?: {
        message?: string;
        extensions?: {
            category?: string;
        };
        locations?: {
            line?: number;
            column?: number;
        }[];
        path?: string[];
    }[];
};

export type NotificationList = Record<string, Notification>;
