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

import { ComponentType } from 'react';

import { PopupPayloadDefault } from 'Store/Popup/Popup.type';

export interface VideoPopupContainerMapStateProps {
    payload: VideoPopupPayload;
}

export interface VideoPopupContainerMapDispatchProps {}

export interface VideoPopupComponentProps {
    payload: VideoPopupPayload;
}

export interface VideoPopupPayload extends PopupPayloadDefault {
    media: {
        video_content: {
            video_url: string;
        };
    };
}

export type VimeoComponent = ComponentType<{
    videoId: string;
    autoplay: boolean;
}>;

export type YouTubeComponent = ComponentType<{
    videoId?: string;
    containerClassName?: string;
    className?: string;
    opts?: { playerVars?: { autoplay?: 0 | 1 | undefined } };
}>;
