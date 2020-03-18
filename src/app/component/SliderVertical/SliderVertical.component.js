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

import CSS from 'Util/CSS';
import Draggable from 'Component/Draggable';
import Slider from 'Component/Slider';
import './SliderVertical.style';

export const ANIMATION_DURATION = 300;
export const ACTIVE_SLIDE_PERCENT = 0.1;

/**
 * Slider component
 * @class Slider
 */
export default class SliderVertical extends Slider {
    componentDidMount() {
        const sliderChildren = this.draggableRef.current.children;
        const sliderHeight = this.draggableRef.current.offsetHeight;
        this.sliderHeight = sliderHeight;

        if (!sliderChildren || !sliderChildren[0]) return;

        sliderChildren[0].onload = () => {
            CSS.setVariable(this.sliderRef, 'slider-width', `${ sliderChildren[0].offsetWidth }px`);
        };

        setTimeout(() => {
            CSS.setVariable(this.sliderRef, 'slider-width', `${ sliderChildren[0].offsetWidth }px`);
        }, ANIMATION_DURATION);
    }

    componentDidUpdate(prevProps) {
        const { activeImage: prevActiveImage } = prevProps;
        const { activeImage } = this.props;

        if (activeImage !== prevActiveImage) {
            const newTranslate = -activeImage * this.sliderHeight;

            CSS.setVariable(
                this.draggableRef,
                'animation-speed',
                `${ Math.abs((prevActiveImage - activeImage) * ANIMATION_DURATION) }ms`
            );

            CSS.setVariable(
                this.draggableRef,
                'translateY',
                `${ newTranslate }px`
            );
        }
    }

    onClickChangeSlide() {
        const { prevActiveImage } = this.state;

        return -prevActiveImage;
    }

    getFullSliderHeight() {
        const fullSliderHeight = this.draggableRef.current.scrollHeight;
        return fullSliderHeight - this.sliderHeight;
    }

    calculateNextSlide(state) {
        const {
            translateY: translate,
            lastTranslateY: lastTranslate
        } = state;
        const { onActiveImageChange } = this.props;

        const slideSize = this.sliderHeight;

        const fullSliderSize = this.getFullSliderHeight();

        const activeSlidePosition = translate / slideSize;
        const activeSlidePercent = Math.abs(activeSlidePosition % 1);
        const isSlideBack = translate > lastTranslate;

        if (!translate) return this.onClickChangeSlide();

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

    handleDrag(state) {
        const { translateY } = state;

        const translate = translateY;

        const fullSliderSize = this.getFullSliderHeight();

        if (translate < 0 && translate > -fullSliderSize) {
            CSS.setVariable(
                this.draggableRef,
                'translateY',
                `${ translate }px`
            );
        }
    }

    handleDragEnd(state, callback) {
        const activeSlide = this.calculateNextSlide(state);

        const slideSize = this.sliderHeight;

        const newTranslate = activeSlide * slideSize;

        CSS.setVariable(this.draggableRef, 'animation-speed', '300ms');

        CSS.setVariable(
            this.draggableRef,
            'translateY',
            `${ newTranslate }px`
        );

        callback({
            originalY: newTranslate,
            lastTranslateY: newTranslate
        });
    }

    render() {
        const {
            showCrumbs, mix, activeImage, children
        } = this.props;

        return (
            <div
              block="Slider"
              mix={ mix }
              ref={ this.sliderRef }
            >
                <Draggable
                  mix={ { block: 'Slider', elem: 'Wrapper', mods: { isVertical: true } } }
                  draggableRef={ this.draggableRef }
                  onDragStart={ this.handleDragStart }
                  onDragEnd={ this.handleDragEnd }
                  onDrag={ this.handleDrag }
                  shiftY={ -activeImage * this.sliderHeight }
                >
                    { children }
                </Draggable>
                { showCrumbs && this.renderCrumbs() }
            </div>
        );
    }
}
