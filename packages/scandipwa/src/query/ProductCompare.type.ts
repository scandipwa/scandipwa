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
    ComplexTextValue,
    GroupedProductItem,
    ProductItem
} from './ProductList.type';

export interface ProductId {
    product: {
        id: number;
    };
}

export interface ComparableAttribute {
    label: string;
    code: string;
}

export interface ComparableItemAttribute {
    value: string;
    code: string;
}

export interface ComparableProduct extends ProductItem {
    url: string;
    review_count: number;
    rating_summary: number;
    description: ComplexTextValue;
    GroupedProduct: {
        items: GroupedProductItem[];
    };
}

export interface ComparableItem {
    product: ComparableProduct;
    attributes: ComparableItemAttribute[];
}

export interface CompareList {
    uid: string;
    item_count: number;
    attributes: ComparableAttribute[];
    items: ComparableItem[];
}

export interface AssignCompareListToCustomerOutput {
    result: boolean;
    compare_list: CompareList;
}
