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
import { Children, createRef, PureComponent } from 'react';

import Draggable from 'Component/Draggable';
import { ChildrenType, MixType } from 'Type/Common';
import CSS from 'Util/CSS';

import {
    ANIMATION_DURATION,
    HEIGHT_TRANSITION_SPEED_ON_MOUNT
} from './Slider.config';

import './Slider.style';

/**
 * Slider component
 * @class Slider
 * @namespace Component/Slider/Component
 */
export class Slider extends PureComponent {
    static propTypes = {
        showCrumbs: PropTypes.bool,
        mix: MixType,
        activeImage: PropTypes.number,
        onActiveImageChange: PropTypes.func,
        children: ChildrenType.isRequired,
        childrenClones: ChildrenType.isRequired,
        isInteractionDisabled: PropTypes.bool,
        onClick: PropTypes.func,
        isVertical: PropTypes.bool,
        isHeightTransitionDisabledOnMount: PropTypes.bool,
        sliderHeight: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        sliderRef: PropTypes.object
    };

    static defaultProps = {
        showCrumbs: false,
        isInteractionDisabled: false,
        mix: {},
        onClick: null,
        isVertical: false,
        isHeightTransitionDisabledOnMount: false,
        sliderHeight: null,
        sliderRef: null,
        activeImage: null,
        onActiveImageChange: () => {}
    };

    draggableRef = createRef();

    sliderRef = createRef();

    handleDragStart = this.handleInteraction.bind(this, this.handleDragStart);

    handleDrag = this.handleInteraction.bind(this, this.handleDrag);

    handleDragEnd = this.handleInteraction.bind(this, this.handleDragEnd);

    renderCrumb = this.renderCrumb.bind(this);

    __construct(props) {
        super.__construct(props);

        this.state = {
            activeImage: 0
        };
    }

    componentDidMount() {
        if (!this.getIsSlider()) {
            return;
        }

        this.addWindowResizeWatcher();

        const sliderChildren = this.draggableRef.current.children;

        if (!sliderChildren || !sliderChildren[0]) {
            return;
        }

        this.setAnimationSpeedStyle(0);
        this.setTranlateXStyle(this.getFocusSlideTranslate());
        this.setStyleVariablesOnMount();

        const sliderRef = this.getSliderRef();
        const sliderHeight = `${ sliderChildren[0].offsetHeight }px`;

        sliderChildren[0].onload = () => {
            CSS.setVariable(sliderRef, 'slider-height', sliderHeight);
        };

        setTimeout(() => {
            CSS.setVariable(sliderRef, 'slider-height', sliderHeight);
        }, ANIMATION_DURATION);
    }

    componentDidUpdate() {
        if (this.getIsSlider()) {
            this.setAnimationSpeedStyle();
            this.setTranlateXStyle(this.getFocusSlideTranslate());
            this.setActiveImage();
        }
    }

    addWindowResizeWatcher() {
        window.addEventListener('resize', () => {
            this.setTranlateXStyle(this.getFocusSlideTranslate());

            // Removed animation to avoid image movement while changing window width.
            this.setAnimationSpeedStyle(0);

            const delay = 500;
            setTimeout(() => {
                this.setAnimationSpeedStyle();
            }, delay);
        });
    }

    setStyleVariablesOnMount() {
        const { sliderHeight, isHeightTransitionDisabledOnMount } = this.props;

        const sliderRef = this.getSliderRef();

        if (isHeightTransitionDisabledOnMount) {
            const transitionSpeed = isHeightTransitionDisabledOnMount
                ? 0
                : `${ HEIGHT_TRANSITION_SPEED_ON_MOUNT }ms`;

            CSS.setVariable(
                sliderRef,
                'height-transition-speed',
                transitionSpeed
            );
        }

        if (sliderHeight) {
            CSS.setVariable(sliderRef, 'slider-height', sliderHeight);
        }
    }

    setTranlateXStyle(translate) {
        const { isVertical } = this.props;

        CSS.setVariable(this.draggableRef, isVertical ? 'translateY' : 'translateX', `${ translate }px`);
    }

    setAnimationSpeedStyle(animationDuration = ANIMATION_DURATION) {
        CSS.setVariable(this.draggableRef, 'animation-speed', `${ animationDuration }ms`);
    }

    getFocusSlide() {
        const { children: { length } } = this.props;

        if (!this.getIsInfinity()) {
            const { activeImage } = this.state;
            return activeImage;
        }

        return Math.round((length + 1) / 2);
    }

    getFocusSlideTranslate() {
        return -(this.getFocusSlide()) * this.getSlideWidth();
    }

    getIsSlider() {
        const { children: { length } } = this.props;

        return length > 0;
    }

    getIsInfinity() {
        const { childrenClones } = this.props;

        return !!childrenClones;
    }

    setActiveImage() {
        const { activeImage, onActiveImageChange } = this.props;
        const { activeImage: stateActiveImage } = this.state;

        if (activeImage !== stateActiveImage) {
            if (this.animInAction) {
                onActiveImageChange(stateActiveImage);
            } else {
                this.changeActiveImage(activeImage);
            }
        }
    }

    getSlideWidth() {
        const { isVertical, children: { length } } = this.props;

        const { width = 0, height = 0 } = this.draggableRef.current
            ? this.draggableRef.current.getBoundingClientRect() : {};

        return isVertical ? height / (length + 2) : width;
    }

    getSliderRef() {
        const { sliderRef } = this.props;

        return sliderRef || this.sliderRef;
    }

    getFullSliderWidth() {
        const { isVertical } = this.props;
        const { scrollWidth: fullSliderWidth, scrollHeight } = this.draggableRef.current;

        const width = isVertical ? scrollHeight : fullSliderWidth;

        return width - this.getSlideWidth();
    }

    calculateNextSlide(state) {
        const { isVertical, onClick } = this.props;
        const {
            originalX,
            originalY,
            translateX,
            translateY,
            lastTranslateX,
            lastTranslateY
        } = state;

        const lastTranslate = isVertical ? lastTranslateY : lastTranslateX;
        const translate = isVertical ? translateY : translateX;

        const { children: { length } } = this.props;
        const { activeImage } = this.state;

        if (!translate) {
            if (onClick) {
                onClick();
            }
            const original = isVertical ? originalY : originalX;
            const slideSize = this.getSlideWidth();
            const elementPossitionInDOM = this.draggableRef.current.getBoundingClientRect()[isVertical ? 'y' : 'x'];
            const realElementPossitionInDOM = elementPossitionInDOM - lastTranslate;
            const mousePossitionInElement = original - realElementPossitionInDOM;

            if (slideSize / 2 < mousePossitionInElement) {
                return {
                    active: activeImage + 1 >= length ? 0 : activeImage + 1,
                    translate
                };
            }

            if (slideSize / 2 > mousePossitionInElement) {
                return {
                    active: activeImage - 1 < 0 ? length - 1 : activeImage - 1,
                    translate
                };
            }
        }

        const dragOffset = translate - this.getFocusSlideTranslate();

        if (dragOffset > 0) {
            return {
                active: activeImage - 1 < 0 ? length - 1 : activeImage - 1,
                translate: dragOffset
            };
        }

        if (dragOffset < 0) {
            return {
                active: activeImage + 1 >= length ? 0 : activeImage + 1,
                translate: dragOffset
            };
        }

        return {
            active: activeImage,
            translate: dragOffset
        };
    }

    handleDragStart() {
        this.setAnimationSpeedStyle(0);
    }

    handleDrag(state) {
        const { isVertical } = this.props;
        const { translateX, translateY } = state;

        const translate = isVertical ? translateY : translateX;

        const fullSliderSize = this.getFullSliderWidth();

        if (translate < 0 && translate > -fullSliderSize) {
            this.setTranlateXStyle(translate);
        }
    }

    handleDragEnd(state, callback) {
        const { isVertical } = this.props;

        const { active, translate } = this.calculateNextSlide(state);
        const newTranslate = this.getFocusSlideTranslate();

        this.changeActiveImage(active, translate);

        if (isVertical) {
            callback({
                originalY: newTranslate,
                lastTranslateY: newTranslate
            });

            return;
        }

        callback({
            originalX: newTranslate,
            lastTranslateX: newTranslate
        });
    }

    handleClick = (state, callback, e) => {
        if (e.type === 'contextmenu') {
            this.handleDragEnd(state, callback);
        }
    };

    handleInteraction(callback, ...args) {
        const { isInteractionDisabled } = this.props;

        if (isInteractionDisabled || !callback) {
            return;
        }

        callback.call(this, ...args);
    }

    countOffset(active, newActive) {
        const { children: { length } } = this.props;

        const minIndexOnLeft = active - this.getFocusSlide() + 1;
        const indexesOnLeft = minIndexOnLeft >= 0
            ? Array(active - minIndexOnLeft).fill().map((_, idx) => minIndexOnLeft + idx)
            : Array(active).fill().map((_, idx) => idx).concat(
                Array(Math.abs(minIndexOnLeft)).fill().map((_, idx) => length + minIndexOnLeft + idx)
            );

        const firstLeftIndex = minIndexOnLeft < 0 ? length + minIndexOnLeft : minIndexOnLeft;

        if (indexesOnLeft.includes(newActive) && (length % 2 === 0 ? newActive !== firstLeftIndex : true)) {
            if (newActive > active) {
                return -(length - newActive + active);
            }

            return -(active - newActive);
        }

        if (newActive < active) {
            return length - active + newActive;
        }

        return newActive - active;
    }

    changeActiveImage(newActiveImage, dragOffset = 0) {
        const { onActiveImageChange } = this.props;
        const { activeImage } = this.state;

        if (this.animInAction) {
            return;
        }

        this.animInAction = true;

        setTimeout(() => {
            this.animInAction = false;
        }, ANIMATION_DURATION);

        if (!this.getIsInfinity()) {
            this.setAnimationSpeedStyle();
            this.setState({ activeImage: newActiveImage });
            onActiveImageChange(newActiveImage);
            this.setTranlateXStyle(-newActiveImage * this.getSlideWidth());
            return;
        }

        const offset = this.countOffset(activeImage, newActiveImage);

        const translate = (-this.getFocusSlide() + offset) * this.getSlideWidth() + dragOffset;

        this.setAnimationSpeedStyle(0);
        this.setTranlateXStyle(translate);

        this.setState({ activeImage: newActiveImage });
        onActiveImageChange(newActiveImage);
    }

    renderCrumbs() {
        const { children } = this.props;
        if (children.length <= 1) {
            return null;
        }

        return (
            <div
              block="Slider"
              elem="Crumbs"
            >
                { Children.map(children, this.renderCrumb) }
            </div>
        );
    }

    renderCrumb(_, i) {
        const { activeImage } = this.state;
        const isActive = i === activeImage;

        return (
            <button
              block="Slider"
              elem="Image"
              mods={ { type: 'single' } }
              // eslint-disable-next-line react/jsx-no-bind
              onClick={ () => this.changeActiveImage(i) }
            >
                <div
                  block="Slider"
                  elem="Crumb"
                  mods={ { isActive } }
                />
            </button>
        );
    }

    renderSliderContent() {
        const {
            children,
            children: { length },
            isVertical,
            childrenClones
        } = this.props;
        const { activeImage } = this.state;

        if (!this.getIsSlider()) {
            return children;
        }

        const slidesOnLeft = activeImage - this.getFocusSlide() + 1;
        const firstLeftIndex = slidesOnLeft < 0 ? length + slidesOnLeft : slidesOnLeft;

        const leftClone = firstLeftIndex === 0 ? length - 1 : firstLeftIndex - 1;
        const rightClone = firstLeftIndex >= length ? 0 : firstLeftIndex;

        const slides = this.getIsInfinity() ? [childrenClones[leftClone],
            ...children.slice(firstLeftIndex, length),
            ...children.slice(0, firstLeftIndex),
            rightClone === leftClone ? null : childrenClones[rightClone]] : children;

        const isWidget = this.getIsInfinity();

        return (
            <Draggable
              mix={ { block: 'Slider', elem: 'Wrapper', mods: { isVertical, isWidget } } }
              draggableRef={ this.draggableRef }
              onDragStart={ this.handleDragStart }
              onDragEnd={ this.handleDragEnd }
              onDrag={ this.handleDrag }
              onClick={ this.handleClick }
              shiftX={ this.getFocusSlideTranslate() }
              shiftY={ this.getFocusSlideTranslate() }
            >
                { slides }
            </Draggable>
        );
    }

    render() {
        const {
            showCrumbs,
            mix
        } = this.props;

        return (
            <div
              block="Slider"
              mix={ mix }
              ref={ this.getSliderRef() }
            >
                { this.renderSliderContent() }
                { showCrumbs && this.renderCrumbs() }
            </div>
        );
    }
}

export default Slider;
