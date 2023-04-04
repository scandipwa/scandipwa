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

import { OverlayComponentProps } from 'Component/Overlay/Overlay.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { PopupPayload } from 'Store/Popup/Popup.type';
import { Children, Mix } from 'Type/Common.type';

export interface PopupContainerMapStateProps {
    activeOverlay: keyof PopupPayload | '';
    areOtherOverlaysOpen: boolean;
    shouldPopupClose: boolean;
    payload: PopupPayload;
    isMobile: boolean;
}

export interface PopupContainerMapDispatchProps {
    hideActiveOverlay: () => void;
    resetHideActivePopup: () => void;
    changeHeaderState: (state: NavigationState) => void;
    goToPreviousNavigationState: () => void;
}

export interface PopupContainerFunctions {
    onVisible: () => void;
}

export type PopupContainerProps = PopupContainerMapStateProps
& PopupContainerMapDispatchProps
& OverlayComponentProps
& {
    mix: Mix;
    contentMix: Mix;
    onVisible: () => void;
    onClose: () => void;
    onHide: () => void;
    isStatic: boolean;
    children: Children;
    id: string;
    isCloseOnOutsideClick: boolean;
    isHistoryBackHandle: boolean;
};

export type PopupComponentProps = OverlayComponentProps & {
    title?: string;
    isMobile: boolean;
    changeHeaderState: (state: NavigationState) => void;
    goToPreviousNavigationState: () => void;
    resetHideActivePopup: () => void;
    hideActiveOverlay: () => void;
    shouldPopupClose: boolean;
    isCloseOnOutsideClick: boolean;
    isHistoryBackHandle: boolean;
};

export type PopupContainerPropsKeys = 'activeOverlay'
| 'areOtherOverlaysOpen'
| 'changeHeaderState'
| 'children'
| 'id'
| 'isMobile'
| 'isStatic'
| 'mix'
| 'contentMix'
| 'onClose'
| 'onHide'
| 'onVisible'
| 'shouldPopupClose'
| 'hideActiveOverlay'
| 'resetHideActivePopup'
| 'goToPreviousNavigationState'
| 'title'
| 'isCloseOnOutsideClick'
| 'isHistoryBackHandle';
