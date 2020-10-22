/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';

import Draggable from 'Component/Draggable';
import { ChildrenType } from 'Type/Common';
import CSS from 'Util/CSS';

import {
    ANIMATION_DURATION,
    DRAG_RIGHT_OPEN_TRESHHOLD,
    DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD
} from './SwipeToDelete.config';

import './SwipeToDelete.style';

/** @namespace Component/SwipeToDelete/Component */
export class SwipeToDelete extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
        dragRightOpenTriggerThreshold: PropTypes.number,
        dragRightOpenThreshold: PropTypes.number,
        animationDuration: PropTypes.number,
        renderRightSideContent: PropTypes.func,
        rightSideMix: PropTypes.object,
        topElemMix: PropTypes.object
    };

    static defaultProps = {
        dragRightOpenTriggerThreshold: DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD,
        dragRightOpenThreshold: DRAG_RIGHT_OPEN_TRESHHOLD,
        animationDuration: ANIMATION_DURATION,
        renderRightSideContent: () => {},
        rightSideMix: {},
        topElemMix: {}
    };

    state = {
        isRightSideOpen: false
    };

    draggableRef = createRef();

    componentDidMount() {
        this.setTranlateXStyle(0);
    }

    setTranlateXStyle(translate) {
        CSS.setVariable(this.draggableRef, 'translateX', `${ translate }px`);
    }

    setAnimationSpeedStyle(specAnimationDuration) {
        const { animationDuration } = this.props;

        const duration = specAnimationDuration === undefined
            ? animationDuration
            : specAnimationDuration;

        CSS.setVariable(this.draggableRef, 'animation-speed', `${ duration }ms`);
    }

    handleDragStart = () => {
        this.setAnimationSpeedStyle(0);
    };

    handleDrag = (s) => {
        const { dragRightOpenThreshold } = this.props;
        const { isRightSideOpen } = this.state;
        const { translateX } = s;

        // When draging to left from starting point
        if (translateX <= 0) {
            this.setTranlateXStyle(isRightSideOpen ? translateX - dragRightOpenThreshold : translateX);

            return;
        }

        // When draging to right from starting point
        if (translateX > 0) {
            if (!isRightSideOpen || (isRightSideOpen && translateX - dragRightOpenThreshold > 0)) {
                this.setTranlateXStyle(0);

                return;
            }

            if (translateX - dragRightOpenThreshold < 0 && isRightSideOpen) {
                this.setTranlateXStyle(translateX - dragRightOpenThreshold);
            }
        }
    };

    handleDragEnd = (s) => {
        const { dragRightOpenThreshold, dragRightOpenTriggerThreshold } = this.props;
        const { translateX } = s;

        this.setAnimationSpeedStyle();
        const shouldOpen = translateX > -dragRightOpenTriggerThreshold;
        this.setState({ isRightSideOpen: !shouldOpen });

        if (shouldOpen) {
            this.setTranlateXStyle(0);

            return;
        }

        this.setTranlateXStyle(-dragRightOpenThreshold);
    };

    renderRightSideContent() {
        const { dragRightOpenThreshold, renderRightSideContent, rightSideMix } = this.props;
        const style = { width: dragRightOpenThreshold };

        return (
            <div
              block="SwipeToDelete"
              elem="RightSideContentWrapper"
            >
                <div
                  block="SwipeToDelete"
                  elem="RightSideContent"
                  style={ style }
                  mix={ rightSideMix }
                >
                    { renderRightSideContent() }
                </div>
            </div>
        );
    }

    renderChildren() {
        const { children } = this.props;

        return (
            <>
                <div
                  block="SwipeToDelete"
                  role="button"
                  tabIndex="0"
                  // eslint-disable-next-line react/jsx-no-bind
                  onMouseDown={ (e) => e.stopPropagation() }
                >
                    { children }
                </div>
                { this.renderRightSideContent() }
            </>
        );
    }

    render() {
        const { topElemMix } = this.props;

        return (
            <Draggable
              onDrag={ this.handleDrag }
              draggableRef={ this.draggableRef }
              onDragStart={ this.handleDragStart }
              onDragEnd={ this.handleDragEnd }
              mix={ topElemMix }
            >
                { this.renderChildren() }
            </Draggable>
        );
    }
}

export default SwipeToDelete;
