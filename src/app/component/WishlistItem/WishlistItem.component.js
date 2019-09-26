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
            product,
            addToCart,
            showErrorNotification,
            showSuccessNotification
        } = this.props;

        addToCart(product)
            .then(() => showSuccessNotification('Product added to cart'))
            .catch(() => showErrorNotification());
    };

    removeFromWishlist = () => {
        const {
            product: { wishlist: { id } },
            removeFromWishlist,
            showErrorNotification,
            showSuccessNotification
        } = this.props;

        removeFromWishlist(id)
            .then(() => showSuccessNotification('Product removed from wishlist'))
            .catch(() => showErrorNotification());
    };

    changeQuantity = (quantity) => {
        const { product: { wishlist: { id } }, changeQuantity } = this.props;
        changeQuantity(id, quantity);
    };

    changeDescription = (description) => {
        const { product: { wishlsit: { id } }, changeDescription } = this.props;
        changeDescription(id, description);
    };

    render() {
        const {
            product,
            product: {
                type_id,
                wishlist: {
                    sku,
                    quantity,
                    description
                }
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
                      value={ description }
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
