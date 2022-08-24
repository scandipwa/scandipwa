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

import { ReactNode, RefObject } from 'react';

import { DraggableComponentState } from 'Component/Draggable/Draggable.type';
import { Mix } from 'Type/Common.type';
import { Device } from 'Type/Device.type';

export interface SliderContainerMapStateProps {
    device: Device;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SliderContainerMapDispatchProps {}

export interface SliderComponentBaseProps {
    showCrumbs: boolean;
    showArrows: boolean;
    showCounter: boolean;
    activeImage: number;
    onActiveImageChange: (activeImage: number) => void;
    mix: Mix;
    children: ReactNode[];
    isInteractionDisabled: boolean;
    onClick: (state?: DraggableComponentState & { clientX: number; clientY: number }) => void;
    isVertical: boolean;
    isHeightTransitionDisabledOnMount: boolean;
    sliderHeight: string | number;
    sliderRef: RefObject<HTMLDivElement> | null;
}

export type SliderComponentProps = SliderContainerMapStateProps
& SliderContainerMapDispatchProps
& SliderComponentBaseProps;

export interface SliderComponentState {
    prevActiveImage: number;
}

export interface SliderHandleDragEndCallback {
    callback: () => void;
}
