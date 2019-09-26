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
import Field from 'Component/Field';
import ProductCard from 'Component/ProductCard';
import { ProductType } from 'Type/ProductList';

import './WishlistItem.style';

export default class WishlistItem extends PureComponent {
    static propTypes = {
        sku: PropTypes.string.isRequired,
        product: ProductType.isRequired,
        getParameters: PropTypes.func.isRequired,
        addToCart: PropTypes.func,
        changeQuantity: PropTypes.func,
        changeDescription: PropTypes.func,
        removeFromWishlist: PropTypes.func,
        showErrorNotification: PropTypes.func,
        showSuccessNotification: PropTypes.func
    };

    static defaultProps = {
        addToCart: () => {},
        changeQuantity: () => {},
        changeDescription: () => {},
        removeFromWishlist: () => {},
        showSuccessNotification: () => {},
        showErrorNotification: () => {}
    };

    addToCart = () => {
        const {
            sku,
            product,
            addToCart,
            showErrorNotification,
            showSuccessNotification
        } = this.props;

        addToCart(sku, product)
            .then(() => showSuccessNotification('Product added to cart'))
            .catch(() => showErrorNotification());
    };

    removeFromWishlist = () => {
        const {
            sku,
            product: { item_id },
            removeFromWishlist,
            showErrorNotification,
            showSuccessNotification
        } = this.props;

        removeFromWishlist(item_id, sku)
            .then(() => showSuccessNotification('Product removed from wishlist'))
            .catch(() => showErrorNotification());
    };

    changeQuantity = (quantity) => {
        const { product: { item_id }, sku } = this.props;
        console.log(quantity, item_id, sku);
    };

    changeDescription = (description) => {
        const { product: { item_id }, sku } = this.props;
        console.log(description, item_id, sku);
    };

    render() {
        const {
            sku,
            product,
            product: {
                type_id,
                quantity,
                item_description
            },
            getParameters
        } = this.props;

        const parameters = type_id !== 'configurable' ? {} : getParameters(sku, product);

        return (
            <ProductCard
              product={ product }
              selectedFilters={ parameters }
              mix={ { block: 'WishlistItem' } }
            >
                <>
                    <Field
                      id="description"
                      name="description"
                      type="text"
                      value={ item_description }
                      mix={ { block: 'MyAccountMyWishlist', elem: 'Description' } }
                      placeholder={ __('Add description') }
                      onChange={ this.changeDescription }
                    />
                    <Field
                      id="item_qty"
                      name="item_qty"
                      type="number"
                      min={ 1 }
                      value={ quantity }
                      onChange={ this.changeQuantity }
                    />
                    <button block="Button" onClick={ this.addToCart }>Add to Cart</button>
                    <button block="Button" onClick={ this.removeFromWishlist }>Remove from Wishlist</button>
                </>
            </ProductCard>
        );
    }
}
