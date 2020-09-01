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

import './WishlistItem.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Field from 'Component/Field';
import ProductCard from 'Component/ProductCard';
import { FilterType, ProductType } from 'Type/ProductList';

export class WishlistItem extends PureComponent {
    static propTypes = {
        addToCart: PropTypes.func,
        changeQuantity: PropTypes.func,
        product: ProductType.isRequired,
        changeDescription: PropTypes.func,
        removeItem: PropTypes.func,
        parameters: FilterType,
        isLoading: PropTypes.bool
    };

    static defaultProps = {
        addToCart: () => {},
        changeQuantity: () => {},
        changeDescription: () => {},
        removeItem: () => {},
        parameters: {},
        isLoading: false
    };

    renderDescription() {
        const {
            product: { wishlist: { description } },
            changeDescription
        } = this.props;

        return (
            <Field
              id="description"
              name="description"
              type="text"
              value={ description }
              mix={ { block: 'MyAccountMyWishlist', elem: 'Description' } }
              placeholder={ __('Add description') }
              onChange={ changeDescription }
            />
        );
    }

    renderAddToCart() {
        const {
            product: { wishlist: { quantity } },
            addToCart,
            changeQuantity
        } = this.props;

        return (
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
                    { __('Add to cart') }
                </button>
            </div>
        );
    }

    renderRemove() {
        const { removeItem } = this.props;

        return (
            <button
              block="Button"
              mix={ { block: 'WishlistItem', elem: 'Remove' } }
              onClick={ removeItem }
            >
                { __('Remove from Wishlist') }
            </button>
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
            >
                <>
                    { this.renderDescription() }
                    { this.renderAddToCart() }
                    { this.renderRemove() }
                </>
            </ProductCard>
        );
    }
}

export default WishlistItem;
