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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'Component/Image';
import Figure from 'Component/Figure';
import CSS from 'Util/CSS';
import './Slider.style';

/**
 * Slider component
 * @class Slider
 */
class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            lastIndex: 0,
            dragStartX: 0,
            dragStartY: 0,
            slideWidth: 0,
            items: props.items,
            indexTimeChangeStart: 0,
            touchStartTime: 0, // TODO: replace with indexTimeChangeStart
            isTouching: false,
            isVerticalFirst: false,
            isMouseDown: false
        };

        this.slider = React.createRef();
        this.touchArea = React.createRef();
        this.carousel = React.createRef();

        this.renderThumbnailsNavigation = this.renderThumbnailsNavigation.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { items, isInfiniteScrollEnabled, animationInterval } = nextProps;

        if (items.length > 1 && isInfiniteScrollEnabled) {
            items.push(items[0]);
            items.unshift(items[nextProps.items.length - 2]);

            const translatePercentage = `${1 * -100 / items.length}%`;

            this.setState({ currentIndex: 1, lastIndex: 1 });
            CSS.setVariable(
                this.carousel,
                'transition-duration',
                '0'
            );
            CSS.setVariable(
                this.carousel,
                'translate-percentage',
                translatePercentage
            );

            if (animationInterval > 0) {
                this.interval = setInterval(() => {
                    const { isDirectionForward } = this.props;
                    const { isTouching, touchStartTime } = this.state;

                    if (isTouching) return;

                    if (touchStartTime + animationInterval > new Date().getTime()) {
                        return;
                    }

                    if (isDirectionForward) {
                        this.increaseCurrentIndex();
                        return;
                    }

                    this.decreaseCurrentIndex();
                }, animationInterval);
            }
        } else if (isInfiniteScrollEnabled) {
            this.setState({ currentIndex: 0, lastIndex: 0 });
            CSS.setVariable(
                this.carousel,
                'transition-duration',
                '0'
            );
            CSS.setVariable(
                this.carousel,
                'translate-percentage',
                '0%'
            );
        }

        this.setState({ items: nextProps.items });
    }

    componentDidUpdate() {
        const { items, isTouching } = this.state;
        const { isInfiniteScrollEnabled, slideSpeed } = this.props;

        if (isInfiniteScrollEnabled && items.length > 1 && !isTouching) {
            const { currentIndex } = this.state;

            if (currentIndex === 1) {
                this.timeout = setTimeout(() => {
                    CSS.setVariable(
                        this.carousel,
                        'transition-duration',
                        `${slideSpeed}ms`
                    );
                }, slideSpeed);
            }

            if (currentIndex === items.length - 1) {
                this.timeout = setTimeout(() => {
                    CSS.setVariable(
                        this.carousel,
                        'transition-duration',
                        '0'
                    );
                    CSS.setVariable(
                        this.carousel,
                        'translate-percentage',
                        `${1 * -100 / items.length}%`
                    );
                    this.setState({ currentIndex: 1, lastIndex: 1 });
                }, slideSpeed);
            }

            if (currentIndex === 0) {
                this.timeout = setTimeout(() => {
                    CSS.setVariable(
                        this.carousel,
                        'transition-duration',
                        '0'
                    );
                    CSS.setVariable(
                        this.carousel,
                        'translate-percentage',
                        `${(items.length - 2) * -100 / items.length}%`
                    );
                    this.setState({ currentIndex: items.length - 2, lastIndex: items.length - 2 });
                }, slideSpeed);
            }

            if (currentIndex !== 1 && currentIndex !== items.length - 2) {
                CSS.setVariable(
                    this.carousel,
                    'transition-duration',
                    `${slideSpeed}ms`
                );
                CSS.setVariable(
                    this.carousel,
                    'translate-percentage',
                    `${currentIndex * -100 / items.length}%`
                );
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearTimeout(this.timeout);
    }

    onKeyDown(event) {
        const { isKeyboardAllowed } = this.props;

        if (isKeyboardAllowed) {
            if (event.keyCode === 37) {
                this.decreaseCurrentIndex();
            } else if (event.keyCode === 39) {
                this.increaseCurrentIndex();
            }
        }
    }

    onLeftClick() {
        this.decreaseCurrentIndex();
    }

    onRightClick() {
        this.increaseCurrentIndex();
    }

    /**
     * Click on slider side tumbnail. Change current image to the selected
     * @param {Number} id thumbnail id
     * @return {void}
     */
    onThumbnailClick(id) {
        const { indexTimeChangeStart, items } = this.state;
        const { slideSpeed } = this.props;
        const timestamp = new Date().getTime();

        if (indexTimeChangeStart > timestamp) return;

        this.setState({
            lastIndex: id,
            currentIndex: id,
            indexTimeChangeStart: timestamp + slideSpeed
        });

        CSS.setVariable(
            this.carousel,
            'transition-duration',
            `${slideSpeed}ms`
        );
        CSS.setVariable(
            this.carousel,
            'translate-percentage',
            `${id * -100 / items.length}%`
        );
    }

    getKey(id) {
        return id;
    }

    getDragX(event, isTouch) {
        return isTouch
            ? event.touches[0].pageX
            : event.pageX;
    }

    getDragY(event, isTouch) {
        return isTouch
            ? event.touches[0].pageY
            : event.pageY;
    }

    increaseCurrentIndex() {
        const { currentIndex, items, indexTimeChangeStart } = this.state;
        const { slideSpeed } = this.props;
        const timestamp = new Date().getTime();

        if (items.length > 1) {
            if (currentIndex + 1 <= items.length - 1 && indexTimeChangeStart < timestamp) {
                this.setState({
                    currentIndex: currentIndex + 1,
                    lastIndex: currentIndex + 1,
                    indexTimeChangeStart: timestamp + slideSpeed
                });

                CSS.setVariable(
                    this.carousel,
                    'translate-percentage',
                    `${(currentIndex + 1) * -100 / items.length}%`
                );
            }
        }
    }

    decreaseCurrentIndex() {
        const { currentIndex, items, indexTimeChangeStart } = this.state;
        const { slideSpeed } = this.props;
        const timestamp = new Date().getTime();

        if (items.length > 1) {
            if (currentIndex - 1 >= 0 && indexTimeChangeStart < timestamp) {
                this.setState({
                    currentIndex: currentIndex - 1,
                    lastIndex: currentIndex - 1,
                    indexTimeChangeStart: timestamp + slideSpeed
                });

                CSS.setVariable(
                    this.carousel, 'translate-percentage',
                    `${(currentIndex - 1) * -100 / items.length}%`
                );
            }
        }
    }

    handleDragStart(event, isTouch) {
        if (!isTouch) event.preventDefault();

        const slideWidth = this.touchArea.current.offsetWidth;
        const x = this.getDragX(event, isTouch);
        const y = this.getDragY(event, isTouch);
        const { indexTimeChangeStart } = this.state;

        if (indexTimeChangeStart > new Date().getTime()) return;

        this.setState({
            dragStartX: x,
            dragStartY: y,
            slideWidth,
            isTouching: true,
            isMouseDown: !isTouch
        });

        CSS.setVariable(
            this.carousel,
            'transition-duration',
            '0'
        );
    }

    handleDragMove(event, isTouch) {
        const {
            dragStartX,
            dragStartY,
            lastIndex,
            slideWidth,
            indexTimeChangeStart,
            isTouching,
            isVerticalFirst,
            isMouseDown
        } = this.state;

        if (!isTouch && !isMouseDown) return;

        if (indexTimeChangeStart > new Date().getTime() || !isTouching) {
            return;
        }

        const { items } = this.state;
        const x = this.getDragX(event, isTouch);
        const y = this.getDragY(event, isTouch);

        const offset = dragStartX - x;

        if (x === dragStartX && y !== dragStartY) {
            this.setState({ isVerticalFirst: true });
            return;
        }

        if (isVerticalFirst) return;

        let percentageOffset = offset / slideWidth;

        if (Math.abs(percentageOffset) > 1) {
            percentageOffset = percentageOffset < 0 ? -1 : 1;
        }

        let newIndex = lastIndex + percentageOffset;

        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= items.length - 1) {
            newIndex = items.length - 1;
        }

        CSS.setVariable(
            this.carousel,
            'translate-percentage',
            `${newIndex * -100 / items.length}%`
        );
    }

    handleDragEnd(event, isTouch) {
        const { slideSpeed } = this.props;
        const {
            dragStartX,
            lastIndex,
            indexTimeChangeStart,
            items: { length },
            slideWidth,
            isTouching
        } = this.state;

        if (indexTimeChangeStart > new Date().getTime() || !isTouching) {
            return;
        }

        const offset = isTouch
            ? dragStartX - event.changedTouches[0].pageX
            : dragStartX - event.pageX;

        let percentageOffset = offset / slideWidth;

        if (Math.abs(percentageOffset) > 0.25) {
            percentageOffset = percentageOffset < 0 ? -1 : 1;
        }

        let newIndex = lastIndex + percentageOffset;

        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= length - 1) {
            newIndex = length - 1;
        }

        newIndex = Math.round(newIndex);

        // add velocity

        const newIndexTimeChangeStart = (newIndex !== lastIndex)
            ? new Date().getTime() + slideSpeed
            : indexTimeChangeStart;

        CSS.setVariable(
            this.carousel,
            'translate-percentage',
            `${newIndex * -100 / length}%`
        );

        this.setState({
            dragStartX: 0,
            dragStartY: 0,
            currentIndex: newIndex,
            lastIndex: newIndex,
            isTouching: false,
            touchStartTime: new Date().getTime(),
            indexTimeChangeStart: newIndexTimeChangeStart,
            isVerticalFirst: false,
            isMouseDown: false
        });

        CSS.setVariable(
            this.carousel,
            'transition-duration',
            `${slideSpeed}ms`
        );
    }

    handleMouseLeave(event) {
        const { isMouseDown } = this.state;

        if (isMouseDown) {
            this.handleDragEnd(event, false);
        }
    }

    isVisible(id) {
        const { isInfiniteScrollEnabled } = this.props;
        const { items } = this.state;

        return isInfiniteScrollEnabled && items.length !== 1
            ? id !== items.length - 1 && id !== 0 // is visible if not the "fake" item
            : items.length >= 1; // is visible if items has more than 1 entry and has image
    }

    renderThumbnailsNavigation(item, id) {
        const { isInfiniteScrollEnabled, block } = this.props;
        const { currentIndex, items } = this.state;

        const isVisible = this.isVisible(id);

        const isActiveInInfiniteScroll = (id === currentIndex)
            || (id === 1 && currentIndex === items.length - 1)
            || (id === items.length - 2 && currentIndex === 0);

        const active = isInfiniteScrollEnabled ? isVisible && isActiveInInfiniteScroll : id === currentIndex;

        if (isVisible) {
            return (
                <button
                  key={ this.getKey(id, item) }
                  block={ block }
                  elem="Thumbnail"
                  mods={ { active } }
                  onClick={ () => this.onThumbnailClick(id) }
                  disabled={ !item.image } // if images are not loaded yet
                >
                    <Image src={ item.image } alt="Thumnail of product image" />
                </button>
            );
        }

        return null;
    }

    renderThumbnails() {
        const { items } = this.state;
        const { arePlaceholdersShown, block } = this.props;

        return (
            <nav>
                { items.map(this.renderThumbnailsNavigation) }
                { arePlaceholdersShown && this.renderPlaceholders(block) }
            </nav>
        );
    }

    renderPlaceholders(block) {
        return (
            <>
                <button block={ block } elem="Thumbnail" disabled>
                    <Image alt="Slider images placeholder" />
                </button>
                <button block={ block } elem="Thumbnail" disabled>
                    <Image alt="Slider images placeholder" />
                </button>
            </>
        );
    }

    renderArrowButtons(items, currentIndex, block) {
        const { isInfiniteScrollEnabled } = this.props;

        const directionMod = direction => ({ [direction]: true });

        return (
            <>
                <button
                  block="Slider"
                  elem="Button"
                  mods={ directionMod('back') }
                  onClick={ () => this.onLeftClick() }
                  disabled={ !isInfiniteScrollEnabled && currentIndex === 0 }
                  mix={ { block, elem: 'Button', mods: directionMod('back') } }
                />
                <button
                  block="Slider"
                  elem="Button"
                  mods={ directionMod('forward') }
                  onClick={ () => this.onRightClick() }
                  disabled={ !isInfiniteScrollEnabled && currentIndex === items.length - 1 }
                  mix={ { block, elem: 'Button', mods: directionMod('forward') } }
                />
            </>
        );
    }

    renderSlide(block, item, id, listItemWidth, arePlaceholdersShown, showGreyPlaceholder) {
        const { image, extraHtml } = item;

        return (
            <li
              block="Slider"
              elem="Slide"
              mix={ { block, elem: 'Slide' } }
              key={ this.getKey(id, item) }
              style={ listItemWidth }
            >
                <Figure
                  src={ image }
                  alt="SliderItem"
                  htmlContent={ extraHtml && extraHtml }
                  arePlaceholdersShown={ arePlaceholdersShown }
                  showGreyPlaceholder={ showGreyPlaceholder }
                />
            </li>
        );
    }

    render() {
        const { currentIndex, items, isMouseDown } = this.state;

        const {
            block,
            areThumbnailsShown,
            areArrowButtonsShown,
            areBreadcrumbsShown,
            isInfiniteScrollEnabled,
            arePlaceholdersShown,
            showGreyPlaceholder
        } = this.props;

        if (items.length === 1 && !Object.keys(items[0]).length) items[0] = { image: '' };

        const isBreadcrumbShown = id => (
            isInfiniteScrollEnabled
                ? (id !== 0 && id !== items.length - 1) && items.length > 1
                : true
        );

        const isBreadcrumbActive = (id, currentIndex) => (
            isInfiniteScrollEnabled
                ? (
                    id === currentIndex
                    || (id === 1 && currentIndex === items.length - 1)
                    || (id === items.length - 2 && currentIndex === 0)
                )
                : id === currentIndex
        );

        const listWidth = {
            width: `${items.length * 100}%`
        };

        const listItemWidth = {
            width: `${100 / items.length}%`
        };

        const mods = areThumbnailsShown ? {} : { no_thumbnails: true };

        return (
            <div
              block="Slider"
              mix={ { block, mods } }
              mods={ mods }
            >
                { areThumbnailsShown && this.renderThumbnails() }
                <div
                  block="Slider"
                  elem="SlideArea"
                  mix={ { block, elem: 'SlideArea' } }
                  onTouchStart={ event => this.handleDragStart(event, true) }
                  onTouchMove={ event => this.handleDragMove(event, true) }
                  onTouchEnd={ event => this.handleDragEnd(event, true) }
                  onMouseDown={ event => this.handleDragStart(event, false) }
                  onMouseMove={ event => this.handleDragMove(event, false) }
                  onMouseUp={ event => this.handleDragEnd(event, false) }
                  onMouseLeave={ event => this.handleMouseLeave(event) }
                  onKeyDown={ event => this.onKeyDown(event) }
                  role="toolbar"
                  ref={ this.touchArea }
                >
                    <div
                      block="Slider"
                      elem="Wrapper"
                      mods={ { touching: isMouseDown } }
                      mix={ { block, elem: 'Wrapper', mods: { touching: isMouseDown } } }
                    >
                        <ul
                          block="Slider"
                          elem="Carousel"
                          mix={ { block, elem: 'Carousel' } }
                          style={ listWidth }
                          ref={ this.carousel }
                        >
                            { items.map(
                                (item, id) => this.renderSlide(
                                    block,
                                    item,
                                    id,
                                    listItemWidth,
                                    arePlaceholdersShown,
                                    showGreyPlaceholder
                                )
                            ) }
                        </ul>
                    </div>
                    { areArrowButtonsShown && this.renderArrowButtons(items, currentIndex, block) }
                    <div
                      block="Slider"
                      elem="Breadcrumbs"
                      mix={ { block, elem: 'Breadcrumbs' } }
                    >
                        {
                            areBreadcrumbsShown
                            && items.map((item, id) => isBreadcrumbShown(id) && (
                                <button
                                  key={ this.getKey(id, item) }
                                  block="Slider"
                                  elem="Breadcrumb"
                                  mix={ { block, elem: 'Breadcrumb' } }
                                  mods={ { active: isBreadcrumbActive(id, currentIndex) } }
                                  onClick={ () => this.onThumbnailClick(id) }
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Slider.propTypes = {
    block: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    arePlaceholdersShown: PropTypes.bool,
    areArrowButtonsShown: PropTypes.bool,
    areThumbnailsShown: PropTypes.bool,
    areBreadcrumbsShown: PropTypes.bool,
    isKeyboardAllowed: PropTypes.bool,
    isDirectionForward: PropTypes.bool,
    isInfiniteScrollEnabled: PropTypes.bool,
    animationInterval: PropTypes.number,
    slideSpeed: PropTypes.number,
    showGreyPlaceholder: PropTypes.bool
};

Slider.defaultProps = {
    arePlaceholdersShown: true,
    areArrowButtonsShown: false,
    areThumbnailsShown: false,
    areBreadcrumbsShown: false,
    isKeyboardAllowed: false,
    isDirectionForward: true,
    isInfiniteScrollEnabled: true,
    animationInterval: 0,
    slideSpeed: 750,
    showGreyPlaceholder: false
};

export default Slider;
