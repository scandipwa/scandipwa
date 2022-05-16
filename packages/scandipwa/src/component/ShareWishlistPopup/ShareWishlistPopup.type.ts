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

import { GQLShareWishlistInput } from 'Type/Graphql.type';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ShareWishlistPopupContainerMapStateProps {}

export interface ShareWishlistPopupContainerMapDispatchProps {
    showNotification: (message: string) => void;
    showError: (message: string) => void;
    hidePopup: () => void;
    goToPreviousNavigationState: () => void;
}

export type ShareWishlistPopupContainerProps = ShareWishlistPopupContainerMapStateProps
& ShareWishlistPopupContainerMapDispatchProps;

export interface ShareWishlistPopupContainerState {
    isLoading: boolean;
}

export interface ShareWishlistPopupComponentProps {
    handleFormData: (fields: GQLShareWishlistInput) => void;
    isFormLoading: boolean;
}

export type ShareWishlistPopupContainerPropsKeys = 'isFormLoading';
