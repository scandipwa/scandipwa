/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { NotificationType } from 'Store/Notification/Notification.type';
import { GQLProductStockStatus } from 'Type/Graphql.type';

export interface ProductAlertsContainerMapStateProps {
    isPriceAlertEnabled: boolean;
    isInStockAlertEnabled: boolean;
    isSignedIn: boolean;
}

export interface ProductAlertsContainerMapDispatchProps {
    showNotification: (type: NotificationType, message: string) => void;
    showErrorNotification: (message: string) => void;
}

export interface ProductAlertsContainerFunctions {
    handlePriceDropSubscribeAlertPriceDrop: () => Promise<void>;
    handlePriceDropSubscribeAlertInStock: () => Promise<void>;
}

export interface ProductAlertsContainerBaseProps {
    productId: number;
    stockStatus: GQLProductStockStatus | null;
}

export type ProductAlertsContainerProps = ProductAlertsContainerMapStateProps
& ProductAlertsContainerMapDispatchProps
& ProductAlertsContainerBaseProps;

export interface ProductAlertsComponentProps {
    isInStockAlertEnabled: boolean;
    isPriceAlertEnabled: boolean;
    stockStatus: GQLProductStockStatus | null;
    handlePriceDropSubscribeAlertPriceDrop: () => Promise<void>;
    handlePriceDropSubscribeAlertInStock: () => Promise<void>;
}

export type ProductAlertsComponentContainerPropKeys =
| 'isInStockAlertEnabled'
| 'isPriceAlertEnabled'
| 'stockStatus';
