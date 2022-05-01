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

import { RefObject } from 'react';

import { ProductItem } from 'Query/ProductList.type';
import { Device } from 'Type/Device.type';
import { FieldValue } from 'Util/Form/Form.type';

export interface ProductContainerMapStateProps {
    cartId: string;
    device: Device;
    isWishlistEnabled: boolean;
}

export interface ProductContainerMapDispatchProps {
    addProductToCart: (options) => void;
    showError: (message: string) => void;
}

export interface ProductContainerBaseProps {
    product: ProductItem;
    configFormRef: RefObject<HTMLElement>;
    parameters;
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
    selectedOptions: FieldValue[];
    addToCartTriggeredWithError: boolean;
    downloadableLinks;
    quantity: ProductQuantity;
    adjustedPrice;
    selectedProduct: ProductItem | null;
    parameters;
    unselectedOptions;
    currentProductSKU: string;
    activeProduct;
}

export type ProductQuantity = number | Record<number, number>;

export type ProductOption = {
    uid: string;
    value: FieldValue;
};
