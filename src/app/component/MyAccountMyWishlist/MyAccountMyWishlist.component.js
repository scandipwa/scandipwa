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
import { PureComponent } from 'react';

import Loader from 'Component/Loader';
import ProductCard from 'Component/ProductCard';
import ShareWishlistPopup from 'Component/ShareWishlistPopup';
import WishlistItem from 'Component/WishlistItem';
import { ProductType } from 'Type/ProductList';

import './MyAccountMyWishlist.style';

/** @namespace Component/MyAccountMyWishlist/Component */
export class MyAccountMyWishlist extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        isWishlistLoading: PropTypes.bool.isRequired,
        removeAll: PropTypes.func.isRequired,
        addAllToCart: PropTypes.func.isRequired,
        shareWishlist: PropTypes.func.isRequired,
        isWishlistEmpty: PropTypes.bool.isRequired,
        wishlistItems: PropTypes.objectOf(ProductType).isRequired
    };

    renderNoProductsFound = () => (
        <div>
            <p>{ __('Wishlist is empty!') }</p>
        </div>
    );

    renderProduct = ([id, product]) => (
        <WishlistItem
          key={ id }
          product={ product }
        />
    );

    renderProducts() {
        const {
            isWishlistLoading,
            isWishlistEmpty,
            wishlistItems
        } = this.props;

        if (isWishlistLoading && isWishlistEmpty) {
            return this.renderPlaceholders();
        }

        return Object.entries(wishlistItems).map(this.renderProduct);
    }

    renderClearWishlist() {
        const {
            isWishlistLoading,
            removeAll,
            isWishlistEmpty
        } = this.props;

        const disabled = isWishlistLoading || isWishlistEmpty;

        return (
            <button
              block="Button"
              onClick={ removeAll }
              disabled={ disabled }
            >
                { __('Clear Wishlist') }
            </button>
        );
    }

    renderAddAllToCart() {
        const {
            isWishlistLoading,
            addAllToCart,
            isWishlistEmpty
        } = this.props;

        const disabled = isWishlistLoading || isWishlistEmpty;

        return (
            <button
              block="Button"
              mix={ { block: 'MyAccountMyWishlist', elem: 'Button' } }
              onClick={ addAllToCart }
              disabled={ disabled }
            >
              { __('Add All to Cart') }
            </button>
        );
    }

    renderShareWishlistButton() {
        const {
            isWishlistLoading,
            shareWishlist,
            isWishlistEmpty
        } = this.props;

        const disabled = isWishlistLoading || isWishlistEmpty;

        return (
            <button
              block="Button"
              onClick={ shareWishlist }
              disabled={ disabled }
            >
                { __('Share Wishlist') }
            </button>
        );
    }

    renderActionLine() {
        return (
            <div block="MyAccountMyWishlist" elem="ActionBar">
                { this.renderShareWishlistButton() }
                { this.renderClearWishlist() }
                { this.renderAddAllToCart() }
            </div>
        );
    }

    renderPlaceholders() {
        return Array.from({ length: 2 }, (_, i) => <ProductCard key={ i } />);
    }

    renderShareWishlist() {
        return <ShareWishlistPopup />;
    }

    renderContent() {
        const {
            isWishlistLoading,
            isWishlistEmpty,
            isLoading
        } = this.props;

        if (isWishlistEmpty && !isWishlistLoading) {
            return this.renderNoProductsFound();
        }

        return (
            <div block="MyAccountMyWishlist" elem="Products">
                <Loader isLoading={ isLoading } />
                { this.renderProducts() }
            </div>
        );
    }

    render() {
        return (
            <div block="MyAccountMyWishlist">
                { this.renderShareWishlist() }
                { this.renderActionLine() }
                { this.renderContent() }
            </div>
        );
    }
}

export default MyAccountMyWishlist;
