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
import './MyAccountMyWishlist.style';

export default class MyAccountMyWishlist extends PureComponent {
    state = {
        showNoProductsFound: false
    };

    static propTypes = {
        isLoading: PropTypes.bool,
        addAllToCart: PropTypes.func,
        getParameters: PropTypes.func.isRequired,
        wishlistItems: PropTypes.objectOf(ProductType).isRequired
    };

    static defaultProps = {
        isLoading: false,
        addAllToCart: () => {}
    };

    renderNoProductsFound = () => (
        <div block="MyAccountMyWishlist" elem="NoProducts">
            <h3>Please add products to wishlist first!</h3>
        </div>
    );

    renderProduct = ([sku, product]) => {
        const { getParameters } = this.props;
        const { type_id } = product;

        const parameters = type_id !== 'configurable' ? {} : getParameters(sku, product);

        return <ProductCard product={ product } selectedFilters={ parameters } key={ sku } />;
    };

    renderProducts() {
        const { wishlistItems } = this.props;
        const entries = Object.entries(wishlistItems);

        if (entries.length <= 0) {
            return this.setState({ showNoProductsFound: true });
        }

        return entries.map(this.renderProduct);
    }

    renderActionLine() {
        const { showNoProductsFound } = this.state;
        const { addAllToCart, isLoading } = this.props;

        return (
            <div block="MyAccountMyWishlist" elem="ActionBar">
                <button block="Button" onClick={ addAllToCart } disabled={ isLoading || showNoProductsFound }>
                    { __('Add All to Cart') }
                </button>
            </div>
        );
    }

    renderPlaceholders() {
        return Array.from({ length: 4 }, (_, i) => <ProductCard key={ i } />);
    }

    renderContent() {
        const { isLoading } = this.props;
        const { showNoProductsFound } = this.state;

        if (!showNoProductsFound || isLoading) {
            return (
                <div block="MyAccountMyWishlist" elem="Products">
                    { isLoading ? this.renderPlaceholders() : this.renderProducts() }
                </div>
            );
        }

        return this.renderNoProductsFound();
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
