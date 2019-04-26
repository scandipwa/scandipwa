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

        this.state = { activeSlide: 0 };

        this.prevPosition = 0;
        this.draggableRef = React.createRef();
        this.sliderRef = React.createRef();
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.renderCrumb = this.renderCrumb.bind(this);
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

    getSlideSize() {
        const { isVertical } = this.props;

        return isVertical
            ? this.sliderRef.current.offsetHeight
            : this.draggableRef.current.offsetWidth;
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

        if (translate > 0) {
            return Math.floor(activeSlidePosition);
        }

        if (translate < -fullSliderSize) {
            return Math.ceil(activeSlidePosition);
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
            <div block="Slider" elem="Crumb" mods={ { isActive } } />
        );
    }

    renderSlides() {
        const { children } = this.props;
        return Children.map(children, slide => slide);
    }

    render() {
        const { isVertical, showCrumbs, mix } = this.props;

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
    isVertical: false,
    showCrumbs: false,
    mix: {}
};

export default Slider;
