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

import { DownloadableProductSamples } from 'Query/ProductList.type';

export interface ProductDownloadableSamplesContainerMapStateProps {
    isOpenInNewTab: boolean;
}

export interface ProductDownloadableSamplesContainerMapDispatchProps {}

export interface ProductDownloadableSamplesContainerBaseProps {
    title: string;
    samples: DownloadableProductSamples[];
}

export type ProductDownloadableSamplesContainerProps = ProductDownloadableSamplesContainerMapStateProps
& ProductDownloadableSamplesContainerMapDispatchProps
& ProductDownloadableSamplesContainerBaseProps;

export interface ProductDownloadableSamplesComponentProps {
    title: string;
    samples: DownloadableProductSamples[];
    isOpenInNewTab: boolean;
}

export interface ProductDownloadableSamplesComponentState {}

export interface ProductDownloadableSamplesContainerState {}
