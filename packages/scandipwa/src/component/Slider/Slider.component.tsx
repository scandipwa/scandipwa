/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import {
    Children,
    createRef,
    MouseEvent,
    PureComponent,
    ReactNode,
    RefObject,
} from 'react';

import ChevronIcon from 'Component/ChevronIcon';
import { Directions } from 'Component/ChevronIcon/ChevronIcon.config';
import Draggable from 'Component/Draggable';
import { DraggableComponentState } from 'Component/Draggable/Draggable.type';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import CSS from 'Util/CSS';
import { isRtl } from 'Util/CSS/CSS';

import {
    ACTIVE_SLIDE_PERCENT,
    ANIMATION_DURATION,
    HEIGHT_TRANSITION_SPEED_ON_MOUNT,
} from './Slider.config';
import { SliderComponentProps, SliderComponentState } from './Slider.type';

import './Slider.style';

/**
 * Slider component
 * @class Slider
 * @namespace Component/Slider/Component
 */
export class SliderComponent<
P extends Readonly<SliderComponentProps> = Readonly<SliderComponentProps>,
S extends SliderComponentState = SliderComponentState,
> extends PureComponent <P, S> {
    static defaultProps: Partial<SliderComponentProps> = {
        activeImage: 0,
        onActiveImageChange: noopFn,
        showCrumbs: false,
        showArrows: false,
        showCounter: false,
        isInteractionDisabled: false,
        mix: {},
        onClick: noopFn,
        isVertical: false,
        isHeightTransitionDisabledOnMount: false,
        sliderHeight: 0,
        sliderRef: null,
    };

    sliderWidth = 0;

    draggableRef = createRef<HTMLDivElement>();

    sliderRef = createRef<HTMLDivElement>();

    __construct(props: P): void {
        super.__construct?.(props);

        const { activeImage } = this.props;

        this.state = {
            isInitialized: false,
            prevActiveImage: activeImage,
        } as S;

        this.handleDragStart = this.handleInteraction.bind(this, this.handleDragStart);
        this.handleDrag = this.handleInteraction.bind(this, this.handleDrag);
        this.handleDragEnd = this.handleInteraction.bind(this, this.handleDragEnd);
        this.renderCrumb = this.renderCrumb.bind(this);
        this.renderCounter = this.renderCounter.bind(this);
        this.goNext = this.goNext.bind(this);
        this.goPrev = this.goPrev.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    static getDerivedStateFromProps(
        props: SliderComponentProps,
        state: SliderComponentState,
    ): Partial<SliderComponentState> | null {
        const { activeImage, children } = props;
        const { prevActiveImage } = state;

        if (prevActiveImage !== activeImage && Array.isArray(children) && children.length !== 1) {
            return { prevActiveImage: activeImage };
        }

        return null;
    }

    componentDidMount(): void {
        this.addWindowResizeWatcher();

        if (!this.getIsSlider() || !this.draggableRef.current) {
            return;
        }

        const sliderChildren = this.draggableRef.current.children;
        const sliderWidth = this.draggableRef.current.offsetWidth;

        this.sliderWidth = sliderWidth;

        if (!sliderChildren || !sliderChildren[0]) {
            return;
        }

        const sliderRef = this.getSliderRef();

        CSS.setVariable(sliderRef, 'sliderOpacity', '0');

        // delay setting carousel translate to avoid wrong calculations be made during transition
        setTimeout(() => {
            this.setStyleVariablesOnMount();
        }, 0);

        const target = sliderChildren[0].querySelector<HTMLImageElement>('img')
        || sliderChildren[0] as HTMLImageElement;

        target.onload = () => {
            const height = target.offsetHeight;
            const sliderHeight = `${ height }px`;

            CSS.setVariable(sliderRef, 'slider-height', sliderHeight);
        };

        setTimeout(() => {
            const height = target.offsetHeight;
            const sliderHeight = `${ height }px`;

            if (height !== 0) {
                CSS.setVariable(sliderRef, 'slider-height', sliderHeight);
            }
        }, ANIMATION_DURATION);

        setTimeout(() => CSS.setVariable(sliderRef, 'sliderOpacity', '1'), 0);
    }

    componentDidUpdate(prevProps: SliderComponentProps): void {
        const { activeImage: prevActiveImage } = prevProps;
        const { activeImage } = this.props;
        const { isInitialized } = this.state;

        if (activeImage !== prevActiveImage && this.getIsSlider()) {
            const newTranslate = -activeImage * this.getSlideWidth() * this.getDir();

            if (!isInitialized) {
                this.setTranlateXStyle(newTranslate);

                this.setState({ isInitialized: true });

                return;
            }

            this.setAnimationSpeedStyle(Math.abs((prevActiveImage - activeImage) * ANIMATION_DURATION));
            this.setTranlateXStyle(newTranslate);
        }
    }

    getDir(): number {
        const { isVertical } = this.props;

        if (!isVertical && isRtl()) {
            return -1;
        }

        return 1;
    }

    addWindowResizeWatcher(): void {
        window.addEventListener('resize', () => {
            const { activeImage } = this.props;
            const newTranslate = -activeImage * this.getSlideWidth() * this.getDir();

            this.setTranlateXStyle(newTranslate);

            // Removed animation to avoid image movement while changing window width.
            this.setAnimationSpeedStyle(0);

            const delay = 500;

            setTimeout(() => {
                this.setAnimationSpeedStyle();
            }, delay);
        });
    }

    setStyleVariablesOnMount(): void {
        const { sliderHeight, isHeightTransitionDisabledOnMount, activeImage } = this.props;

        const sliderRef = this.getSliderRef();

        if (isHeightTransitionDisabledOnMount) {
            const transitionSpeed = isHeightTransitionDisabledOnMount
                ? 0
                : `${ HEIGHT_TRANSITION_SPEED_ON_MOUNT }ms`;

            CSS.setVariable(
                sliderRef,
                'height-transition-speed',
                transitionSpeed,
            );
        }

        if (sliderHeight) {
            CSS.setVariable(sliderRef, 'slider-height', sliderHeight);
        }

        const newTranslate = -activeImage * this.getSlideWidth() * this.getDir();

        this.setTranlateXStyle(newTranslate);
    }

    setTranlateXStyle(translate: number): void {
        const { isVertical } = this.props;

        CSS.setVariable(
            this.draggableRef,
            isVertical ? 'translateY' : 'translateX',
            `${ translate }px`,
        );
    }

    setAnimationSpeedStyle(animationDuration = ANIMATION_DURATION): void {
        CSS.setVariable(this.draggableRef, 'animation-speed', `${ animationDuration }ms`);
    }

    getIsSlider(): boolean {
        const { children } = this.props;

        return children.length > 0;
    }

    getSlideWidth(): number {
        const { isVertical } = this.props;
        const { offsetWidth = 0, offsetHeight = 0 } = this.draggableRef.current || {};

        return isVertical ? offsetHeight : offsetWidth;
    }

    getSliderRef(): RefObject<HTMLDivElement> {
        const { sliderRef } = this.props;

        return sliderRef || this.sliderRef;
    }

    onClickChangeSlide(
        state: DraggableComponentState,
        slideSize: number,
        lastTranslate: number,
        fullSliderSize: number,
    ): number {
        const { originalX } = state;
        const { prevActiveImage: prevActiveSlider } = this.state;
        const { onActiveImageChange, device, onClick } = this.props;

        if (onClick) {
            onClick();

            return -prevActiveSlider;
        }

        const fullSliderPoss = Math.round(fullSliderSize / slideSize);
        const elementPositionInDOM = this.draggableRef.current?.getBoundingClientRect().x || 0;

        const sliderPosition = -prevActiveSlider;
        const realElementPositionInDOM = elementPositionInDOM - lastTranslate;
        const mousePositionInElement = originalX - realElementPositionInDOM;

        if (device.isMobile) {
            return sliderPosition;
        }

        if (slideSize / 2 < mousePositionInElement && -fullSliderPoss < sliderPosition) {
            const activeSlide = sliderPosition - 1;

            onActiveImageChange(-activeSlide);

            return activeSlide;
        }

        if (slideSize / 2 > mousePositionInElement && lastTranslate) {
            const activeSlide = sliderPosition + 1;

            onActiveImageChange(-activeSlide);

            return activeSlide;
        }

        return sliderPosition;
    }

    getFullSliderWidth(): number {
        const { isVertical } = this.props;
        const { scrollWidth: fullSliderWidth, scrollHeight } = this.draggableRef.current as HTMLDivElement;

        const width = isVertical ? scrollHeight : fullSliderWidth;

        return width - this.getSlideWidth();
    }

    calculateNextSlide(state: DraggableComponentState): number {
        const { isVertical } = this.props;
        const {
            translateX,
            translateY,
            lastTranslateX,
            lastTranslateY,
        } = state;

        const lastTranslate = isVertical ? lastTranslateY : lastTranslateX;
        const translate = isVertical ? translateY : translateX;

        const { onActiveImageChange } = this.props;

        const slideSize = this.getSlideWidth();

        const fullSliderSize = this.getFullSliderWidth();

        const dir = this.getDir();
        const activeSlidePosition = translate / slideSize;
        const activeSlidePercent = Math.abs(activeSlidePosition % 1);
        const isSlideBack = dir === 1 ? translate > lastTranslate : translate < lastTranslate;

        if (!translate) {
            return this.onClickChangeSlide(state, slideSize, lastTranslate, fullSliderSize);
        }

        if ((dir === 1 && translate >= 0) || (dir === -1 && translate < 0)) {
            onActiveImageChange(0);

            return 0;
        }

        if ((dir === 1 && translate < -fullSliderSize) || (dir === -1 && translate > fullSliderSize)) {
            const activeSlide = Math.round(fullSliderSize / (-slideSize * dir));

            onActiveImageChange(-activeSlide);

            return activeSlide;
        }

        if (isSlideBack && activeSlidePercent < 1 - ACTIVE_SLIDE_PERCENT) {
            const activeSlide = Math[dir === 1 ? 'ceil' : 'floor'](activeSlidePosition);

            onActiveImageChange(-activeSlide);

            return activeSlide;
        }

        if (!isSlideBack && activeSlidePercent > ACTIVE_SLIDE_PERCENT) {
            const activeSlide = Math[dir === 1 ? 'floor' : 'ceil'](activeSlidePosition);

            onActiveImageChange(-activeSlide);

            return activeSlide;
        }

        const activeSlide = Math.round(activeSlidePosition);

        onActiveImageChange(-activeSlide);

        return activeSlide;
    }

    handleDragStart(): void {
        this.setAnimationSpeedStyle(0);
    }

    handleDrag(state: DraggableComponentState): void {
        const { isVertical } = this.props;
        const { translateX, translateY } = state;
        const translate = isVertical ? translateY : translateX;
        const fullSliderSize = this.getFullSliderWidth();
        const dir = this.getDir();
        const canDrag = dir === 1
            ? translate < 0 && translate > -fullSliderSize
            : translate > 0 && translate < fullSliderSize;

        if (canDrag) {
            this.setTranlateXStyle(translate);
        }
    }

    handleDragEnd(state: DraggableComponentState, callback: (state: Partial<DraggableComponentState>) => void): void {
        const { isVertical } = this.props;
        const activeSlide = this.calculateNextSlide(state);
        const slideSize = this.getSlideWidth();
        const newTranslate = activeSlide * slideSize;

        this.setAnimationSpeedStyle();
        this.setTranlateXStyle(newTranslate);

        if (isVertical) {
            callback({
                originalY: newTranslate,
                lastTranslateY: newTranslate,
            });

            return;
        }

        callback({
            originalX: newTranslate,
            lastTranslateX: newTranslate,
        });
    }

    handleClick(
        state: DraggableComponentState,
        callback: (state: Partial<DraggableComponentState>) => void,
        e: MouseEvent,
    ): void {
        if (e.type === 'contextmenu') {
            this.handleDragEnd(state, callback);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleInteraction(callback: (...args: any[]) => void, ...args: any[]): void {
        const { isInteractionDisabled } = this.props;

        if (isInteractionDisabled || !callback) {
            return;
        }

        callback.call(this, ...args);
    }

    changeActiveImage(activeImage: number): void {
        const { onActiveImageChange } = this.props;

        onActiveImageChange(activeImage);
    }

    goPrev(): void {
        const { activeImage } = this.props;

        if (activeImage > 0) {
            this.changeActiveImage(activeImage - 1);
        }
    }

    goNext(): void {
        const { activeImage, children } = this.props;
        const nextImage = activeImage + 1;

        if (nextImage < children.length) {
            this.changeActiveImage(nextImage);
        }
    }

    renderCounter(): ReactElement {
        const { children, showCounter, activeImage } = this.props;

        if (!showCounter || children.length <= 1) {
            return null;
        }

        return (
            <div
              block="Slider"
              elem="Counter"
            >
                { activeImage + 1 }
                /
                { children.length }
            </div>
        );
    }

    renderCrumbs(): ReactElement {
        const { children, showCrumbs } = this.props;

        if (!showCrumbs || children.length <= 1) {
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

    renderCrumb(_: ReactNode, i: number): ReactElement {
        const { activeImage } = this.props;
        const isActive = i === Math.abs(-activeImage);

        return (
            <button
              block="Slider"
              elem="Image"
              mods={ { type: 'single' } }
              // eslint-disable-next-line react/jsx-no-bind
              onClick={ () => this.changeActiveImage(i) }
              aria-label={ __('Slide crumb') }
            >
                <div
                  block="Slider"
                  elem="Crumb"
                  mods={ { isActive } }
                />
            </button>
        );
    }

    renderArrows(): ReactElement {
        const { showArrows, activeImage, children } = this.props;
        const nextIsDisabled = activeImage + 1 === children.length;
        const prevIsDisabled = activeImage === 0;

        if (!showArrows) {
            return null;
        }

        return (
            <>
                <button
                  block="Slider"
                  elem="Arrow"
                  mods={ { isPrev: true, isDisabled: prevIsDisabled } }
                  aria-label={ __('Previous') }
                  onClick={ this.goPrev }
                >
                    <ChevronIcon direction={ Directions.LEFT } />
                </button>
                <button
                  block="Slider"
                  elem="Arrow"
                  mods={ { isNext: true, isDisabled: nextIsDisabled } }
                  aria-label={ __('Next') }
                  onClick={ this.goNext }
                >
                    <ChevronIcon direction={ Directions.RIGHT } />
                </button>
            </>
        );
    }

    renderSliderContent(): ReactElement {
        const { activeImage, children, isVertical } = this.props;
        const dir = this.getDir();

        if (!this.getIsSlider()) {
            return children;
        }

        return (
            <Draggable
              mix={ { block: 'Slider', elem: 'Wrapper', mods: { isVertical } } }
              draggableRef={ this.draggableRef }
              onDragStart={ this.handleDragStart }
              onDragEnd={ this.handleDragEnd }
              onDrag={ this.handleDrag }
              onClick={ this.handleClick }
              shiftX={ -activeImage * this.getSlideWidth() * dir }
              shiftY={ -activeImage * this.getSlideWidth() }
            >
                { children }
            </Draggable>
        );
    }

    render(): ReactElement {
        const { mix } = this.props;

        return (
            <>
                <div
                  block="Slider"
                  mix={ mix }
                  ref={ this.getSliderRef() }
                >
                    { this.renderSliderContent() }
                    { this.renderCrumbs() }
                    { this.renderCounter() }
                </div>
                { this.renderArrows() }
            </>
        );
    }
}

export default SliderComponent;
