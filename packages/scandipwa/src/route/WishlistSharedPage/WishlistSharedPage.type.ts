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

import {
    MyAccountMyWishlistComponentProps,
    MyAccountMyWishlistContainerState
} from 'Component/MyAccountMyWishlist/MyAccountMyWishlist.type';
import { Breadcrumb } from 'Store/Breadcrumbs/Breadcrumbs.type';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WishlistSharedPageContainerMapStateProps {}

export interface WishlistSharedPageContainerMapDispatchProps {
    clearWishlist: () => void;
    moveWishlistToCart: (sharingCode?: string) => Promise<void>;
    showNotification: (message: string) => void;
    showError:(message: string) => void;
    showNoMatch: () => void;
    updateBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
}

export type WishlistSharedPageContainerProps =
WishlistSharedPageContainerMapDispatchProps
& WishlistSharedPageContainerMapStateProps
& { code: string };

export interface WishlistSharedPageContainerState extends MyAccountMyWishlistContainerState {
    creatorsName: string;
    wishlistItems: Record<string, never>;
    isWishlistLoading: boolean;
    isLoading: boolean;
}

export type WishlistSharedPageComponentProps = MyAccountMyWishlistComponentProps;
