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
import { DeviceType } from 'Type/Device';
import CSS from 'Util/CSS';

import {
    ACTIVE_SLIDE_PERCENT,
    ANIMATION_DURATION
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
        activeImage: PropTypes.number,
        onActiveImageChange: PropTypes.func,
        mix: MixType,
        children: ChildrenType.isRequired,
        isInteractionDisabled: PropTypes.bool,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        activeImage: 0,
        onActiveImageChange: () => {},
        showCrumbs: false,
        isInteractionDisabled: false,
        mix: {}
    };

    sliderWidth = 0;

    prevPosition = 0;

    draggableRef = createRef();

    sliderRef = createRef();

    handleDragStart = this.handleInteraction.bind(this, this.handleDragStart);

    handleDrag = this.handleInteraction.bind(this, this.handleDrag);

    handleDragEnd = this.handleInteraction.bind(this, this.handleDragEnd);

    renderCrumb = this.renderCrumb.bind(this);

    __construct(props) {
        super.__construct(props);

        const { activeImage } = this.props;

        this.state = {
            prevActiveImage: activeImage
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { activeImage, children } = props;
        const { prevActiveImage } = state;

        if (prevActiveImage !== activeImage && children.length !== 1) {
            return { prevActiveImage: activeImage };
        }

        return null;
    }

    componentDidMount() {
        this.addWindowResizeWatcher();

        if (!this.getIsSlider()) {
            return;
        }

        const sliderChildren = this.draggableRef.current.children;
        const sliderWidth = this.draggableRef.current.offsetWidth;
        this.sliderWidth = sliderWidth;

        if (!sliderChildren || !sliderChildren[0]) {
            return;
        }

        sliderChildren[0].onload = () => {
            CSS.setVariable(this.sliderRef, 'slider-height', `${sliderChildren[0].offsetHeight}px`);
        };

        setTimeout(() => {
            CSS.setVariable(this.sliderRef, 'slider-height', `${sliderChildren[0].offsetHeight}px`);
        }, ANIMATION_DURATION);
    }

    componentDidUpdate(prevProps) {
        const { activeImage: prevActiveImage } = prevProps;
        const { activeImage } = this.props;

        if (activeImage !== prevActiveImage && this.getIsSlider()) {
            const newTranslate = -activeImage * this.getSlideWidth();

            this.setAnimationSpeedStyle(Math.abs((prevActiveImage - activeImage) * ANIMATION_DURATION));
            this.setTranlateXStyle(newTranslate);
        }
    }

    addWindowResizeWatcher() {
        window.addEventListener('resize', () => {
            const { activeImage } = this.props;
            const newTranslate = -activeImage * this.getSlideWidth();

            this.setTranlateXStyle(newTranslate);

            // Removed animation to avoid image movement while changing window width.
            this.setAnimationSpeedStyle(0);

            const delay = 500;
            setTimeout(() => {
                this.setAnimationSpeedStyle();
            }, delay);
        });
    }

    setTranlateXStyle(translate) {
        CSS.setVariable(this.draggableRef, 'translateX', `${ translate }px`);
    }

    setAnimationSpeedStyle(animationDuration = ANIMATION_DURATION) {
        CSS.setVariable(this.draggableRef, 'animation-speed', `${ animationDuration }ms`);
    }

    getIsSlider() {
        const { children } = this.props;

        return children.length !== 1;
    }

    getSlideWidth() {
        const { offsetWidth = 0 } = this.draggableRef.current || {};

        return offsetWidth;
    }

    onClickChangeSlide(state, slideSize, lastTranslate, fullSliderSize) {
        const { originalX } = state;
        const { prevActiveImage: prevActiveSlider } = this.state;
        const { onActiveImageChange, device } = this.props;

        const fullSliderPoss = Math.round(fullSliderSize / slideSize);
        const elementPossitionInDOM = this.draggableRef.current.getBoundingClientRect().x;

        const sliderPossition = -prevActiveSlider;
        const realElementPossitionInDOM = elementPossitionInDOM - lastTranslate;
        const mousePossitionInElement = originalX - realElementPossitionInDOM;

        if (device.isMobile) {
            return sliderPossition;
        }

        if (slideSize / 2 < mousePossitionInElement && -fullSliderPoss < sliderPossition) {
            const activeSlide = sliderPossition - 1;
            onActiveImageChange(-activeSlide);
            return activeSlide;
        }

        if (slideSize / 2 > mousePossitionInElement && lastTranslate) {
            const activeSlide = sliderPossition + 1;
            onActiveImageChange(-activeSlide);
            return activeSlide;
        }

        return sliderPossition;
    }

    getFullSliderWidth() {
        const fullSliderWidth = this.draggableRef.current.scrollWidth;
        return fullSliderWidth - this.getSlideWidth();
    }

    calculateNextSlide(state) {
        const {
            translateX: translate,
            lastTranslateX: lastTranslate
        } = state;

        const { onActiveImageChange } = this.props;

        const slideSize = this.getSlideWidth();

        const fullSliderSize = this.getFullSliderWidth();

        const activeSlidePosition = translate / slideSize;
        const activeSlidePercent = Math.abs(activeSlidePosition % 1);
        const isSlideBack = translate > lastTranslate;

        if (!translate) {
            return this.onClickChangeSlide(state, slideSize, lastTranslate, fullSliderSize);
        }

        if (translate >= 0) {
            onActiveImageChange(0);
            return 0;
        }

        if (translate < -fullSliderSize) {
            const activeSlide = Math.round(fullSliderSize / -slideSize);
            onActiveImageChange(-activeSlide);
            return activeSlide;
        }

        if (isSlideBack && activeSlidePercent < 1 - ACTIVE_SLIDE_PERCENT) {
            const activeSlide = Math.ceil(activeSlidePosition);
            onActiveImageChange(-activeSlide);
            return activeSlide;
        }

        if (!isSlideBack && activeSlidePercent > ACTIVE_SLIDE_PERCENT) {
            const activeSlide = Math.floor(activeSlidePosition);
            onActiveImageChange(-activeSlide);
            return activeSlide;
        }

        const activeSlide = Math.round(activeSlidePosition);
        onActiveImageChange(-activeSlide);
        return activeSlide;
    }

    handleDragStart() {
        this.setAnimationSpeedStyle(0);
    }

    handleDrag(state) {
        const { translateX } = state;

        const translate = translateX;

        const fullSliderSize = this.getFullSliderWidth();

        if (translate < 0 && translate > -fullSliderSize) {
            this.setTranlateXStyle(translate);
        }
    }

    handleDragEnd(state, callback) {
        const activeSlide = this.calculateNextSlide(state);
        const slideSize = this.getSlideWidth();
        const newTranslate = activeSlide * slideSize;

        this.setAnimationSpeedStyle();
        this.setTranlateXStyle(newTranslate);

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

    changeActiveImage(activeImage) {
        const { onActiveImageChange } = this.props;
        onActiveImageChange(activeImage);
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
        const { activeImage } = this.props;
        const isActive = i === Math.abs(-activeImage);

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
        const { activeImage, children } = this.props;

        if (!this.getIsSlider()) {
            return children;
        }

        return (
            <Draggable
              mix={ { block: 'Slider', elem: 'Wrapper' } }
              draggableRef={ this.draggableRef }
              onDragStart={ this.handleDragStart }
              onDragEnd={ this.handleDragEnd }
              onDrag={ this.handleDrag }
              onClick={ this.handleClick }
              shiftX={ -activeImage * this.getSlideWidth() }
            >
                { children }
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
              ref={ this.sliderRef }
            >
                { this.renderSliderContent() }
                { showCrumbs && this.renderCrumbs() }
            </div>
        );
    }
}

export default Slider;
