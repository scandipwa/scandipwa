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

import { ProductStore } from 'Store/Product/Product.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface StyleGuidePageContainerMapStateProps {
    product: Partial<IndexedProduct>;
}

export interface StyleGuidePageContainerMapDispatchProps {
    updateProductStore: (state: Partial<ProductStore>) => void;
}

export type StyleGuidePageContainerProps = StyleGuidePageContainerMapStateProps
& StyleGuidePageContainerMapDispatchProps;

export interface StyleGuidePageComponentProps {
    fakeFunction: () => string;
    product: Partial<IndexedProduct>;
}
