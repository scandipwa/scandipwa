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
import { ProductType } from 'Type/ProductList';
import ProductCard from 'Component/ProductCard';
import WishlistItem from 'Component/WishlistItem';
import './MyAccountMyWishlist.style';

export default class MyAccountMyWishlist extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        removeAll: PropTypes.func.isRequired,
        addAllToCart: PropTypes.func.isRequired,
        isWishlistEmpty: PropTypes.bool.isRequired,
        wishlistItems: PropTypes.objectOf(ProductType).isRequired
    };

    renderNoProductsFound = () => (
        <p block="MyAccountMyWishlist" elem="NoProducts">
            { __('Please add products to wishlist first!') }
        </p>
    );

    renderProduct = ([id, product]) => <WishlistItem key={ id } product={ product } />;

    renderProducts() {
        const { wishlistItems } = this.props;
        return Object.entries(wishlistItems).map(this.renderProduct);
    }

    renderActionLine() {
        const {
            isLoading,
            removeAll,
            addAllToCart,
            isWishlistEmpty
        } = this.props;

        const disabled = isLoading || isWishlistEmpty;

        return (
            <div block="MyAccountMyWishlist" elem="ActionBar">
                <button
                  block="Button"
                  onClick={ removeAll }
                  disabled={ disabled }
                >
                    { __('Clear Wishlist') }
                </button>
                <button
                  block="Button"
                  onClick={ addAllToCart }
                  disabled={ disabled }
                >
                    { __('Add All to Cart') }
                </button>
            </div>
        );
    }

    renderPlaceholders() {
        return Array.from({ length: 3 }, (_, i) => <ProductCard key={ i } />);
    }

    renderContent() {
        const { isLoading, isWishlistEmpty } = this.props;

        if (isWishlistEmpty && !isLoading) return this.renderNoProductsFound();

        return (
            <div block="MyAccountMyWishlist" elem="Products">
                { (isLoading && isWishlistEmpty)
                    ? this.renderPlaceholders()
                    : this.renderProducts() }
            </div>
        );
    }

    render() {
        return (
            <div block="MyAccountMyWishlist">
                { this.renderActionLine() }
                { this.renderContent() }
            </div>
        );
    }
}
