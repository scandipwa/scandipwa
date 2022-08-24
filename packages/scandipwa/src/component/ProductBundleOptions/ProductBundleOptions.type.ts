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

import { IndexedBundleItem } from 'Util/Product/Product.type';

export interface ProductBundleOptionsContainerProps {
    options: IndexedBundleItem[];
    updateSelectedValues: () => void;
}

export interface ProductBundleOptionsComponentProps {
    options: IndexedBundleItem[];
    updateSelectedValues: () => void;
}
