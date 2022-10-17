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

import { Children, Mix } from 'Type/Common.type';

export interface ImageZoomPopupContainerMapStateProps {
    isMobile: boolean;
}

export interface ImageZoomPopupContainerMapDispatchProps {
    showPopup: (id: string, payload: Record<string, string>) => void;
    hideActiveOverlay: () => void;
}

export interface ImageZoomPopupContainerBaseProps {
    onClose: () => void;
    popupId: string;
    isActive: boolean;
    activeImageId: number;
    mix: Mix;
    children: Children;
}

export type ImageZoomPopupContainerProps = ImageZoomPopupContainerMapStateProps
& ImageZoomPopupContainerMapDispatchProps
& ImageZoomPopupContainerBaseProps;

export interface ImageZoomPopupComponentProps {
    children: Children;
    activeImageId: number;
}
