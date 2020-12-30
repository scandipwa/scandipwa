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

import { BOTTOM_SHEET_HEIGHT } from './ProductBottomSheet.config';

import './ProductBottomSheet.style.scss';

export class ProductBottomSheet extends PureComponent {
    static propTypes = {
        children: PropTypes.any.isRequired,
        product: ProductType.isRequired
    };

    state = {
        open: false,
        overflowHeight: 250
    };

    titleRef = createRef();

    componentDidUpdate() {
        this.updateOverflowHeight();
    }

    updateOverflowHeight() {
        if (this.titleRef && this.titleRef.current) {
            const { current: titleEl } = this.titleRef;
            const rect = titleEl.getBoundingClientRect();

            this.setState({
                overflowHeight: BOTTOM_SHEET_HEIGHT + rect.height
            });
        }
    }

    onBottomSheet = (open) => {
        this.setState({ open });
    };

    toggleBottomSheet = () => {
        const { open } = this.state;
        this.onBottomSheet(!open);
    };

    render() {
        const { open, overflowHeight } = this.state;
        const { children, product } = this.props;

        const style = {
            zIndex: 99
        };
        const bodyStyle = {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            maxHeight: 'calc(100vh - 150px)'
        };

        return (
            <SwipeableBottomSheet
              overflowHeight={ overflowHeight }
              open={ open }
              onChange={ this.onBottomSheet }
              fullscreen
              style={ style }
              bodyStyle={ bodyStyle }
            >
            <span block="ProductBottomSheet" elem="PillWrapper">
                <span block="ProductBottomSheet" elem="Pill" />
            </span>
            <div ref={ this.titleRef } block="ProductBottomSheet" elem="ProductTitle">
                { product.name }
            </div>
            { children }
            <div block="ProductBottomSheet" elem="BottomPlaceholder" />
            </SwipeableBottomSheet>
        );
    }
}

export default ProductBottomSheet;
