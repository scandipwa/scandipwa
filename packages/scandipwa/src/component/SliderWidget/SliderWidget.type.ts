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

import { Directions } from 'Component/ChevronIcon/ChevronIcon.config';
import { Slide, Slider } from 'Query/Slider.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { Merge } from 'Type/Common.type';
import { Device } from 'Type/Device.type';

export interface SliderWidgetContainerMapStateProps {
    device: Device;
    isOffline: boolean;
}

export interface SliderWidgetContainerMapDispatchProps {
    showNotification: (type: NotificationType, title: string, error: unknown) => void;
}

export type SliderWidgetContainerProps = SliderWidgetContainerMapStateProps
& SliderWidgetContainerMapDispatchProps
& {
    sliderId: number;
};

export interface SliderWidgetContainerState {
    slider: Partial<EnhancedSlider>;
}

export interface SliderWidgetComponentProps {
    device: Device;
    slider: Partial<EnhancedSlider>;
}

export interface SliderWidgetComponentState {
    activeImage: number;
    carouselDirection: Directions;
}

export type EnhancedSlider = Merge<Slider, {
    slides: SlideWithPlaceholder[];
}>;

export type SlideWithPlaceholder = Merge<Slide, {
    isPlaceholder?: boolean;
}>;
