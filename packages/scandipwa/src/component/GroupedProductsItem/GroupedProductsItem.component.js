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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Image from 'Component/Image';
import ProductPrice from 'Component/ProductPrice';
import FieldContainer from 'Component/PureForm/Field';
import TextPlaceholder from 'Component/TextPlaceholder';
import TierPrices from 'Component/TierPrices';
import { FIELD_TYPE } from 'Config/Field.config';
import { ProductType } from 'Type/ProductList';
import {
    getMaxQuantity, getMinQuantity, getPrice, getProductInStock, getThumbnailImage
} from 'Util/Product/Extract';
import { VALIDATION_INPUT_TYPE_NUMBER } from 'Util/Validator/Config';

import './GroupedProductsItem.style';

/**
 * Grouped Product Item
 * @class GroupedProduct
 * @namespace Component/GroupedProductsItem/Component
 */
export class GroupedProductsItem extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        setQuantity: PropTypes.func.isRequired,
        itemCount: PropTypes.number.isRequired
    };

    renderTitle() {
        const {
            product: {
                name,
                price_range: priceRange,
                type_id: type,
                dynamic_price: dynamicPrice
            },
            product
        } = this.props;

        return (
            <div block="GroupedProductsItem" elem="Title">
                <p>
                    <TextPlaceholder content={ name } />
                </p>
                <ProductPrice
                  price={ getPrice(priceRange, dynamicPrice, {}, type) }
                  mods={ { type: 'regular' } }
                />
                <TierPrices product={ product } />
            </div>
        );
    }

    getError = (value) => {
        const {
            product = {}
        } = this.props;

        if (!!+value && !getProductInStock(product)) {
            return __('Product is out of stock');
        }

        return true;
    };

    renderQuantity() {
        const {
            product = {},
            product: { id } = {},
            setQuantity,
            itemCount = 0
        } = this.props;

        const min = getMinQuantity(product);
        const max = getMaxQuantity(product);

        return (
            <FieldContainer
              type={ FIELD_TYPE.number }
              attr={ {
                  id: `item_qty_${id}`,
                  name: `item_qty_${id}`,
                  defaultValue: itemCount,
                  value: itemCount,
                  min: 0
              } }
              validationRule={ {
                  inputType: VALIDATION_INPUT_TYPE_NUMBER.numeric,
                  isRequired: true,
                  match: this.getError,
                  range: {
                      min: min === 1 ? 0 : 1,
                      max
                  }
              } }
              events={ { onChange: setQuantity } }
              validateOn={ ['onChange', 'onload'] }
            />
        );
    }

    renderImage() {
        const { product } = this.props;
        const imageUrl = getThumbnailImage(product);

        return (
            <Image
              mix={ { block: 'GroupedProductsItem', elem: 'Image' } }
              src={ imageUrl }
              alt="Product Thumbnail"
            />
        );
    }

    render() {
        return (
            <li block="GroupedProductsItem" aria-label="Product Item">
                { this.renderImage() }
                { this.renderTitle() }
                { this.renderQuantity() }
            </li>
        );
    }
}

export default GroupedProductsItem;
