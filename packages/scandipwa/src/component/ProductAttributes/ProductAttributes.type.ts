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

import { IndexedAttributeWithValue, IndexedProduct } from 'Util/Product/Product.type';

export interface ProductAttributesContainerProps {
    product: Partial<IndexedProduct>;
    areDetailsLoaded: boolean;
}

export interface ProductAttributesComponentProps {
    areDetailsLoaded: boolean;
    attributesWithValues: Record<string, IndexedAttributeWithValue>;
}
