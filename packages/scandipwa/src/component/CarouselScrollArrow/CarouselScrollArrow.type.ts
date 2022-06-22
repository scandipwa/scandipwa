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

import { Mods } from 'Type/Common.type';

export interface CarouselScrollArrowContainerFunctions {
    onClick: () => void;
}

export interface CarouselScrollArrowContainerProps {
    isNextArrow: boolean;
    onClick: (isNextArrow: boolean) => void;
    isInvisible: boolean;
}

export interface CarouselScrollArrowComponentProps {
    mods: Mods;
    onClick: () => void;
}

export type CarouselScrollArrowComponentContainerPropKeys = 'mods';
