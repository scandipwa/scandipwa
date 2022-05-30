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

import { IndexedProduct } from 'Util/Product/Product.type';

export interface TierPricesComponentProps {
    product: Partial<IndexedProduct>;
    isLowestPrice: boolean;
}
