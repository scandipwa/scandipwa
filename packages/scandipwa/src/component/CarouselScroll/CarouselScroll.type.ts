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

import { Children } from 'Type/Common.type';

export interface CarouselScrollComponentProps {
    children: Children;
    showArrow: boolean;
    showedItemCount: number;
    onChange: (activeItem: string) => void;
    activeItemId: number;
    isImageZoomPopupActive: boolean;
}

export interface CarouselScrollComponentState {
    activeItemId: number;
    firstCarouselItemId: number;
}
