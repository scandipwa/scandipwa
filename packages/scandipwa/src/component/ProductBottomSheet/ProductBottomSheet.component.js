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

import { HistoryType } from 'Type/Common';
import { ProductType } from 'Type/ProductList';

import { BOTTOM_SHEET_BORDER_RADIUS, BOTTOM_SHEET_HEIGHT } from './ProductBottomSheet.config';

import './ProductBottomSheet.style.scss';

export class ProductBottomSheet extends PureComponent {
    static propTypes = {
        children: PropTypes.any.isRequired,
        product: ProductType.isRequired,
        history: HistoryType.isRequired
    };

    state = {
        open: false,
        overflowHeight: 200
    };

    titleRef = createRef();

    // componentDidMount() {
    //     window.addEventListener('popstate', this.onPopState);
    // }

    componentDidUpdate(prevProps) {
        const { history, history: { location: { pathname } } } = this.props;
        const { open } = this.state;
        const { history: prevHistory, history: { location: { pathname: prevPathname } } } = prevProps;

        // console.log({ prevPathname, pathname, open });

        if (prevPathname !== pathname && open) {
            this.setBottomSheetOpen(false);
        }

        // if (prevPathname !== pathname) {
        console.log({ history, prevHistory });
        // }

        this.updateOverflowHeight();
    }

    // componentWillUnmount() {
    //     window.removeEventListener('popstate', this.onPopState);
    // }

    // onPopState = () => {
    //     const { history } = this.props;
    //     console.log(history);
    // };

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

    setBottomSheetOpen = (open) => {
        this.setState({ open });
    };

    toggleBottomSheet = () => {
        const { open } = this.state;
        this.setBottomSheetOpen(!open);
    };

    closeBottomSheet = () => {
        const { open } = this.state;
        if (open) {
            this.setBottomSheetOpen(false);
        }
    };

    render() {
        const { open, overflowHeight } = this.state;
        const { children, product } = this.props;

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
        };

        return (
            <SwipeableBottomSheet
              overflowHeight={ overflowHeight }
              open={ open }
              onChange={ this.setBottomSheetOpen }
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
                    <div
                      aria-label="Close button"
                      block="ProductBottomSheet"
                      elem="CloseButton"
                      role="button"
                      onClick={ this.closeBottomSheet }
                      onKeyDown={ this.closeBottomSheet }
                      tabIndex="0"
                    />
                    { children }
                </div>
            </SwipeableBottomSheet>
        );
    }
}

export default ProductBottomSheet;
