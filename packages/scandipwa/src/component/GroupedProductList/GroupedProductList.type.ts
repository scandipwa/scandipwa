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
import { IndexedProduct } from 'Util/Product/Product.type';

export interface GroupedProductListComponentProps {
    product: IndexedProduct;
    quantity: ProductQuantity;
    setQuantity: (quantity: ProductQuantity) => void;
}

export interface GroupedProductListComponentState {}

export interface GroupedProductListContainerState {}
