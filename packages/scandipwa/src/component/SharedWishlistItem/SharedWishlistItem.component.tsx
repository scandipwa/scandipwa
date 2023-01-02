/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import AddToCart from 'Component/AddToCart';
import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import ProductCard from 'Component/ProductCard';
import SourceWishlistItem from 'Component/WishlistItem/WishlistItem.component';
import { ReactElement } from 'Type/Common.type';
import { getMaxQuantity, getMinQuantity, getProductInStock } from 'Util/Product/Extract';
import { StockCheckProduct } from 'Util/Product/Product.type';

import { SharedWishlistItemComponentProps, SharedWishlistItemComponentState } from './SharedWishlistItem.type';

import './SharedWishlistItem.style';

/** @namespace Component/SharedWishlistItem/Component */
export class SharedWishlistItemComponent<
P extends Readonly<SharedWishlistItemComponentProps> = Readonly<SharedWishlistItemComponentProps>,
S extends SharedWishlistItemComponentState = SharedWishlistItemComponentState,
> extends SourceWishlistItem<P, S> {
    renderAddToCart(): ReactElement {
        const {
            product,
            product: {
                id,
            },
            quantity,
            changeQuantity,
        } = this.props;

        const min = getMinQuantity(product);
        const max = getMaxQuantity(product);
        const inStock = getProductInStock(product as Partial<StockCheckProduct>);

        return (
            <div
              block="WishlistItem"
              elem="Row"
              mix={ { block: 'SharedWishlistItem', elem: 'Row' } }
            >
                <Field
                  type={ FieldType.NUMBER_WITH_CONTROLS }
                  attr={ {
                      id: `item_qty_wishlist_${id}`,
                      name: `item_qty_wishlist_${id}`,
                      value: quantity,
                      defaultValue: quantity,
                      min,
                      max,
                  } }
                  events={ {
                      onChange: changeQuantity,
                  } }
                  validationRule={ {
                      range: {
                          min,
                          max,
                      },
                  } }
                  validateOn={ ['onChange'] }
                  mix={ { block: 'WishlistItem', elem: 'Quantity' } }
                />
                <AddToCart
                  product={ product }
                  quantity={ quantity }
                  mix={ { block: 'WishlistItem', elem: 'AddToCart' } }
                  isDisabled={ !inStock }
                />
            </div>
        );
    }

    render(): ReactElement {
        const { product, isLoading } = this.props;

        return (
            <ProductCard
              product={ product }
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

export default SharedWishlistItemComponent;
