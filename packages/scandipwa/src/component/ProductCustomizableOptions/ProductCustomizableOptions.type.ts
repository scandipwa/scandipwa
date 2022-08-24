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

import { ProductOption } from 'Component/Product/Product.type';
import { IndexedCustomOption } from 'Util/Product/Product.type';

export interface ProductCustomizableOptionsContainerProps {
    options: IndexedCustomOption[];
    updateSelectedValues: (data?: Partial<ProductOption>) => void;
}

export interface ProductCustomizableOptionsComponentProps {
    options: IndexedCustomOption[];
    updateSelectedValues: (data?: Partial<ProductOption>) => void;
}
