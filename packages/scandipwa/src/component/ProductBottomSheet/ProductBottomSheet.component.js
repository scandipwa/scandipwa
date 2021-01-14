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
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { ProductType } from 'Type/ProductList';

import { BOTTOM_SHEET_BORDER_RADIUS, BOTTOM_SHEET_HEIGHT } from './ProductBottomSheet.config';

import './ProductBottomSheet.style.scss';

export class ProductBottomSheet extends PureComponent {
    static propTypes = {
        children: PropTypes.any.isRequired,
        product: ProductType.isRequired,
        isBottomSheetOpen: PropTypes.bool.isRequired,
        setBottomSheetOpen: PropTypes.func.isRequired
    };

    state = {
        overflowHeight: 200
    };

    titleRef = createRef();

    componentDidUpdate() {
        const { isBottomSheetOpen } = this.props;
        console.log(isBottomSheetOpen);
        this.updateOverflowHeight();
    }

    updateOverflowHeight() {
        const { overflowHeight } = this.state;
        if (this.titleRef && this.titleRef.current) {
            const { current: titleEl } = this.titleRef;
            const rect = titleEl.getBoundingClientRect();

            const newOverflowHeight = BOTTOM_SHEET_HEIGHT + rect.height;

            if (overflowHeight !== newOverflowHeight) {
                this.setState({
                    overflowHeight: newOverflowHeight
                });
            }
        }
    }

    closeBottomSheet = () => {
        const { isBottomSheetOpen, setBottomSheetOpen } = this.props;
        if (isBottomSheetOpen) {
            setBottomSheetOpen(false);
        }
    };

    render() {
        const { overflowHeight } = this.state;
        const {
            children, product, isBottomSheetOpen, setBottomSheetOpen
        } = this.props;

        const style = {
            zIndex: 99
        };
        const bodyStyle = {
            transition: 'border-top-left-radius,border-top-right-radius 0.5s ease-in-out',
            borderTopLeftRadius: open ? 0 : BOTTOM_SHEET_BORDER_RADIUS,
            borderTopRightRadius: open ? 0 : BOTTOM_SHEET_BORDER_RADIUS,
            // eslint-disable-next-line no-magic-numbers
            marginBottom: 77,
            maxHeight: 'calc(var(--vh, 1vh) * 100 - 77px)'
            // maxHeight: 'calc(var(--vh, 1vh) * 100 - 127px)'
        };

        return (
            <SwipeableBottomSheet
              overflowHeight={ overflowHeight }
              open={ isBottomSheetOpen }
              onChange={ setBottomSheetOpen }
              fullscreen
              style={ style }
              bodyStyle={ bodyStyle }
            >
                <div block="ProductBottomSheet" elem="Wrapper">
                    <span block="ProductBottomSheet" elem="PillWrapper">
                        <span block="ProductBottomSheet" elem="Pill" />
                    </span>
                    <div ref={ this.titleRef } block="ProductBottomSheet" elem="Title">
                        { product.name }
                    </div>
                    { /* <div
                      aria-label="Close button"
                      block="ProductBottomSheet"
                      elem="CloseButton"
                      role="button"
                      onClick={ this.closeBottomSheet }
                      onKeyDown={ this.closeBottomSheet }
                      tabIndex="0"
                    /> */ }
                    { children }
                </div>
            </SwipeableBottomSheet>
        );
    }
}

export default ProductBottomSheet;
