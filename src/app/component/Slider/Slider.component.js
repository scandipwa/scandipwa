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

/** @namespace Component/Slider/Component */
export class Slider extends PureComponent {
    static propTypes = {
        showCrumbs: PropTypes.bool,
        mix: MixType,
        activeSlide: PropTypes.number,
        onActiveSlideChange: PropTypes.func,
        children: ChildrenType.isRequired,
        isInteractionDisabled: PropTypes.bool,
        onClick: PropTypes.func,
        isVertical: PropTypes.bool,
        isHeightTransitionDisabledOnMount: PropTypes.bool,
        sliderHeight: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        sliderRef: PropTypes.object,
        infinite: PropTypes.bool,
        isWidget: PropTypes.bool
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
        activeSlide: 0,
        onActiveSlideChange: () => {},
        infinite: false,
        isWidget: false
    };

    state = {
        activeSlide: 0
    };

    childrenClones = [];

    draggableRef = createRef();

    sliderRef = createRef();

    handleDragStart = this.handleInteraction.bind(this, this.handleDragStart);

    handleDrag = this.handleInteraction.bind(this, this.handleDrag);

    handleDragEnd = this.handleInteraction.bind(this, this.handleDragEnd);

    renderCrumb = this.renderCrumb.bind(this);

    componentDidMount() {
        if (!this.getIsScrollable()) {
            return;
        }

        window.addEventListener('resize', this.windowResizeWatcher);

        const sliderChildren = this.draggableRef.current.children;

        if (!sliderChildren || !sliderChildren[0]) {
            return;
        }

        this.setAnimationSpeedStyle(0);
        this.setTranslateXStyle(this.getFocusSlideTranslate());
        this.setStyleVariablesOnMount();

        const sliderRef = this.getSliderRef();
        const sliderHeight = `${ sliderChildren[0].getBoundingClientRect().height }px`;

        CSS.setVariable(sliderRef, 'slide-height', sliderHeight);
        sliderChildren[0].onload = () => {
            CSS.setVariable(sliderRef, 'slider-height', sliderHeight);
        };

        setTimeout(() => {
            CSS.setVariable(sliderRef, 'slider-height', sliderHeight);
        }, ANIMATION_DURATION);
    }

    componentDidUpdate() {
        if (!this.getIsScrollable()) {
            return;
        }

        this.setAnimationSpeedStyle();
        this.setTranslateXStyle(this.getFocusSlideTranslate());
        this.setActiveSlide();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizeWatcher);
    }

    windowResizeWatcher = () => {
        // Remove animation to avoid image movement while changing window width.
        this.setAnimationSpeedStyle(0);
        this.setTranslateXStyle(this.getFocusSlideTranslate());
    };

    cloneChildren() {
        const { children } = this.props;

        this.childrenClones = children.map((el) => React.cloneElement(el, { key: `${el.key}-clone` }));
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

    setTranslateXStyle(translate) {
        const { isVertical } = this.props;

        CSS.setVariable(this.draggableRef, isVertical ? 'translateY' : 'translateX', `${ translate }px`);
    }

    setAnimationSpeedStyle(animationDuration = ANIMATION_DURATION) {
        CSS.setVariable(this.draggableRef, 'animation-speed', `${ animationDuration }ms`);
    }

    /*
        Getting number of slides translated to left (in hidden overflow).
        This number will be focus slide (that one that user see).
    */
    getFocusSlide() {
        const { children: { length } } = this.props;

        // If slider not infinite, than focus slide = active slide
        if (!this.getIsInfinite()) {
            const { activeSlide } = this.state;
            return activeSlide;
        }

        // If slider is infinite, focus slide will be on the middle of slider
        return Math.round((length + 1) / 2);
    }

    getFocusSlideTranslate() {
        return -(this.getFocusSlide()) * this.getSlideWidth();
    }

    getIsScrollable() {
        const { children: { length } } = this.props;

        return length > 0;
    }

    getIsInfinite() {
        const { infinite } = this.props;

        return infinite && this.getIsScrollable();
    }

    // Changing active slide if new active slide number received from props
    setActiveSlide() {
        const { activeSlide: newActiveSlide, onActiveSlideChange } = this.props;
        const { activeSlide: currentActiveSlide } = this.state;

        if (newActiveSlide === currentActiveSlide) {
            return;
        }

        // If transition is happening, prevent slide changing from props
        if (this.animInAction) {
            onActiveSlideChange(currentActiveSlide);
            return;
        }

        this.changeActiveSlide(newActiveSlide);
    }

    getSlideWidth() {
        const { isVertical } = this.props;

        const { width = 0, height = 0 } = this.draggableRef.current
            ? this.draggableRef.current.getBoundingClientRect() : {};

        return isVertical ? height : width;
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
        const { activeSlide } = this.state;

        // If it was a click
        if (!translate) {
            if (onClick) {
                onClick();
            }

            // Getting click coordinates on current slide
            const original = isVertical ? originalY : originalX;
            const slideSize = this.getSlideWidth();
            const elementPositionInDOM = this.draggableRef.current.getBoundingClientRect()[isVertical ? 'y' : 'x'];
            const realElementPositionInDOM = elementPositionInDOM - lastTranslate;
            const mousePositionInElement = original - realElementPositionInDOM;

            // If clicked on the right side of slide
            if (slideSize / 2 < mousePositionInElement) {
                return {
                    active: activeSlide + 1 >= length ? 0 : activeSlide + 1,
                    translate
                };
            }

            // If clicked on the left side of slide
            if (slideSize / 2 > mousePositionInElement) {
                return {
                    active: activeSlide - 1 < 0 ? length - 1 : activeSlide - 1,
                    translate
                };
            }
        }

        // If it was a drag, count drag offset and check drag direction
        const dragOffset = translate - this.getFocusSlideTranslate();

        if (dragOffset > 0) {
            return {
                active: activeSlide - 1 < 0 ? length - 1 : activeSlide - 1,
                translate: dragOffset
            };
        }

        if (dragOffset < 0) {
            return {
                active: activeSlide + 1 >= length ? 0 : activeSlide + 1,
                translate: dragOffset
            };
        }

        return {
            active: activeSlide,
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
            this.setTranslateXStyle(translate);
        }
    }

    handleDragEnd(state, callback) {
        const { isVertical } = this.props;

        const { active, translate } = this.calculateNextSlide(state);
        const newTranslate = this.getFocusSlideTranslate();

        this.changeActiveSlide(active, translate);

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

        if (isInteractionDisabled || !callback || this.animInAction) {
            return;
        }

        callback.call(this, ...args);
    }

    getArrayRange(start, end) {
        return Array(Math.abs(end - start + 1)).fill().map((_, idx) => start + idx);
    }

    countOffset(active, newActive) {
        const { children: { length } } = this.props;

        // Smallest index on left side not including clone if it exists (negative means from the end)
        const minIndexOnLeft = active - this.getFocusSlide() + this.getIsInfinite();

        // Gettings array of indexes that are on the left
        const indexesOnLeft = minIndexOnLeft >= 0
            ? this.getArrayRange(minIndexOnLeft, active - 1)
            : this.getArrayRange(0, active - 1)
                .concat(this.getArrayRange(length + minIndexOnLeft, length - 1));

        // Getting first left index
        const firstLeftIndex = minIndexOnLeft < 0 ? length + minIndexOnLeft : minIndexOnLeft;

        /* Check if new active slide is on the left and, in case slide count is even,
        check if new active slide is not first on the left */
        if (indexesOnLeft.includes(newActive) && (length % 2 !== 0 || newActive !== firstLeftIndex)) {
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

    changeActiveSlide(newActiveSlide, dragOffset = 0) {
        const { onActiveSlideChange } = this.props;
        const { activeSlide } = this.state;

        this.animInAction = true;

        setTimeout(() => {
            this.animInAction = false;
        }, ANIMATION_DURATION);

        // Count offset to translate slider before animation (only for infinite slider)
        const offset = this.countOffset(activeSlide, newActiveSlide);
        const translate = (-this.getFocusSlide() + offset) * this.getSlideWidth() + dragOffset;

        if (this.getIsInfinite()) {
            this.setAnimationSpeedStyle(0);
            this.setTranslateXStyle(translate);
        } else {
            // If slider is not infinite translate it to left activeSlide times
            this.setAnimationSpeedStyle();
            this.setTranslateXStyle(-newActiveSlide * this.getSlideWidth());
        }

        this.setState({ activeSlide: newActiveSlide });
        onActiveSlideChange(newActiveSlide);
    }

    renderCrumbs() {
        const { children } = this.props;

        if (!this.getIsScrollable()) {
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
        const { activeSlide } = this.state;
        const isActive = i === activeSlide;

        return (
            <button
              block="Slider"
              elem="Image"
              mods={ { type: 'single' } }
              // eslint-disable-next-line react/jsx-no-bind
              onClick={ () => this.changeActiveSlide(i) }
            >
                <div
                  block="Slider"
                  elem="Crumb"
                  mods={ { isActive } }
                />
            </button>
        );
    }

    getSlideList(firstLeftIndex) {
        const { children, children: { length } } = this.props;

        // Left and right clones are previous and next from first and last slides respectively
        const leftCloneIndex = firstLeftIndex === 0 ? length - 1 : firstLeftIndex - 1;
        const rightCloneIndex = firstLeftIndex >= length ? 0 : firstLeftIndex;

        // Cloning necessary children with new key
        if (this.childrenClones.length !== length) {
            this.cloneChildren();
        }

        // Necessary order slide list array
        return [
            this.childrenClones[leftCloneIndex],
            ...children.slice(firstLeftIndex, length),
            ...children.slice(0, firstLeftIndex),
            this.childrenClones[rightCloneIndex]
        ];
    }

    renderSlides() {
        const { children } = this.props;

        if (!this.getIsInfinite()) {
            return children;
        }

        const { activeSlide } = this.state;

        /*
            Getting index of slide to start rendering from (not including clone).

            To get it we subtract focusSlide from activeSlide and add 1 or 0
            depending on is slider infinite (to not include clone).
            If received value is negative that means index from the end.
        */
        const indexLeftShift = activeSlide - this.getFocusSlide() + this.getIsInfinite();
        const firstLeftIndex = indexLeftShift < 0 ? children.length + indexLeftShift : indexLeftShift;

        return this.getSlideList(firstLeftIndex);
    }

    renderSlider() {
        if (!this.getIsScrollable()) {
            const { children } = this.props;
            return children;
        }

        const {
            isVertical,
            isWidget
        } = this.props;

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
                { this.renderSlides() }
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
                { this.renderSlider() }
                { showCrumbs && this.renderCrumbs() }
            </div>
        );
    }
}

export default Slider;
