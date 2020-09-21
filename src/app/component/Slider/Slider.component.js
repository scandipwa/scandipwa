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
        const { activeImage } = props;
        const { prevActiveImage } = state;

        if (prevActiveImage !== activeImage) {
            return { prevActiveImage: activeImage };
        }

        return null;
    }

    componentDidMount() {
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

        if (activeImage !== prevActiveImage) {
            const newTranslate = -activeImage * this.sliderWidth;

            CSS.setVariable(
                this.draggableRef,
                'animation-speed',
                `${ Math.abs((prevActiveImage - activeImage) * ANIMATION_DURATION) }ms`
            );

            CSS.setVariable(
                this.draggableRef,
                'translateX',
                `${newTranslate}px`
            );
        }
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
        return fullSliderWidth - this.sliderWidth;
    }

    calculateNextSlide(state) {
        const {
            translateX: translate,
            lastTranslateX: lastTranslate
        } = state;

        const { onActiveImageChange } = this.props;

        const slideSize = this.sliderWidth;

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
        CSS.setVariable(this.draggableRef, 'animation-speed', '0');
    }

    handleDrag(state) {
        const { translateX } = state;

        const translate = translateX;

        const fullSliderSize = this.getFullSliderWidth();

        if (translate < 0 && translate > -fullSliderSize) {
            CSS.setVariable(
                this.draggableRef,
                'translateX',
                `${translate}px`
            );
        }
    }

    handleDragEnd(state, callback) {
        const activeSlide = this.calculateNextSlide(state);

        const slideSize = this.sliderWidth;

        const newTranslate = activeSlide * slideSize;

        CSS.setVariable(this.draggableRef, 'animation-speed', '300ms');

        CSS.setVariable(
            this.draggableRef,
            'translateX',
            `${newTranslate}px`
        );

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

    render() {
        const {
            showCrumbs,
            mix,
            activeImage,
            children
        } = this.props;

        return (
            <div
              block="Slider"
              mix={ mix }
              ref={ this.sliderRef }
            >
                <Draggable
                  mix={ { block: 'Slider', elem: 'Wrapper' } }
                  draggableRef={ this.draggableRef }
                  onDragStart={ this.handleDragStart }
                  onDragEnd={ this.handleDragEnd }
                  onDrag={ this.handleDrag }
                  onClick={ this.handleClick }
                  shiftX={ -activeImage * this.sliderWidth }
                >
                    { children }
                </Draggable>
                { showCrumbs && this.renderCrumbs() }
            </div>
        );
    }
}

export default Slider;
