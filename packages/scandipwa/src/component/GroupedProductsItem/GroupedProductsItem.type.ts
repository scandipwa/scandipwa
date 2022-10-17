/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { ProductQuantity } from 'Component/Product/Product.type';
import { ProductItem } from 'Query/ProductList.type';

export interface GroupedProductsItemContainerFunctions {
    setQuantity: (quantity: number) => void;
}

export interface GroupedProductsItemContainerProps {
    product: ProductItem;
    quantity: ProductQuantity;
    setQuantity: (quantity: ProductQuantity) => void;
    defaultQuantity: number;
}

export interface GroupedProductsItemComponentProps {
    itemCount: number;
    product: ProductItem;
    setQuantity: (quantity: number) => void;
}

export type GroupedProductsItemComponentContainerPropKeys =
| 'itemCount'
| 'product';
