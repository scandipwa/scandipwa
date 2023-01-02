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

import { PriceRange } from 'Query/ProductList.type';
import { AddProductToCartOptions } from 'Store/Cart/Cart.type';
import { Device } from 'Type/Device.type';
import { IndexedProduct, ProductExtractPrice, ProductTransformData } from 'Util/Product/Product.type';

export interface ProductContainerMapStateProps {
    cartId: string;
    device: Device;
    isWishlistEnabled: boolean;
}

export interface ProductContainerMapDispatchProps {
    addProductToCart: (options: AddProductToCartOptions) => Promise<void>;
    showError: (message: string) => void;
}

export interface ProductContainerBaseProps {
    product: IndexedProduct;
    configFormRef?: RefObject<HTMLFormElement>;
    parameters: Record<string, string>;
    cartId: string;
    device: Device;
    isWishlistEnabled: boolean;
    defaultEnteredOptions: string[];
    defaultSelectedOptions: string[];
}

export type ProductContainerProps = ProductContainerMapStateProps
& ProductContainerMapDispatchProps
& ProductContainerBaseProps;

export interface ProductContainerState {
    enteredOptions: ProductOption[];
    selectedOptions: string[];
    addToCartTriggeredWithError: boolean;
    downloadableLinks: string[];
    quantity: ProductQuantity;
    adjustedPrice: Partial<AdjustedPriceMap>;
    selectedProduct: IndexedProduct | null;
    parameters: Record<string, string>;
    unselectedOptions: string[];
    currentProductSKU: string;
    activeProduct: IndexedProduct | null;
}

export interface ProductContainerFunctions {
    setQuantity: (quantity: ProductQuantity) => void;
    addToCart: (options?: AddProductToCartOptions) => Promise<void>;
    updateSelectedValues: (data?: Partial<ProductOption>) => void;
    setAdjustedPrice: (type: keyof AdjustedPriceMap, amount: number) => void;
    setDownloadableLinks: (links: string[]) => void;
    updateAddToCartTriggeredWithError: () => void;
    getActiveProduct: () => IndexedProduct;
    setActiveProduct: (key: string, value: ConfigurableProductSelectedVariantValue, checkEmptyValue?: boolean) => void;
    getMagentoProduct: () => ProductTransformData[];
    setValidator: (elem: HTMLElement) => void;
    scrollOptionsIntoView: () => void;
}

export interface ProductComponentProps extends ProductContainerFunctions {
    isWishlistEnabled: boolean;
    unselectedOptions: string[];
    quantity: ProductQuantity;
    product: IndexedProduct;
    configFormRef?: RefObject<HTMLFormElement>;
    parameters: Record<string, string>;
    device: Device;
    magentoProduct: ProductTransformData[];
    addToCartTriggeredWithError: boolean;
    inStock: boolean;
    maxQuantity: number;
    minQuantity: number;
    productName: string;
    productPrice: Partial<ProductExtractPrice>;
}

export type ProductContainerPropKeys =
    | 'isWishlistEnabled'
    | 'unselectedOptions'
    | 'quantity'
    | 'product'
    | 'configFormRef'
    | 'parameters'
    | 'device'
    | 'magentoProduct'
    | 'addToCartTriggeredWithError'
    | 'inStock'
    | 'maxQuantity'
    | 'minQuantity'
    | 'productName'
    | 'productPrice';

export type ProductQuantity = number | Record<number, number>;

export interface ProductOption {
    uid: string;
    value: string;
}

export interface AdjustedPrice {
    exclTax: number;
    inclTax: number;
    requiresDiscountCalculations: boolean;
    hasDiscountCalculated: boolean;
}

export interface AdjustedPriceMap {
    downloadable: AdjustedPrice;
    bundle: AdjustedPrice;
    config: AdjustedPrice;
}

export interface ProductPrice {
    minimum_price: Partial<PriceRange>;
    maximum_price: Partial<PriceRange>;
}

export type ConfigurableProductSelectedVariantValue = string | number | boolean;

export interface ProductComponentState {}
