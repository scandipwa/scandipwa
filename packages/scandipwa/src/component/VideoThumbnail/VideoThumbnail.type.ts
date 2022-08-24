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

import { MouseEvent } from 'react';

import { MediaGalleryEntry } from 'Query/ProductList.type';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VideoThumbnailContainerMapStateProps {}

export interface VideoThumbnailContainerMapDispatchProps {
    showPopup: (payload: PopupPayload) => void;
    hideActivePopup: () => void;
}

export interface VideoThumbnailContainerFunctions {
    onPlayClick: (event: MouseEvent) => void;
}

export interface VideoThumbnailContainerBaseProps {
    media: MediaGalleryEntry;
    isVideoZoomed: boolean;
    onZoomedVideoClick: (isImageZoomPopupActive: boolean) => void;
}

export type VideoThumbnailContainerProps = VideoThumbnailContainerMapStateProps
& VideoThumbnailContainerMapDispatchProps
& VideoThumbnailContainerBaseProps;

export interface VideoThumbnailComponent extends VideoThumbnailContainerFunctions {
    media: MediaGalleryEntry;
}

export interface PopupPayload {
    media: MediaGalleryEntry;
    title: string;
}
