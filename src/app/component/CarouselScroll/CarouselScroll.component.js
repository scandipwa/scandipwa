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
import { createRef, PureComponent } from 'react';

import { ChildrenType } from 'Type/Common';
import CSS from 'Util/CSS';

import './CarouselScroll.style';

/** @namespace Component/CarouselScroll/Component */
export class CarouselScroll extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
        showArrow: PropTypes.bool,
        showedItemCount: PropTypes.number,
        showedActiveItemNr: PropTypes.number,
        onChange: PropTypes.func,
        activeItemId: PropTypes.number
    };

    static defaultProps = {
        showArrow: true,
        showedItemCount: 1,
        showedActiveItemNr: 2,
        onChange: () => {},
        activeItemId: null
    };

    state = {
        activeItemId: 0
    };

    itemRef = createRef();

    carouselRef = createRef();

    componentDidMount() {
        const { showedItemCount } = this.props;

        const heightSize = 100;
        const height = `${ heightSize / showedItemCount }%`;

        CSS.setVariable(this.carouselRef, 'carousel-item-height', height);
    }

    componentDidUpdate(prevProps) {
        const { children: { length: prevChildrenLength } } = prevProps;
        const { activeItemId, children: { length: childrenLength } } = this.props;
        const { activeItemId: prevaAtiveItemId } = this.state;

        if (prevChildrenLength !== childrenLength) {
            this.handleReset();

            return;
        }

        if (activeItemId !== null && activeItemId !== prevaAtiveItemId) {
            this.handleChange(activeItemId);
        }
    }

    getNextTranslate(nextId) {
        const { showedItemCount, showedActiveItemNr, children: { length: childrenLength } } = this.props;
        const { offsetHeight } = this.itemRef.current;

        // When selected item isnt reached wanted position
        if (nextId < (showedActiveItemNr - 1) || childrenLength <= showedItemCount) {
            return 0;
        }

        const isEndReached = (showedItemCount - showedActiveItemNr) + nextId + 1 > childrenLength;

        const possition = isEndReached
            ? childrenLength - showedItemCount
            : nextId - (showedActiveItemNr - 1);

        return `${ -possition * offsetHeight }px`;
    }

    setTranslate(nextId) {
        const { children: { length: childrenLength }, showedItemCount } = this.props;

        if (childrenLength <= showedItemCount) {
            return;
        }

        const translate = this.getNextTranslate(nextId);
        CSS.setVariable(this.carouselRef, 'translateY', translate);
    }

    handleArrowClick = (isNextArrow) => {
        const { children } = this.props;
        const { activeItemId: prevActiveItemId } = this.state;

        const activeItemId = prevActiveItemId + (isNextArrow ? 1 : -1);

        if (children.length - 1 < activeItemId || activeItemId < 0) {
            return;
        }

        this.handleChange(activeItemId);
    };

    handleChange(nextId) {
        const { onChange } = this.props;

        this.setTranslate(nextId);
        this.setState({ activeItemId: nextId });
        onChange(nextId);
    }

    handleReset() {
        const { onChange } = this.props;

        const activeItemId = 0;

        CSS.setVariable(this.carouselRef, 'translateY', 0);

        onChange(activeItemId);
        this.setState({ activeItemId });
    }

    renderArrow(isNextArrow = false) {
        const { showArrow, children: { length: childrenLength }, showedItemCount } = this.props;
        const { activeItemId } = this.state;

        if (!showArrow || childrenLength <= showedItemCount) {
            return null;
        }

        const isDisabled = isNextArrow
            ? activeItemId === childrenLength - 1
            : !activeItemId;
        const mods = { isNextArrow, isDisabled };

        return (
            <button
              block="CarouselScroll"
              elem="Arrow"
              mods={ mods }
              // eslint-disable-next-line react/jsx-no-bind
              onClick={ () => this.handleArrowClick(isNextArrow) }
              aria-label="Arrow"
            />
        );
    }

    renderContentItem = (child, key) => {
        const { activeItemId } = this.state;

        return (
            <button
              block="CarouselScroll"
              elem="Item"
              mods={ { isActive: key === activeItemId } }
              ref={ this.itemRef }
              // eslint-disable-next-line react/jsx-no-bind
              onClick={ () => this.handleChange(key) }
            >
                { child }
            </button>
        );
    };

    renderContent() {
        const { children } = this.props;

        return (
            <div block="CarouselScroll" elem="ContentWrapper">
                <div block="CarouselScroll" elem="Content">
                    { children.map(this.renderContentItem) }
                </div>
            </div>
        );
    }

    render() {
        return (
            <div block="CarouselScroll" ref={ this.carouselRef }>
                { this.renderArrow() }
                { this.renderContent() }
                { this.renderArrow(true) }
            </div>
        );
    }
}

export default CarouselScroll;
