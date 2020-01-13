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

import { PureComponent, Children, createRef } from 'react';
import PropTypes from 'prop-types';
import CSS from 'Util/CSS';
import { MixType, ChildrenType } from 'Type/Common';
import Draggable from 'Component/Draggable';
import './Slider.style';
import {
    TABLET_WIDTH,
    DESKTOP_WIDTH
} from 'Component/SliderWidget/SliderWidget.component';

export const ANIMATION_DURATION = 300;
export const ACTIVE_SLIDE_PERCENT = 0.1;


/**
 * Slider component
 * @class Slider
 */
export default class Slider extends PureComponent {
    static propTypes = {
        showCrumbs: PropTypes.bool,
        activeImage: PropTypes.number,
        onActiveImageChange: PropTypes.func,
        mix: MixType,
        children: ChildrenType.isRequired,
        slidesOnDesktop: PropTypes.number,
        slidesOnTablet: PropTypes.number,
        slidesOnMobile: PropTypes.number
    };

    static defaultProps = {
        activeImage: 0,
        onActiveImageChange: () => {},
        showCrumbs: false,
        mix: {},
        slidesOnDesktop: 1,
        slidesOnTablet: 1,
        slidesOnMobile: 1
    };

    sliderWidth = 0;

    slideWidth = 0;

    prevPosition = 0;

    slidesQty = 0;

    draggableRef = createRef();

    sliderRef = createRef();

    handleDragStart = this.handleDragStart.bind(this);

    handleDrag = this.handleDrag.bind(this);

    handleDragEnd = this.handleDragEnd.bind(this);

    renderCrumb = this.renderCrumb.bind(this);


    constructor(props) {
        super(props);

        const { activeImage } = this.props;

        this.state = {
            prevActiveImage: activeImage,
            slidesQtyPerPage: 1
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

        if (!sliderChildren || !sliderChildren[0]) return;

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        sliderChildren[0].onload = () => {
            CSS.setVariable(this.sliderRef, 'slider-height', `${sliderChildren[0].offsetHeight}px`);
        };

        setTimeout(() => {
            CSS.setVariable(this.sliderRef, 'slider-height', `${sliderChildren[0].offsetHeight}px`);
        }, ANIMATION_DURATION);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    componentDidUpdate(prevProps) {
        const { activeImage: prevActiveImage } = prevProps;
        const { activeImage, children } = this.props;

        this.slidesQty = children.length;

        if (activeImage !== prevActiveImage) {
            const newTranslate = Math.max(-activeImage * this.slideWidth, -this.getDraggableAreaWidth());

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

    updateWindowDimensions = () => {
        const { slidesOnDesktop, slidesOnTablet, slidesOnMobile } = this.props;
        const { offsetWidth: sliderWidth = 0 } = this.draggableRef.current || {};
        this.sliderWidth = sliderWidth;

        if (window.innerWidth >= DESKTOP_WIDTH) {
            const slidesQtyPerPage = slidesOnDesktop || 1;
            this.setState({ slidesQtyPerPage });
            this.slideWidth = sliderWidth / slidesQtyPerPage;
        } else if (window.innerWidth >= TABLET_WIDTH) {
            const slidesQtyPerPage = slidesOnTablet || 1;
            this.setState({ slidesQtyPerPage });
            this.slideWidth = sliderWidth / slidesQtyPerPage;
        } else {
            const slidesQtyPerPage = slidesOnMobile || 1;
            this.setState({ slidesQtyPerPage });
            this.slideWidth = sliderWidth / slidesQtyPerPage;
        }

        this.changeActiveImage(0);
    };

    onClickChangeSlide(state, slideSize, lastTranslate, fullSliderSize) {
        const { originalX } = state;
        const { prevActiveImage: prevActiveSlider } = this.state;
        const { onActiveImageChange } = this.props;

        const fullSliderPoss = Math.round(fullSliderSize / slideSize);
        const elementPossitionInDOM = this.draggableRef.current.getBoundingClientRect().x;

        const sliderPossition = -prevActiveSlider;
        const realElementPossitionInDOM = elementPossitionInDOM - lastTranslate;
        const mousePossitionInElement = originalX - realElementPossitionInDOM;

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
        return this.slidesQty * this.slideWidth;
    }

    getDraggableAreaWidth() {
        return this.getFullSliderWidth() - this.sliderWidth;
    }

    calculateNextSlide(state) {
        const {
            translateX: translate,
            lastTranslateX: lastTranslate
        } = state;
        const { onActiveImageChange } = this.props;

        const slideSize = this.slideWidth;

        const draggableAreaWidth = this.getDraggableAreaWidth();

        const activeSlidePosition = translate / slideSize;
        const activeSlidePercent = Math.abs(activeSlidePosition % 1);
        const isSlideBack = translate > lastTranslate;

        if (!translate) return this.onClickChangeSlide(state, slideSize, lastTranslate, draggableAreaWidth);

        if (translate >= 0) {
            onActiveImageChange(0);
            return 0;
        }

        if (translate < -draggableAreaWidth) {
            const activeSlide = Math.floor(draggableAreaWidth / -slideSize);
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

        const draggableAreaWidth = this.getDraggableAreaWidth()

        if (translate < 0 && translate > -draggableAreaWidth) {
            CSS.setVariable(
                this.draggableRef,
                'translateX',
                `${Math.max(translate, -draggableAreaWidth)}px`
            );
        }
    }

    handleDragEnd(state, callback) {
        const activeSlide = this.calculateNextSlide(state);

        const slideSize = this.slideWidth;

        const draggableAreaWidth = this.getDraggableAreaWidth();
        const newTranslate = activeSlide === -(this.slidesQty - Math.floor(this.state.slidesQtyPerPage)) ? -draggableAreaWidth + 1 : activeSlide * slideSize;

        CSS.setVariable(this.draggableRef, 'animation-speed', '300ms');

        CSS.setVariable(
            this.draggableRef,
            'translateX',
            `${Math.max(newTranslate, -draggableAreaWidth)}px`
        );

        callback({
            originalX: newTranslate,
            lastTranslateX: newTranslate
        });
    }

    changeActiveImage(activeImage) {
        const { onActiveImageChange } = this.props;
        onActiveImageChange(activeImage);
    }

    renderCrumbs() {
        const { children } = this.props;

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
        const { slidesQtyPerPage } = this.state;
        const isActive = i === Math.abs(-activeImage);

        if (i > (this.slidesQty - Math.floor(slidesQtyPerPage))
            || this.slidesQty <= Math.floor(slidesQtyPerPage)) return false;


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
                  mix={ { block: 'Slider', elem: 'Wrapper' } }
                  draggableRef={ this.draggableRef }
                  onDragStart={ this.handleDragStart }
                  onDragEnd={ this.handleDragEnd }
                  onDrag={ this.handleDrag }
                  shiftX={ -activeImage * this.slideWidth }
                >
                    { children }
                </Draggable>
                { showCrumbs && this.renderCrumbs() }
            </div>
        );
    }
}