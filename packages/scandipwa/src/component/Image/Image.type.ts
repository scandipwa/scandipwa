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

import { RefObject } from 'react';

import { Mix } from 'Type/Common.type';

export enum ImageRatio {
    IMG_4X3 = '4x3',
    IMG_16X9 = '16x9',
    IMG_SQUARE = 'square',
    IMG_CUSTOM = 'custom'
}

export interface ImageContainerProps {
    isPlaceholder: boolean;
    src: string | null;
    style: Record<string, string>;
    width: string;
    height: string;
    alt: string;
    ratio: ImageRatio;
    mix: Mix;
    className: string;
    imageRef: RefObject<HTMLImageElement>;
    title: string;
    isPlain: boolean;
    showIsLoading: boolean;
}

export interface ImageComponentProps {
    style: Record<string, string>;
    wrapperSize: Partial<WrapperSize>;
    isPlaceholder: boolean;
    src: string | null;
    title: string;
    alt: string;
    className: string;
    ratio: ImageRatio;
    mix: Mix;
    imageRef: RefObject<HTMLImageElement>;
    isPlain: boolean;
    showIsLoading: boolean;
    isCached: boolean;
}

export interface ImageSize {
    width: string;
    height: string;
}

export interface WrapperSize {
    paddingBottom: string;
}
