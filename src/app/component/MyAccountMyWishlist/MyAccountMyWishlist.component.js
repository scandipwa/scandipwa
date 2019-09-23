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

    renderProduct = ([sku, product]) => {
        const { getParameters } = this.props;
        const { type_id } = product;

        const parameters = type_id !== 'configurable' ? {} : getParameters(sku, product);

        return <ProductCard product={ product } selectedFilters={ parameters } key={ sku } />;
    };

    renderProducts() {
        const { wishlistItems } = this.props;

        return Object.entries(wishlistItems).map(this.renderProduct);
    }

    renderActionLine() {
        const { addAllToCart } = this.props;

        return (
            <div block="MyAccountMyWishlist" elem="ActionBar">
                <button block="Button" onClick={ addAllToCart }>
                    { __('Add All to Cart') }
                </button>
            </div>
        );
    }

    renderPlaceholders() {
        return Array.from({ length: 4 }, (_, i) => <ProductCard key={ i } />);
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyAccountMyWishlist">
                { this.renderActionLine() }
                <div block="MyAccountMyWishlist" elem="Products">
                    { isLoading ? this.renderPlaceholders() : this.renderProducts() }
                </div>
            </div>
        );
    }
}
