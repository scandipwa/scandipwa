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

import { MouseEvent } from 'react';
import { Dispatch } from 'redux';

import {
    Children,
    Mix,
    Mods,
    Url,
} from 'Type/Common.type';

export interface LinkContainerMapStateProps {
    baseLinkUrl: string;
}

export interface LinkContainerDispatchProps {
    updateNoMatch: (noMatch: boolean) => void;
}

export interface LinkContainerFunctions {
    onClick: (e: MouseEvent) => void;
}

export type LinkContainerProps =
    LinkContainerMapStateProps & LinkContainerDispatchProps & {
        onClick: (e: MouseEvent) => void;
        to: Url | string;
        children: Children;
        isOpenInNewTab?: boolean;
        className?: string;
        block?: string;
        elem?: string;
        mods?: Mods;
        mix?: Mix;
        dispatch?: Dispatch;
        id?: string;
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
        tabIndex?: number;
    };

export interface LinkComponentProps {
    to: Url | string;
    children: Children;
    onClick: (e: MouseEvent) => void;
    bemProps: Mix & { mix?: Mix };
    className?: string;
    isOpenInNewTab?: boolean;
    id?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    tabIndex?: number;
}

export interface LinkComponentState {}

export interface LinkContainerState {}
