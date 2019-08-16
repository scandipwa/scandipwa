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
        this.updateBreadcrumbs();
    }

    getWishlistItemsCount() {
        const { wishlistItems } = this.props;

        return Object.keys(wishlistItems).length;
    }

    afterAdded(response) {
        const { showNotification } = this.props;
        const { errors, addedProducts } = response;

        this.setState({ isLoading: false });

        errors.map(error => showNotification('error', error));

        if (addedProducts.length > 0) {
            showNotification(
                'success',
                __(
                    '%s product(s) have been added to shopping cart: %s',
                    addedProducts.length,
                    addedProducts.toString()
                )
            );
        }
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/wishlist',
                name: __('My Wish List')
            },
            {
                url: '/my-account',
                name: __('My Account')
            },
            {
                url: '/',
                name: __('Home')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
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
            showNotification('error', __('You must login or register to add all products to Cart.'));
            this.setState({ isLoading: false });

            return null;
        }

        const data = [];
        data.errors = [];
        data.addedProducts = [];

        return Promise.all(Object.values(wishlistItems).map((product) => {
            const { type_id, configurableVariantIndex, name } = product;

            if (type_id === 'configurable' && !configurableVariantIndex) {
                data.errors.push(__('You need to choose options for your item for %s', name));
                return null;
            }

            return addProduct({
                product,
                quantity: 1
            }).then(() => {
                data.addedProducts.push(name);
                removeProductFromWishlist({ product, noMessages: true });
            });
        })).then(() => this.afterAdded(data));
    }

    renderWishlistItem(product) {
        return (
            <ProductCard
              product={ product }
              key={ product.id }
              wishlistItem
            />
        );
    }

    render() {
        const { wishlistItems } = this.props;

        const { isLoading } = this.state;

        if (!isSignedIn()) {
            return <Redirect to="/" />;
        }

        return (
            <main block="MyAccountWishlist" aria-label={ __('My Account Wishlist') }>
                <div block="MyAccountWishlist" elem="Wrapper">
                    <MyAccountSidebar />
                    <div block="MyAccountWishlist" elem="Content">
                        <h2>{ __('My Wish List') }</h2>
                        <Loader isLoading={ isLoading } />
                        {
                            this.getWishlistItemsCount() > 0
                                ? (
                                    <>
                                        <button
                                          onClick={ () => this.addToCart() }
                                          block="MyAccountWishlist"
                                          elem="Button"
                                          mods={ { isLoading } }
                                          disabled={ isLoading }
                                        >
                                            { __('Add everything to cart') }
                                        </button>
                                        <ul block="MyAccountWishlist" elem="List">
                                            { Object.values(wishlistItems).map(
                                                product => this.renderWishlistItem(product)
                                            )}
                                        </ul>
                                    </>
                                ) : (
                                    <p>{ __('You have no items in your wish list.') }</p>
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
    removeProductFromWishlist: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired
};

export default MyAccountWishlist;
