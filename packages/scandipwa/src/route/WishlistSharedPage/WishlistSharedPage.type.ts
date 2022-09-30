/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { match as Match } from 'react-router';

import {
    MyAccountMyWishlistComponentProps,
    MyAccountMyWishlistContainerBaseProps,
    MyAccountMyWishlistContainerMapDispatchProps,
    MyAccountMyWishlistContainerMapStateProps,
    MyAccountMyWishlistContainerState
} from 'Component/MyAccountMyWishlist/MyAccountMyWishlist.type';
import { Breadcrumb } from 'Store/Breadcrumbs/Breadcrumbs.type';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WishlistSharedPageContainerMapStateProps extends MyAccountMyWishlistContainerMapStateProps {}

export interface WishlistSharedPageContainerMapDispatchProps extends MyAccountMyWishlistContainerMapDispatchProps {
    showNoMatch: () => void;
    updateBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
}

export interface WishlistSharedPageContainerBaseProps extends MyAccountMyWishlistContainerBaseProps {
    code: string;
    match: Match;
}

export type WishlistSharedPageContainerProps =
WishlistSharedPageContainerMapDispatchProps
& WishlistSharedPageContainerMapStateProps
& WishlistSharedPageContainerBaseProps;

export interface WishlistSharedPageContainerState extends MyAccountMyWishlistContainerState {
    creatorsName: string;
    wishlistItems: EmptyObject;
    isWishlistLoading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WishlistSharedPageComponentProps extends MyAccountMyWishlistComponentProps {}
