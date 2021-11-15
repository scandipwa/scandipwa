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

import AddToCart from 'Component/AddToCart';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import ProductCard from 'Component/ProductCard';
import SourceWishlistItem from 'Component/WishlistItem/WishlistItem.component';
import { getMaxQuantity, getMinQuantity, getProductInStock } from 'Util/Product/Extract';

import './SharedWishlistItem.style';

/** @namespace Component/SharedWishlistItem/Component */
export class SharedWishlistItem extends SourceWishlistItem {
    renderAddToCart() {
        const {
            product,
            product: {
                id
            },
            quantity,
            changeQuantity
        } = this.props;

        const min = getMinQuantity(product);
        const max = getMaxQuantity(product);
        const inStock = getProductInStock(product);

        return (
            <div
              block="WishlistItem"
              elem="Row"
              mix={ { block: 'SharedWishlistItem', elem: 'Row' } }
            >
                <Field
                  type={ FIELD_TYPE.number }
                  attr={ {
                      id: `item_qty_wishlist_${id}`,
                      name: `item_qty_wishlist_${id}`,
                      value: quantity,
                      defaultValue: quantity,
                      min,
                      max
                  } }
                  events={ {
                      onChange: changeQuantity
                  } }
                  validationRule={ {
                      range: {
                          min,
                          max
                      }
                  } }
                  validateOn={ ['onChange'] }
                  mix={ { block: 'WishlistItem', elem: 'Quantity' } }
                />
                <AddToCart
                  product={ product }
                  quantity={ quantity }
                  mix={ { block: 'WishlistItem', elem: 'AddToCart' } }
                  disabled={ !inStock }
                />
            </div>
        );
    }

    render() {
        const { product, parameters, isLoading } = this.props;

        return (
            <ProductCard
              product={ product }
              selectedFilters={ parameters }
              mix={ { block: 'WishlistItem' } }
              isLoading={ isLoading }
              hideWishlistButton
              hideCompareButton
            >
                { this.renderAddToCart() }
            </ProductCard>
        );
    }
}

export default SharedWishlistItem;
