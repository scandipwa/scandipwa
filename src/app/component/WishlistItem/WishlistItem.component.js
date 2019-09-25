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
        getParameters: PropTypes.func.isRequired
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
                      onChange={ console.log }
                    />
                    <Field
                      id="item_qty"
                      name="item_qty"
                      type="number"
                      min={ 1 }
                      value={ quantity }
                      onChange={ console.log }
                    />
                    <button block="Button">Add to Cart</button>
                    <button block="Button">Remove from Wishlist</button>
                </>
            </ProductCard>
        );
    }
}
