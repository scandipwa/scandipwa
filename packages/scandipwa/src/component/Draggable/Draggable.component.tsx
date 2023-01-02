/* eslint-disable react/no-unused-state */
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

import { MouseEvent, PureComponent, TouchEvent as ReactTouchEvent } from 'react';

import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import { DraggableComponentProps, DraggableComponentState } from './Draggable.type';

import './Draggable.style';

/** @namespace Component/Draggable/Component */
export class DraggableComponent<
P extends Readonly<DraggableComponentProps> = Readonly<DraggableComponentProps>,
S extends DraggableComponentState = DraggableComponentState,
> extends PureComponent <P, S> {
    static defaultProps: Partial<DraggableComponentProps> = {
        shiftX: 0,
        shiftY: 0,
        onDragStart: noopFn,
        onDragEnd: (
            state: DraggableComponentState,
            callback: (newState: Partial<DraggableComponentState & { shiftX: number; shiftY: number }>) => unknown,
        ): void => {
            const { translateX, translateY } = state;

            callback({
                originalX: 0,
                originalY: 0,
                shiftX: translateX,
                shiftY: translateY,
            });
        },
        onClick: noopFn,
        onDrag: noopFn,
        handleFocus: noopFn,
        handleKey: noopFn,
        draggableRef: undefined,
        mix: {},
    };

    state: S = {
        isDragging: false,
        originalX: 0,
        translateX: 0,
        lastTranslateX: 0,
        originalY: 0,
        translateY: 0,
        lastTranslateY: 0,
    } as S;

    __construct(props: P): void {
        super.__construct?.(props);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    static getDerivedStateFromProps(
        props: DraggableComponentProps,
        state: DraggableComponentState,
    ): Partial<DraggableComponentState> | null {
        const { shiftX, shiftY } = props;
        const { lastTranslateX, lastTranslateY } = state;

        if (shiftX !== lastTranslateX || shiftY !== lastTranslateY) {
            return {
                lastTranslateX: shiftX,
                lastTranslateY: shiftY,
            };
        }

        return null;
    }

    componentWillUnmount(): void {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleTouchEnd);
    }

    handleTouchStart({ touches }: ReactTouchEvent): void {
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleTouchEnd);

        if (touches.length === 1) {
            this.handleDragStart(touches[0]);
        }
    }

    handleMouseDown(event: MouseEvent): void {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);

        event.preventDefault();
        this.handleDragStart(event);
    }

    handleTouchMove({ touches }: TouchEvent): void {
        if (touches.length === 1) {
            this.handleMouseMove(touches[0]);
        }
    }

    handleMouseMove({ clientX, clientY }: MouseEventInit): void {
        const { isDragging } = this.state;
        const { shiftX, shiftY } = this.props;

        if (!isDragging || clientX === undefined || clientY === undefined) {
            return;
        }

        this.setState(({
            originalX,
            originalY,
        }) => ({
            translateX: clientX - originalX + shiftX,
            translateY: clientY - originalY + shiftY,
        }), () => {
            const { onDrag } = this.props;

            if (onDrag) {
                onDrag({ ...this.state, clientX, clientY });
            }
        });
    }

    handleTouchEnd(): void {
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleTouchEnd);

        this.handleDragEnd();
    }

    handleMouseUp(): void {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);

        this.handleDragEnd();
    }

    handleClick(event: MouseEvent): void {
        const { onClick } = this.props;

        if (onClick) {
            onClick(
                this.state,
                (newState) => this.setState({
                    ...newState,
                    isDragging: false,
                    translateX: 0,
                    translateY: 0,
                } as DraggableComponentState),
                event,
            );
        }
    }

    handleDragStart({
        clientX,
        clientY,
    }: MouseEvent | MouseEventInit): void {
        const { onDragStart } = this.props;

        if (typeof clientX === 'undefined' || typeof clientY === 'undefined') {
            return;
        }

        if (onDragStart) {
            onDragStart();
        }

        this.setState({
            originalX: clientX,
            originalY: clientY,
            isDragging: true,
        });
    }

    handleDragEnd(): void {
        const { onDragEnd } = this.props;

        onDragEnd(this.state, (
            newState: Partial<DraggableComponentState>,
        ) => this.setState<keyof typeof newState>({
            ...newState,
            isDragging: false,
            translateX: 0,
            translateY: 0,
        } as DraggableComponentState));

        // TO STAY WHERE RELEASED
        // originalX: 0,
        // lastTranslateX: translateX,
        // originalY: 0,
        // lastTranslateY: translateY,

        // TO RETURN INTO INITIAL
        // originalX: 0,
        // lastTranslateX: 0
        // originalY: 0,
        // lastTranslateY: 0
    }

    render(): ReactElement {
        const {
            children,
            handleFocus,
            handleKey,
            draggableRef,
            mix,
        } = this.props;

        return (
            <div
              block="Draggable"
              mix={ mix }
              ref={ draggableRef }
              onMouseDown={ this.handleMouseDown }
              onTouchStart={ this.handleTouchStart }
              onClick={ this.handleClick }
              onContextMenu={ this.handleClick }
              onKeyDown={ handleKey }
              onFocus={ handleFocus }
              tabIndex={ 0 }
              role="button"
              aria-label="Draggable area"
            >
                { children }
            </div>
        );
    }
}

export default DraggableComponent;
