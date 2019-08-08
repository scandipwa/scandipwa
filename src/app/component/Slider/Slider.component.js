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

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'Component/Draggable';
import CSS from 'Util/CSS';
import './Slider.style';

/**
 * Slider component
 * @class Slider
 */
class Slider extends Component {
    constructor(props) {
        super(props);

        const { activeImage } = this.props;

        this.state = {
            activeSlide: -activeImage,
            prevActiveImage: activeImage
        };

        this.prevPosition = 0;
        this.draggableRef = React.createRef();
        this.sliderRef = React.createRef();
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.renderCrumb = this.renderCrumb.bind(this);
        this.getSlideSize = this.getSlideSize.bind(this);
        console.log(this.state, this.props);
    }

    static getDerivedStateFromProps(props, state) {
        const { activeImage } = props;
        const { prevActiveImage } = state;

        if (prevActiveImage !== activeImage) {
            return {
                activeSlide: -activeImage,
                prevActiveImage: activeImage
            };
        }

        return null;
    }

    componentDidMount() {
        const sliderChildren = this.draggableRef.current.children;

        sliderChildren[0].onload = () => {
            CSS.setVariable(this.sliderRef, 'slider-height', `${sliderChildren[0].offsetHeight}px`);
        };

        setTimeout(() => {
            CSS.setVariable(this.sliderRef, 'slider-height', `${sliderChildren[0].offsetHeight}px`);
        }, 300);
    }

    componentDidUpdate(prevProps, prevState) {
        const { activeImage: prevActiveImage } = prevProps;
        const { activeImage, isVertical } = this.props;
        const { activeSlide: prevActiveSlide } = prevState;
        const { activeSlide } = this.state;

        if (activeImage !== prevActiveImage || prevActiveSlide !== activeSlide) {
            const newTranslate = activeSlide * this.getSlideSize();

            CSS.setVariable(
                this.draggableRef,
                'animation-speed',
                `${ Math.abs((prevActiveSlide - activeSlide) * 300) }ms`
            );

            CSS.setVariable(
                this.draggableRef,
                isVertical ? 'translateY' : 'translateX',
                `${newTranslate}px`
            );
        }
    }

    onClickChangeSlide(state, slideSize, lastTranslate, fullSliderSize) {
        const { originalX, prevActiveSlider } = state;
        const { isVertical } = this.props;

        const fullSliderPoss = Math.round(fullSliderSize / slideSize);
        const elementPossitionInDOM = isVertical
            ? this.draggableRef.current.getBoundingClientRect().y
            : this.draggableRef.current.getBoundingClientRect().x;

        const sliderPossition = prevActiveSlider;
        const realElementPossitionInDOM = elementPossitionInDOM - lastTranslate;
        const mousePossitionInElement = originalX - realElementPossitionInDOM;

        if (slideSize / 2 < mousePossitionInElement && -fullSliderPoss < sliderPossition) {
            const activeSlide = sliderPossition - 1;
            this.setState({ activeSlide });
            return activeSlide;
        }

        if (slideSize / 2 > mousePossitionInElement && lastTranslate) {
            const activeSlide = sliderPossition + 1;
            this.setState({ activeSlide });
            return activeSlide;
        }

        return sliderPossition;
    }

    getFullSliderWidth() {
        const sliderWidth = this.draggableRef.current.offsetWidth;
        const fullSliderWidth = this.draggableRef.current.scrollWidth;
        return fullSliderWidth - sliderWidth;
    }

    getFullSliderHeight() {
        const sliderHeight = this.sliderRef.current.offsetHeight;
        const fullSliderHeight = this.sliderRef.current.scrollHeight;
        return fullSliderHeight - sliderHeight;
    }

    getSlideSize() {
        const { isVertical } = this.props;

        return isVertical
            ? this.sliderRef.current.offsetHeight
            : this.draggableRef.current.offsetWidth;
    }

    calculateNextSlide(state) {
        const {
            translateX,
            lastTranslateX,
            translateY,
            lastTranslateY
        } = state;

        const { isVertical } = this.props;

        const translate = isVertical ? translateY : translateX;
        const lastTranslate = isVertical ? lastTranslateY : lastTranslateX;

        const slideSize = this.getSlideSize();

        const fullSliderSize = isVertical
            ? this.getFullSliderHeight()
            : this.getFullSliderWidth();

        const activeSlidePosition = translate / slideSize;
        const activeSlidePercent = Math.abs(activeSlidePosition % 1);
        const isSlideBack = translate > lastTranslate;

        if (!translate) return this.onClickChangeSlide(state, slideSize, lastTranslate, fullSliderSize);

        if (translate > 0) return 0;

        if (translate < -fullSliderSize) {
            const activeSlide = Math.round(fullSliderSize / -slideSize);
            this.setState({ activeSlide });
            return activeSlide;
        }

        if (isSlideBack && activeSlidePercent < 0.90) {
            const activeSlide = Math.ceil(activeSlidePosition);
            this.setState({ activeSlide });
            return activeSlide;
        }

        if (!isSlideBack && activeSlidePercent > 0.10) {
            const activeSlide = Math.floor(activeSlidePosition);
            this.setState({ activeSlide });
            return activeSlide;
        }

        return Math.round(activeSlidePosition);
    }

    handleDragStart() {
        CSS.setVariable(this.draggableRef, 'animation-speed', '0');
    }

    handleDrag(state) {
        const { isVertical } = this.props;
        const { translateY, translateX } = state;

        const translate = isVertical ? translateY : translateX;

        const fullSliderSize = isVertical
            ? this.getFullSliderHeight()
            : this.getFullSliderWidth();

        if (translate < 0 && translate > -fullSliderSize) {
            CSS.setVariable(
                this.draggableRef,
                isVertical ? 'translateY' : 'translateX',
                `${translate}px`
            );
        }
    }

    handleDragEnd(state, callback) {
        const { isVertical } = this.props;
        const { translateY, translateX } = state;

        const activeSlide = this.calculateNextSlide(state);

        const slideSize = isVertical
            ? this.sliderRef.current.offsetHeight
            : this.draggableRef.current.offsetWidth;

        const newTranslate = activeSlide * slideSize;

        CSS.setVariable(this.draggableRef, 'animation-speed', '300ms');

        CSS.setVariable(
            this.draggableRef,
            isVertical ? 'translateY' : 'translateX',
            `${newTranslate}px`
        );

        if (isVertical) {
            callback({
                originalX: translateX,
                originalY: newTranslate,
                lastTranslateX: translateY,
                lastTranslateY: newTranslate
            });
        } else {
            callback({
                originalX: newTranslate,
                originalY: translateY,
                lastTranslateX: newTranslate,
                lastTranslateY: translateY
            });
        }
    }

    changeActiveImage(activeImage) {
        this.setState({
            activeSlide: -activeImage
        });
    }

    renderCrumbs() {
        const { children, isVertical } = this.props;

        return (
            <div
              block="Slider"
              elem="Crumbs"
              mods={ { isVertical, isHorizontal: !isVertical } }
            >
                { Children.map(children, this.renderCrumb) }
            </div>
        );
    }

    renderCrumb(_, i) {
        const { activeSlide } = this.state;
        const isActive = i === Math.abs(activeSlide);

        return (
            <button
              block="Slider"
              elem="Image"
              mods={ { type: 'single' } }
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

    renderSlides() {
        const { children } = this.props;
        return Children.map(children, slide => slide);
    }

    render() {
        const { isVertical, showCrumbs, mix } = this.props;
        const { activeSlide } = this.state;

        return (
            <div
              block="Slider"
              mods={ { isVertical } }
              mix={ mix }
              ref={ this.sliderRef }
            >
                <Draggable
                  mix={ { block: 'Slider', elem: 'Wrapper', mods: { isVertical } } }
                  draggableRef={ this.draggableRef }
                  onDragStart={ this.handleDragStart }
                  onDragEnd={ this.handleDragEnd }
                  onDrag={ this.handleDrag }
                  activeSlide={ activeSlide }
                >
                    { this.renderSlides() }
                </Draggable>
                { showCrumbs && this.renderCrumbs() }
            </div>
        );
    }
}

Slider.propTypes = {
    isVertical: PropTypes.bool,
    showCrumbs: PropTypes.bool,
    activeImage: PropTypes.number,
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string,
        mods: PropTypes.objectOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool
            ])
        )
    }),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

Slider.defaultProps = {
    activeImage: 0,
    isVertical: false,
    showCrumbs: false,
    mix: {}
};

export default Slider;
