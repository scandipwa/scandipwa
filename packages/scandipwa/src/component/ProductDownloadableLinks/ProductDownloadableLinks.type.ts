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

import { DownloadableProductLinks } from 'Query/ProductList.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';

export interface ProductDownloadableLinksContainerMapStateProps {
    isOpenInNewTab: boolean;
    currencyCode: GQLCurrencyEnum;
}


export interface ProductDownloadableLinksContainerMapDispatchProps {}

export interface ProductDownloadableLinksContainerBaseProps {
    title: string;
    isRequired: boolean;
    links: DownloadableProductLinks[];
    setLinkedDownloadables: (links: string[]) => void;
}

export interface ProductDownloadableLinksContainerFunctions {
    setSelectedCheckboxValues: () => void;
    setRef: (elem: HTMLElement | null) => void;
}

export type ProductDownloadableLinksContainerProps = ProductDownloadableLinksContainerMapStateProps
& ProductDownloadableLinksContainerMapDispatchProps
& ProductDownloadableLinksContainerBaseProps;

export interface ProductDownloadableLinksContainerState {
    isLoading: boolean;
    selectedLinks: string[];
}

export interface ProductDownloadableLinksComponentProps
    extends ProductDownloadableLinksContainerFunctions {
    isOpenInNewTab: boolean;
    isRequired: boolean;
    links: DownloadableProductLinks[];
    title: string;
    isLoading: boolean;
    selectedLinks: string[];
    currencyCode: GQLCurrencyEnum;
}

export type ProductDownloadableLinksComponentContainerPropKeys =
    | 'isOpenInNewTab'
    | 'isRequired'
    | 'links'
    | 'title'
    | 'isLoading'
    | 'selectedLinks'
    | 'currencyCode';
