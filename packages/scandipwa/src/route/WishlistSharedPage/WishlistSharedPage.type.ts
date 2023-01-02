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
    MyAccountMyWishlistComponentState,
    MyAccountMyWishlistContainerBaseProps,
    MyAccountMyWishlistContainerMapDispatchProps,
    MyAccountMyWishlistContainerMapStateProps,
    MyAccountMyWishlistContainerState,
} from 'Component/MyAccountMyWishlist/MyAccountMyWishlist.type';
import { Breadcrumb } from 'Store/Breadcrumbs/Breadcrumbs.type';

export interface WishlistSharedPageContainerMapStateProps extends MyAccountMyWishlistContainerMapStateProps {}

export interface WishlistSharedPageContainerMapDispatchProps extends MyAccountMyWishlistContainerMapDispatchProps {
    showNoMatch: () => void;
    updateBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
}

export interface WishlistSharedPageContainerBaseProps extends MyAccountMyWishlistContainerBaseProps {
    code: string;
    match: Match;
}

export interface WishlistSharedPageContainerProps extends
    WishlistSharedPageContainerMapDispatchProps,
    WishlistSharedPageContainerMapStateProps,
    WishlistSharedPageContainerBaseProps {}

export interface WishlistSharedPageComponentState extends MyAccountMyWishlistComponentState {}

export interface WishlistSharedPageContainerState extends MyAccountMyWishlistContainerState {
    creatorsName: string;
    wishlistItems: EmptyObject;
    isWishlistLoading: boolean;
}

export interface WishlistSharedPageComponentProps extends MyAccountMyWishlistComponentProps {}
