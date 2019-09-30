/* eslint-disable max-len */
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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextPlaceholder from 'Component/TextPlaceholder';
import { ProductType } from 'Type/ProductList';
import './ProductWishlistButton.style';

export default class ProductWishlistButton extends PureComponent {
    static propTypes = {
        product: ProductType,
        quantity: PropTypes.number,
        isDisabled: PropTypes.bool,
        isInWishlist: PropTypes.bool,
        addToWishlist: PropTypes.func,
        removeFromWishlist: PropTypes.func
    };

    static defaultProps = {
        product: {},
        quantity: 1,
        isDisabled: false,
        isInWishlist: false,
        addToWishlist: () => {},
        removeFromWishlist: () => {}
    };

    onClick = () => {
        const {
            product,
            quantity,
            isInWishlist,
            addToWishlist,
            removeFromWishlist
        } = this.props;

        if (!isInWishlist) return addToWishlist(product, quantity);

        return removeFromWishlist(product, quantity);
    };

    renderAddToWishlist() {
        const { isDisabled } = this.props;

        return (
            <span
              block="ProductWishlistButton"
              elem="AddToWishlist"
              mods={ { isDisabled } }
            >
                { __('Add to Wishlist') }
            </span>
        );
    }

    renderRemoveFromWishlist() {
        const { isDisabled } = this.props;

        return (
            <span
              block="ProductWishlistButton"
              elem="RemoveFromWishlist"
              mods={ { isDisabled } }
            >
                { __('Remove from Wishlist') }
            </span>
        );
    }

    renderPlaceholder() {
        return <TextPlaceholder length="short" />;
    }

    renderButton() {
        const { isInWishlist } = this.props;

        return (
            <button
              onClick={ this.onClick }
              title={ !isInWishlist ? __('Add to Wishlist') : __('Remove from Wishlist') }
            >
               { !isInWishlist ? this.renderAddToWishlist() : this.renderRemoveFromWishlist() }
            </button>
        );
    }

    render() {
        const { product: { id } = {} } = this.props;

        return (
            id !== -1
                ? this.renderButton()
                : this.renderPlaceholder()
        );
    }
}
