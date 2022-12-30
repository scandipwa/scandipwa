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

import { ProductItem } from './ProductList.type';

export interface ItemOption {
    label: string;
    value: string;
}

export interface WishlistQueryProps {
    sharingCode?: string;
    currentPage?: number;
    productsPerPage?: number;
}

export interface WishlistItem {
    id: string;
    sku: string;
    qty: number;
    description: string;
    price: number;
    price_without_tax: number;
    buy_request: string;
    options: ItemOption[];
    product: ProductItem;
}

export interface WishlistPageInfo {
    current_page: number;
    total_pages: number;
}

export interface WishlistItems {
    items: WishlistItem[];
    page_info: WishlistPageInfo;
}

export interface Wishlist {
    id: number;
    updated_at: string;
    items_count: number;
    creators_name: string;
    items_v2: WishlistItems;
}

export interface WishListUserInputError {
    message: string;
    code: string;
}
