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

import { CartItem } from 'Type/MiniCart.type';
import { UrlType } from 'Type/Router.type';

export interface CartItemComponentProps {
    isLoading: boolean;
    item: CartItem;
    currency_code: string;
    isEditing: boolean;
    isCartOverlay: boolean;
    handleRemoveItem: () => void;
    minSaleQuantity: number;
    maxSaleQuantity: number;
    handleChangeQuantity: () => void;
    linkTo: UrlType;
    thumbnail: string;
    isProductInStock: boolean;
    isMobile: boolean;
    optionsLabels: string[];
    isMobileLayout: boolean;
    showLoader: boolean;
}

export interface CartItemContainerProps {
    item: CartItem;
    currency_code: string;
    changeItemQty: () => void;
    removeProduct: () => void;
    updateCrossSellProducts: () => void;
    updateCrossSellsOnRemove: boolean;
    isCartOverlay: boolean;
    isMobile: boolean;
    isEditing: boolean;
    cartId: string;
    onCartItemLoading: () => void;
    showLoader: boolean;
}

export interface CartItemContainerState {
    isLoading: boolean;
}
