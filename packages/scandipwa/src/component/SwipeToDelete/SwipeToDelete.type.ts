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

import { Children, Mix, ReactElement } from 'Type/Common.type';

export interface SwipeToDeleteContainerMapStateProps {
    isMobile: boolean;
}

export interface SwipeToDeleteContainerMapDispatchProps {}

export interface SwipeToDeleteContainerBaseProps {
    children: Children;
    dragRightOpenTriggerThreshold:number;
    dragRightOpenThreshold:number;
    dragItemRemoveThreshold:number;
    animationDuration:number;
    animationDurationOnRemove:number;
    renderRightSideContent: () => ReactElement;
    topElemMix: Mix;
    onAheadOfDragItemRemoveThreshold: () => void;
    isLoading: boolean;
}

export interface SwipeToDeleteContainerProps extends SwipeToDeleteContainerMapStateProps,
    SwipeToDeleteContainerMapDispatchProps,
    SwipeToDeleteContainerBaseProps {}

export interface SwipeToDeleteComponentProps {
    children: Children;
    dragRightOpenTriggerThreshold: number;
    dragRightOpenThreshold: number;
    dragItemRemoveThreshold: number;
    animationDuration:number;
    animationDurationOnRemove:number;
    renderRightSideContent: () => ReactElement;
    topElemMix: Mix;
    onAheadOfDragItemRemoveThreshold: () => void;
    isLoading: boolean;
}

export interface SwipeToDeleteComponentState {
    isRightSideOpen: boolean;
    isAheadRemoveItemThreshold: boolean;
}

export type SwipeToDeleteContainerPropsKeys = 'animationDuration'
| 'animationDurationOnRemove'
| 'children'
| 'dragItemRemoveThreshold'
| 'dragRightOpenThreshold'
| 'dragRightOpenTriggerThreshold'
| 'isLoading'
| 'onAheadOfDragItemRemoveThreshold'
| 'renderRightSideContent'
| 'topElemMix';
