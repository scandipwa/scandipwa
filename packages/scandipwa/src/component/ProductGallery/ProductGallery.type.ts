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

import { Location } from 'history';
import { RefObject } from 'react';

import { MediaGalleryEntry } from 'Query/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface ProductGalleryContainerMapStateProps {
    isMobile: boolean;
}

export interface ProductGalleryContainerMapDispatchProps {}

export interface ProductGalleryContainerBaseProps {
    product: Partial<IndexedProduct>;
    areDetailsLoaded: boolean;
    isMobile: boolean;
    isZoomEnabled: boolean;
    showLoader: boolean;
    isWithEmptySwitcher: boolean;
}

export interface ProductGalleryContainerFunctions {
    onActiveImageChange: (activeImage: number) => void;
    handleZoomChange: (args: { scale: number }) => void;
    disableZoom: () => void;
    handleImageZoomPopupActiveChange: (isImageZoomPopupActive: boolean) => void;
}

export type ProductGalleryContainerProps = ProductGalleryContainerMapStateProps
& ProductGalleryContainerMapDispatchProps
& ProductGalleryContainerBaseProps;

export interface ProductGalleryContainerState {
    activeImage: number;
    isZoomEnabled: boolean;
    prevProdId?: number;
    isImageZoomPopupActive: boolean;
}

export interface ProductGalleryComponentProps
    extends ProductGalleryContainerFunctions {
    gallery: MediaGalleryEntry[];
    productName: string;
    activeImage: number;
    isZoomEnabled: boolean;
    productId?: number;
    isMobile: boolean;
    isImageZoomPopupActive: boolean;
    sliderRef: RefObject<SliderWithDraggableRef>;
    isWithEmptySwitcher: boolean;
    showLoader: boolean;
    registerSharedElementDestination: (element: RefObject<HTMLElement>) => void;
    location?: Location;
}

export type ProductGalleryComponentContainerPropKeys =
    | 'gallery'
    | 'productName'
    | 'activeImage'
    | 'isZoomEnabled'
    | 'productId'
    | 'isMobile'
    | 'isImageZoomPopupActive'
    | 'sliderRef'
    | 'isWithEmptySwitcher'
    | 'showLoader';

export interface ProductGalleryComponentState {
    scrollEnabled: boolean;
    slidesCount: number;
    prevZoom: boolean;
}

export interface SliderWithDraggableRef extends HTMLDivElement {
    draggableRef: RefObject<HTMLElement>;
}

export interface TransformRenderFnProps {
    scale: number;
    previousScale: number;
    resetTransform: () => void;
    setTransform: (a: null, b: null, initialScale: number, transformationSpeed: number) => void;
}

export interface SharedTransitionContainerRenderFnProps {
    registerSharedElementDestination: (element: RefObject<HTMLElement>) => void;
}
