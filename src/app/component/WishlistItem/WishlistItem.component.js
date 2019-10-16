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
        addToCart: PropTypes.func,
        changeQuantity: PropTypes.func,
        product: ProductType.isRequired,
        changeDescription: PropTypes.func,
        removeFromWishlist: PropTypes.func,
        getParameters: PropTypes.func.isRequired
    };

    static defaultProps = {
        addToCart: () => {},
        changeQuantity: () => {},
        changeDescription: () => {},
        removeFromWishlist: () => {}
    };

    render() {
        const {
            product,
            product: {
                type_id,
                wishlist: {
                    sku, quantity, description
                }
            },
            addToCart,
            removeItem,
            getParameters,
            changeQuantity,
            changeDescription
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
                      onChange={ changeDescription }
                    />
                    <div block="WishlistItem" elem="Row">
                        <Field
                          id="item_qty"
                          name="item_qty"
                          type="number"
                          min={ 1 }
                          value={ quantity }
                          mix={ { block: 'WishlistItem', elem: 'Quantity' } }
                          onChange={ changeQuantity }
                        />
                        <button
                          block="Button"
                          mix={ { block: 'WishlistItem', elem: 'AddToCart' } }
                          onClick={ addToCart }
                        >
                            { __('Add to Cart') }
                        </button>
                    </div>
                    <button
                      block="Button"
                      mix={ { block: 'WishlistItem', elem: 'Remove' } }
                      onClick={ removeItem }
                    >
                        { __('Remove from Wishlist') }
                    </button>
                </>
            </ProductCard>
        );
    }
}
