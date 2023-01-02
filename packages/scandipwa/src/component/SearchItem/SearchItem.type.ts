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

import { Url } from 'Type/Common.type';
import { IndexedAttributeWithValue, IndexedProduct } from 'Util/Product/Product.type';

export interface SearchItemContainerMapStateProps {}

export interface SearchItemContainerMapDispatchProps {
    hideActiveOverlay: () => void;
}

export interface SearchItemContainerFunctions {
    onClick: () => void;
}

export interface SearchItemContainerBaseProps {
    product: Partial<IndexedProduct>;
}

export type SearchItemContainerProps = SearchItemContainerMapStateProps
& SearchItemContainerMapDispatchProps
& SearchItemContainerBaseProps;

export interface SearchItemComponentProps extends SearchItemContainerFunctions {
    product: Partial<IndexedProduct>;
    linkTo: Url;
    imgSrc: string;
    customAttribute: IndexedAttributeWithValue | null;
}

export type SearchItemComponentContainerPropKeys =
    | 'product'
    | 'linkTo'
    | 'imgSrc'
    | 'customAttribute';

export interface SearchItemComponentState {}

export interface SearchItemContainerState {}
