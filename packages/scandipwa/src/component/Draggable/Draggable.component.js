/* eslint-disable react/no-unused-state */
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
import { PureComponent } from 'react';

import { ChildrenType, MixType, RefType } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import './Draggable.style';

/** @namespace Component/Draggable/Component */
export class Draggable extends PureComponent {
    static propTypes = {
        shiftX: PropTypes.number,
        shiftY: PropTypes.number,
        onDragStart: PropTypes.func,
        onClick: PropTypes.func,
        onDragEnd: PropTypes.func,
        handleFocus: PropTypes.func,
        handleKey: PropTypes.func,
        onDrag: PropTypes.func,
        children: ChildrenType.isRequired,
        mix: MixType,
        draggableRef: RefType
    };

    static defaultProps = {
        shiftX: 0,
        shiftY: 0,
        onDragStart: noopFn,
        onDragEnd: (state, callback) => {
            const { translateX, translateY } = state;

            callback({
                originalX: 0,
                originalY: 0,
                shiftX: translateX,
                shiftY: translateY
            });
        },
        onClick: noopFn,
        onDrag: noopFn,
        handleFocus: noopFn,
        handleKey: noopFn,
        draggableRef: noopFn,
        mix: {}
    };

    state = {
        isDragging: false,
        originalX: 0,
        translateX: 0,
        lastTranslateX: 0,
        originalY: 0,
        translateY: 0,
        lastTranslateY: 0
    };

    handleTouchStart = this.handleTouchStart.bind(this);

    handleMouseDown = this.handleMouseDown.bind(this);

    handleTouchMove = this.handleTouchMove.bind(this);

    handleClick = this.handleClick.bind(this);

    handleTouchEnd = this.handleTouchEnd.bind(this);

    handleMouseUp = this.handleMouseUp.bind(this);

    handleMouseMove = this.handleMouseMove.bind(this);

    handleDragEnd = this.handleDragEnd.bind(this);

    static getDerivedStateFromProps(props, state) {
        const { shiftX, shiftY } = props;
        const { lastTranslateX, lastTranslateY } = state;

        if (shiftX !== lastTranslateX || shiftY !== lastTranslateY) {
            return {
                lastTranslateX: shiftX,
                lastTranslateY: shiftY
            };
        }

        return null;
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleTouchEnd);
    }

    handleTouchStart({ touches }) {
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleTouchEnd);

        if (touches.length === 1) {
            this.handleDragStart(touches[0]);
        }
    }

    handleMouseDown(event) {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);

        event.preventDefault();
        this.handleDragStart(event);
    }

    handleTouchMove({ touches }) {
        if (touches.length === 1) {
            this.handleMouseMove(touches[0]);
        }
    }

    handleMouseMove({ clientX, clientY }) {
        const { isDragging } = this.state;
        const { shiftX, shiftY } = this.props;

        if (!isDragging) {
            return;
        }

        this.setState(({
            originalX,
            originalY
        }) => ({
            translateX: clientX - originalX + shiftX,
            translateY: clientY - originalY + shiftY
        }), () => {
            const { onDrag } = this.props;

            if (onDrag) {
                onDrag({ ...this.state, clientX, clientY });
            }
        });
    }

    handleTouchEnd() {
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleTouchEnd);

        this.handleDragEnd();
    }

    handleMouseUp() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);

        this.handleDragEnd();
    }

    handleClick(event) {
        const { onClick } = this.props;

        if (onClick) {
            onClick(
                this.state,
                (newState) => this.setState({
                    ...newState,
                    isDragging: false,
                    translateX: 0,
                    translateY: 0
                }),
                event
            );
        }
    }

    handleDragStart({
        clientX,
        clientY
    }) {
        const { onDragStart } = this.props;

        if (onDragStart) {
            onDragStart();
        }

        this.setState({
            originalX: clientX,
            originalY: clientY,
            isDragging: true
        });
    }

    handleDragEnd() {
        const { onDragEnd } = this.props;

        onDragEnd(this.state, (newState) => this.setState({
            ...newState,
            isDragging: false,
            translateX: 0,
            translateY: 0
        }));

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

    render() {
        const {
            children,
            handleFocus,
            handleKey,
            draggableRef,
            mix
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

export default Draggable;
