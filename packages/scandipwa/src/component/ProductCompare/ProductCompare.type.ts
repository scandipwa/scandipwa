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

import { RefObject } from 'react';

import { ComparableAttribute, ComparableItem, ComparableProduct } from 'Query/ProductCompare.type';
import { Device } from 'Type/Device.type';
import { StockCheckProduct } from 'Util/Product/Product.type';

export interface ProductCompareContainerMapStateProps {
    products: ComparableProduct[];
    items: ComparableItem[];
    attributes: ComparableAttribute[];
    isLoading: boolean;
    device: Device;
}

export interface ProductCompareContainerMapDispatchProps {
    fetchCompareList: () => void;
    clearCompareList: () => void;
}

export interface ProductCompareContainerFunctions {
    getAttributes: () => ProductCompareAttributeShape[];
    clearCompareList: () => void;
    isInStock: (product: Partial<StockCheckProduct>, parentProduct?: Partial<StockCheckProduct> | undefined) => boolean;
    handleScroll: () => void;
    handleBlockScroll: () => void;
}

export type ProductCompareContainerProps = ProductCompareContainerMapStateProps
& ProductCompareContainerMapDispatchProps;

export interface ProductCompareComponentProps {
    isLoading: boolean;
    products: ComparableProduct[];
    device: Device;
    getAttributes: () => ProductCompareAttributeShape[];
    clearCompareList: () => void;
    isInStock: (product: Partial<StockCheckProduct>, parentProduct?: Partial<StockCheckProduct> | undefined) => boolean;
    handleScroll: () => void;
    handleBlockScroll: () => void;
    scrollerScroll: RefObject<HTMLDivElement>;
    productCompare: RefObject<HTMLDivElement>;
    productCompareRow: RefObject<HTMLDivElement>;
    scrollerContent: RefObject<HTMLDivElement>;
}

export type ProductCompareComponentContainerPropKeys =
    | 'isLoading'
    | 'products'
    | 'device'
    | 'scrollerScroll'
    | 'productCompare'
    | 'productCompareRow'
    | 'scrollerContent';

export interface ProductCompareAttributeShape {
    attribute_id: string;
    attribute_code: string;
    attribute_label: string;
    attribute_values: string[];
}
