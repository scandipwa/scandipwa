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

import { ComparableAttribute, ComparableItem, ComparableProduct } from 'Query/ProductCompare.type';
import { Device } from 'Type/Device.type';
import { IndexedProduct } from 'Util/Product/Product.type';

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

export type ProductCompareContainerProps = ProductCompareContainerMapStateProps
& ProductCompareContainerMapDispatchProps;

export interface ProductCompareComponentProps {
    isLoading: boolean;
    products: ComparableProduct[];
    device: Device;
    getAttributes: () => ProductCompareAttributeShape[];
    clearCompareList: () => void;
    isInStock: (product: Partial<IndexedProduct>, parentProduct?: IndexedProduct | undefined) => boolean;
    handleScroll: () => void;
    handleBlockScroll: () => void;
}

export type ProductCompareComponentContainerPropKeys =
    | 'isLoading'
    | 'products'
    | 'device';

export interface ProductCompareAttributeShape {
    attribute_id: string;
    attribute_code: string;
    attribute_label: string;
    attribute_values: string[];
}
