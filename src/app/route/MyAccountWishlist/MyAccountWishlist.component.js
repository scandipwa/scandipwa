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
import ProductCard from 'Component/ProductCard';
import MyAccountSidebar from 'Component/MyAccountSidebar';
import { isSignedIn } from 'Util/Auth';
import Loader from 'Component/Loader';
import './MyAccountWishlist.style';


class MyAccountWishlist extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
    }

    componentDidMount() {
        const { requestWishlistData } = this.props;
        requestWishlistData();
        this.updateBreadcrumbs();
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/wishlist',
                name: 'My Wish List'
            },
            {
                url: '/my-account',
                name: 'My Account'
            },
            {
                url: '/',
                name: 'Home'
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    afterAdded(response) {
        const { showNotification } = this.props;
        const { errors, addedProducts } = response;
        errors.map(error => showNotification('error', error));
        this.setState({ isLoading: false });
        if (addedProducts.length > 0) {
            showNotification('success',
                `${addedProducts.length} product(s) have been added to shopping cart: ${addedProducts.toString()}`);
        }
    }

    addToCart() {
        const {
            showNotification,
            wishlistItems,
            addProduct,
            removeProductFromWishlist
        } = this.props;
        this.setState({ isLoading: true });


        if (!isSignedIn()) {
            showNotification('error', 'You must login or register to add all products to Cart.');
            this.setState({ isLoading: false });
            return null;
        }

        const data = [];
        data.errors = [];
        data.addedProducts = [];
        return Promise.all(Object.values(wishlistItems).map((product) => {
            const { type_id, configurableVariantIndex, name } = product;
            if (type_id === 'configurable' && !configurableVariantIndex) {
                data.errors.push(`You need to choose options for your item for ${name}`);
                return null;
            }

            return addProduct({
                product,
                quantity: 1
            }).then(() => data.addedProducts.push(name) && removeProductFromWishlist({ product, noMessages: true }));
        })).then(() => this.afterAdded(data));
    }

    renderWishlistItem(product, isUpdatingWishlist) {
        if (isUpdatingWishlist) {
            return (
                <ProductCard product={ {} } key={ product.id } />
            );
        }

        return (
            <ProductCard
              product={ product }
              key={ product.id }
              wishlistItem
            />
        );
    }

    render() {
        const {
            wishlistItems,
            isUpdatingWishlist
        } = this.props;

        const { isLoading } = this.state;

        if (!isSignedIn()) {
            return <Redirect to="/" />;
        }

        return (
            <main block="MyAccountWishlist" aria-label="My Account Wishlist">
                <div block="MyAccountWishlist" elem="Wrapper">
                    <MyAccountSidebar />
                    <div block="MyAccountWishlist" elem="Content">
                        <h2>My Wish List</h2>
                        <Loader isLoading={ isLoading } />
                        {
                            Object.keys(wishlistItems).length > 0
                                ? (
                                    <>
                                        <button
                                          onClick={ () => this.addToCart() }
                                          block="MyAccountWishlist"
                                          elem="Button"
                                          mods={ { isLoading } }
                                          disabled={ isLoading }
                                        >
                                            Add All To Cart
                                        </button>
                                        <ul block="MyAccountWishlist" elem="List">
                                            {
                                                Object.values(wishlistItems).map(
                                                    product => this.renderWishlistItem(product, isUpdatingWishlist)
                                                )
                                            }
                                        </ul>
                                    </>
                                ) : (
                                    <p>You have no items in your wish list.</p>
                                )
                        }
                    </div>
                </div>
            </main>
        );
    }
}

MyAccountWishlist.propTypes = {
    wishlistItems: PropTypes.objectOf(ProductType).isRequired,
    isUpdatingWishlist: PropTypes.bool.isRequired,
    requestWishlistData: PropTypes.func.isRequired,
    removeProductFromWishlist: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired
};

export default MyAccountWishlist;
