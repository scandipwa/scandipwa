/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.number (Open Software License ("OSL") v. 3.number)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { MouseEvent, RefObject } from 'react';

import { Children, Mix } from 'Type/Common.type';

export interface DraggableComponentProps {
    shiftX: number;
    shiftY: number;
    onDragStart: () => void;
    onClick: (
        state: DraggableComponentState,
        callback: (state: Partial<DraggableComponentState>) => void,
        event: MouseEvent
    ) => void;
    onDragEnd: (
        state: DraggableComponentState,
        callback:(newState: Partial<DraggableComponentState>) => void
    ) => void;
    handleFocus: () => void;
    handleKey: () => void;
    onDrag: (state: DraggableComponentState & { clientX: number; clientY: number }) => void;
    children: Children;
    mix: Mix;
    draggableRef: RefObject<HTMLDivElement>;
}

export interface DraggableComponentState {
    isDragging: boolean;
    originalX: number;
    translateX: number;
    lastTranslateX: number;
    originalY: number;
    translateY: number;
    lastTranslateY: number;
}
