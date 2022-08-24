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

import { RouteComponentProps } from 'react-router';

import { ProductItem } from 'Query/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface StyleGuidePageContainerMapStateProps {
    product: Partial<IndexedProduct>;
}

export interface StyleGuidePageContainerMapDispatchProps {
    updateProductDetails: (product: ProductItem) => void;
}

export type StyleGuidePageContainerProps = StyleGuidePageContainerMapStateProps
& StyleGuidePageContainerMapDispatchProps
& RouteComponentProps;

export interface StyleGuidePageComponentProps {
    fakeFunction: () => string;
    product: Partial<IndexedProduct>;
}
