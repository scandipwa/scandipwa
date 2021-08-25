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

import Field from 'Component/Field';
import AddToCart from 'Component/Product/AddToCart';
import ProductCard from 'Component/ProductCard';
import SourceWishlistItem from 'Component/WishlistItem/WishlistItem.component';
import { IN_STOCK } from 'Config/Stock.config';

import './SharedWishlistItem.style';

/** @namespace Component/SharedWishlistItem/Component */
export class SharedWishlistItem extends SourceWishlistItem {
    renderAddToCart() {
        const {
            product,
            quantity,
            changeQuantity,
            product: {
                stock_status: stockStatus
            } = {}
        } = this.props;

        return (
            <div
              block="WishlistItem"
              elem="Row"
              mix={ { block: 'SharedWishlistItem', elem: 'Row' } }
            >
                <Field
                  id="item_qty"
                  name="item_qty"
                  type="number"
                  min={ 1 }
                  value={ quantity }
                  mix={ { block: 'WishlistItem', elem: 'Quantity' } }
                  onChange={ changeQuantity }
                />
                <AddToCart
                  product={ product }
                  quantity={ quantity }
                  mix={ { block: 'WishlistItem', elem: 'AddToCart' } }
                  disabled={ stockStatus !== IN_STOCK }
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
