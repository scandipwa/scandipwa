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

import { Location } from 'history';

import { MediaGalleryEntry } from 'Query/ProductList.type';

export interface ProductGalleryBaseImageContainerProps {
    disableZoom: () => void;
    scale: number;
    previousScale: number;
    index: number;
    mediaData: MediaGalleryEntry;
    isZoomEnabled: boolean;
    setTransform: (a: null, b: null, initialScale: number, transformationSpeed: number) => void;
    location: Location;
}

export interface ProductGalleryComponentProps {
    alt: string;
    src?: string;
}
