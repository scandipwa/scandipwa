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
import { Redirect } from 'react-router';
import { ProductType } from 'Type/ProductList';
import { isSignedIn } from 'Util/Auth';
import TextPlaceholder from 'Component/TextPlaceholder';
import './ProductWishlistButton.style';

/**
 * Button for adding product to Cart
 * @class ProductWishlistButton
 */
class ProductWishlistButton extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false, redirectToWishlist: false };
        this.timeOut = null;
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

    /**
     * Switch button text to indicated that product has been added
     * @return {Promise}
     */
    setAnimationTimeout() {
        return setTimeout(() => {
            this.timeOut = null;
            this.setState(({ transition }) => ({ transition: !transition }));
        }, 1500);
    }

    getProductInWishlist() {
        const { product, wishlistItems } = this.props;
        const { id } = product;

        if (!wishlistItems[id]) return false;

        return wishlistItems[id];
    }

    /**
     * Button click listener
     * @return {void}
     */
    buttonClick(isProductInWishlist) {
        const {
            product,
            addProductToWishlist,
            removeProductFromWishlist,
            showNotification,
            wishlistItems
        } = this.props;

        this.setState({ isLoading: true });

        if (!isSignedIn()) {
            showNotification('error', __('You must login or register to add items to your wishlist.'));
            this.setState({ isLoading: false });
            return null;
        }

        if (isProductInWishlist) {
            const { id } = product;

            return removeProductFromWishlist({
                product: wishlistItems[id]
            }).then(() => this.setState({ isLoading: false }));
        }

        return addProductToWishlist({ product }).then(
            () => this.setState({ isLoading: false, redirectToWishlist: true })
        );
    }

    renderButtonText(isProductInWishlist) {
        if (isProductInWishlist) {
            return (
                <>
                    <span>{ __('Remove from wishlist') }</span>
                    <span>{ __('Removing...') }</span>
                </>
            );
        }

        return (
            <>
                <span>{ __('Add to wishlist') }</span>
                <span>{ __('Adding...') }</span>
            </>
        );
    }

    render() {
        const { isLoading, redirectToWishlist } = this.state;
        const { fullWidth, isReady } = this.props;
        const wishlistItem = this.getProductInWishlist();
        const isProductInWishlist = !!wishlistItem;
        const isDisabled = isProductInWishlist && !wishlistItem.item_id;


        if (!isReady) return (<TextPlaceholder length="medium" />);

        if (redirectToWishlist) {
            return <Redirect to="/wishlist" />;
        }

        return (
            <button
              onClick={ () => this.buttonClick(isProductInWishlist) }
              block="ProductWishlistButton"
              elem="Button"
              mods={ { isLoading, fullWidth } }
              disabled={ isDisabled || isLoading }
            >
                { this.renderButtonText(isProductInWishlist) }
            </button>
        );
    }
}

ProductWishlistButton.propTypes = {
    product: ProductType.isRequired,
    addProductToWishlist: PropTypes.func.isRequired,
    removeProductFromWishlist: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    wishlistItems: PropTypes.objectOf(ProductType).isRequired,
    fullWidth: PropTypes.bool,
    isReady: PropTypes.bool
};

ProductWishlistButton.defaultProps = {
    fullWidth: false,
    isReady: true
};

export default ProductWishlistButton;
