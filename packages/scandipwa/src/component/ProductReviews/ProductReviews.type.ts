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

import { Device } from 'Type/Device.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface ProductReviewsContainerMapStateProps {
    isEnabled: boolean;
    isGuestEnabled: boolean;
    device: Device;
}

export interface ProductReviewsContainerMapDispatchProps {
    showInfoNotification: (message: string) => void;
}

export interface ProductReviewsContainerBaseProps {
    product: Partial<IndexedProduct>;
    areDetailsLoaded: boolean;
}

export type ProductReviewsContainerProps = ProductReviewsContainerMapStateProps
& ProductReviewsContainerMapDispatchProps
& ProductReviewsContainerBaseProps;

export interface ProductReviewsComponentProps {
    areDetailsLoaded: boolean;
    device: Device;
    isEnabled: boolean;
    product: Partial<IndexedProduct>;
}
