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

import { Children } from 'Type/Common.type';

export interface CarouselScrollItemContainerProps {
    isActive: boolean;
    itemRef: RefObject<HTMLDivElement>;
    onClick: (position: number) => void;
    children: Children;
    position: number;
}

export interface CarouselScrollItemComponentProps {
    isActive: boolean;
    itemRef: RefObject<HTMLDivElement>;
    children: Children;
    onClick: () => void;
}

export type CarouselScrollItemComponentContainerPropKeys =
    | 'isActive'
    | 'itemRef'
    | 'children';
