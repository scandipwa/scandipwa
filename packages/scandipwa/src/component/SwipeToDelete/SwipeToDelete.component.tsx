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

import { createRef, MouseEvent, PureComponent } from 'react';

import Draggable from 'Component/Draggable';
import Loader from 'Component/Loader';
import { ReactElement } from 'Type/Common.type';
import CSS from 'Util/CSS';
import { isRtl } from 'Util/CSS/CSS';

import { SwipeToDeleteComponentProps, SwipeToDeleteComponentState } from './SwipeToDelete.type';

import './SwipeToDelete.style';

/** @namespace Component/SwipeToDelete/Component */
export class SwipeToDelete extends PureComponent<SwipeToDeleteComponentProps, SwipeToDeleteComponentState> {
    state: SwipeToDeleteComponentState = {
        isRightSideOpen: false,
        isAheadRemoveItemThreshold: false,
    };

    draggableRef = createRef<HTMLDivElement>();

    draggableRemoveThreshold = 0;

    draggableWidth = 0;

    __construct(props: SwipeToDeleteComponentProps): void {
        super.__construct?.(props);

        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidMount(): void {
        // Sets default style
        this.setTranslateXStyle(0);
        this.setRightSideContentWidth();
        this.setDraggableWidth();
        this.setDraggableRemoveThreshold();
    }

    setRightSideContentWidth(): void {
        const { dragRightOpenThreshold } = this.props;

        CSS.setVariable(this.draggableRef, 'right-side-content-width', `${ dragRightOpenThreshold }px`);
    }

    setTranslateXStyle(translate: number): void {
        CSS.setVariable(this.draggableRef, 'translateX', `${ translate }px`);
    }

    setDraggableWidth(): void {
        const { draggableRef } = this;

        if (!draggableRef.current) {
            return;
        }

        const { width } = draggableRef.current.getBoundingClientRect();

        this.draggableWidth = width;
    }

    setDraggableRemoveThreshold(): void {
        const { draggableWidth } = this;
        const {
            dragRightOpenThreshold,
            dragItemRemoveThreshold,
        } = this.props;

        this.draggableRemoveThreshold = draggableWidth * dragItemRemoveThreshold - dragRightOpenThreshold;
    }

    setAnimationSpeedStyle(specAnimationDuration?: number): void {
        const { animationDuration } = this.props;

        const duration = specAnimationDuration === undefined
            ? animationDuration
            : specAnimationDuration;

        CSS.setVariable(this.draggableRef, 'animation-speed', `${ duration }ms`);
    }

    handleDragStart(): void {
        // Remove animation when drag starts
        this.setAnimationSpeedStyle(0);
    }

    handleDrag({ translateX: translate }: { translateX: number }): void {
        const { dragRightOpenThreshold } = this.props;
        const { isRightSideOpen, isAheadRemoveItemThreshold } = this.state;
        const { draggableRemoveThreshold } = this;

        const translateX = isRtl() ? -translate : translate;
        const nextIsAheadRemoveItemThreshold = Math.abs(translateX) > draggableRemoveThreshold;

        if (isAheadRemoveItemThreshold !== nextIsAheadRemoveItemThreshold) {
            this.setState({
                isAheadRemoveItemThreshold: nextIsAheadRemoveItemThreshold,
            });
        }

        // When dragging to left from current start point, going negative translateX
        if (translateX <= 0) {
            const translate = isRightSideOpen
                // Add (remove to have minus value) opened content width, to have full -translateX value
                ? translateX - dragRightOpenThreshold
                : translateX;

            this.setTranslateXStyle(translate);

            return;
        }

        // When dragging to right from current start point, going positive translateX
        if (translateX > 0) {
            // When translate goes out of screen
            if (!isRightSideOpen || (isRightSideOpen && translateX - dragRightOpenThreshold > 0)) {
                this.setTranslateXStyle(0);

                return;
            }

            // When content is opened and dragging to right side
            if (translateX - dragRightOpenThreshold < 0 && isRightSideOpen) {
                // Add (remove to have minus value) opened content width, to have full -translateX value
                this.setTranslateXStyle(translateX - dragRightOpenThreshold);
            }
        }
    }

    handleDragEnd({ translateX: translate }: { translateX: number }): void {
        const {
            dragRightOpenThreshold,
            dragRightOpenTriggerThreshold,
            onAheadOfDragItemRemoveThreshold,
            animationDurationOnRemove,
        } = this.props;
        const { isAheadRemoveItemThreshold } = this.state;
        const { draggableWidth } = this;

        const translateX = isRtl() ? -translate : translate;
        const shouldOpen = translateX <= -dragRightOpenTriggerThreshold;

        if (isAheadRemoveItemThreshold) {
            // swipe to the end
            this.setAnimationSpeedStyle(animationDurationOnRemove);
            this.setTranslateXStyle(-draggableWidth);
            onAheadOfDragItemRemoveThreshold();

            return;
        }

        this.setAnimationSpeedStyle();
        this.setState({ isRightSideOpen: shouldOpen });

        if (!shouldOpen) {
            this.setTranslateXStyle(0);

            return;
        }

        this.setTranslateXStyle(-dragRightOpenThreshold);
    }

    renderRightSideContent(): ReactElement {
        const { renderRightSideContent } = this.props;
        const { isAheadRemoveItemThreshold } = this.state;

        return (
            <div
              block="SwipeToDelete"
              elem="RightSideContentWrapper"
            >
                <div
                  block="SwipeToDelete"
                  elem="RightSideContent"
                  mods={ { isAheadRemoveItemThreshold } }
                >
                    { renderRightSideContent() }
                </div>
            </div>
        );
    }

    stopPropagation(event: MouseEvent): void {
        event.stopPropagation();
    }

    renderChildren(): ReactElement {
        const { children } = this.props;

        return (
            <>
                <div
                  block="SwipeToDelete"
                  role="button"
                  tabIndex={ 0 }
                  onMouseDown={ this.stopPropagation }
                >
                    { children }
                </div>
                { this.renderRightSideContent() }
            </>
        );
    }

    render(): ReactElement {
        const { topElemMix, isLoading } = this.props;
        const { isAheadRemoveItemThreshold } = this.state;

        return (
            <Draggable
              onDrag={ this.handleDrag }
              draggableRef={ this.draggableRef }
              onDragStart={ this.handleDragStart }
              onDragEnd={ this.handleDragEnd }
              mix={ topElemMix }
            >
                <Loader isLoading={ isLoading && isAheadRemoveItemThreshold } />
                { this.renderChildren() }
            </Draggable>
        );
    }
}

export default SwipeToDelete;
