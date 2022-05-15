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

import { PopupPayload } from 'Store/Popup/Popup.type';
import { Mix, ReactElement } from 'Type/Common.type';

export interface OverlayContainerMapStateProps {
    activeOverlay: keyof PopupPayload;
    areOtherOverlaysOpen: boolean;
    isMobile: boolean;
}

export interface OverlayContainerMapDispatchProps {}

export type OverlayComponentProps = OverlayContainerMapStateProps
& OverlayContainerMapDispatchProps
& {
    mix: Mix;
    contentMix?: Mix;
    onVisible: () => void;
    onClose?: () => void;
    onHide?: () => void;
    isStatic?: boolean;
    children?: (ReactElement | Element)[];
    id: string;
    isRenderInPortal?: boolean;
};
