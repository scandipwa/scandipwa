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

import { PureComponent } from 'react';

import FieldContainer from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import Image from 'Component/Image';
import { ProductType } from 'Component/Product/Product.config';
import ProductPrice from 'Component/ProductPrice';
import TextPlaceholder from 'Component/TextPlaceholder';
import TierPrices from 'Component/TierPrices';
import { ReactElement } from 'Type/Common.type';
import {
    getMaxQuantity, getMinQuantity, getPrice, getProductInStock, getThumbnailImage,
} from 'Util/Product/Extract';
import { IndexedProduct } from 'Util/Product/Product.type';
import { ValidationInputTypeNumber } from 'Util/Validator/Config';

import { GroupedProductsItemComponentProps } from './GroupedProductsItem.type';

import './GroupedProductsItem.style';

/**
 * Grouped Product Item
 * @class GroupedProduct
 * @namespace Component/GroupedProductsItem/Component
 */
export class GroupedProductsItemComponent<
P extends Readonly<GroupedProductsItemComponentProps> = Readonly<GroupedProductsItemComponentProps>,
S extends GroupedProductsItemComponentState = GroupedProductsItemComponentState,
> extends PureComponent<P, S> {
    renderTitle(): ReactElement {
        const {
            product: {
                name,
                price_range: priceRange = {},
                type_id: type = '',
                dynamic_price: dynamicPrice,
            },
        } = this.props;

        return (
            <div block="GroupedProductsItem" elem="Title">
                <p>
                    <TextPlaceholder content={ name } />
                </p>
                <ProductPrice
                  price={ getPrice(priceRange, dynamicPrice, {}, type as ProductType) }
                  mods={ { type: 'regular' } }
                />
            </div>
        );
    }

    renderTierPrices(): ReactElement {
        const { product } = this.props;

        return <TierPrices product={ product as unknown as Partial<IndexedProduct> } />;
    }

    getError(value: string): true | string {
        const {
            product = {},
        } = this.props;

        const valueNum = +value;

        if (!!+value && !getProductInStock(product)) {
            return __('Product is out of stock');
        }

        const min = getMinQuantity(product);

        if (valueNum !== 0 && valueNum < min) {
            return __('Minimal value is %s!', min);
        }

        return true;
    }

    renderQuantity(): ReactElement {
        const {
            product = {},
            product: { id } = {},
            setQuantity,
            itemCount = 0,
        } = this.props;

        if (!getProductInStock(product)) {
            return (
                <div block="GroupedProductsItem" elem="OutOfStock">
                    { __('Out of stock') }
                </div>
            );
        }

        const max = getMaxQuantity(product);

        return (
            <FieldContainer
              type={ FieldType.NUMBER_WITH_CONTROLS }
              attr={ {
                  id: `item_qty_${id}`,
                  name: `item_qty_${id}`,
                  defaultValue: itemCount,
                  value: itemCount,
                  min: 0,
                  max,
              } }
              value={ itemCount }
              validationRule={ {
                  inputType: ValidationInputTypeNumber.NUMERIC,
                  isRequired: true,
                  match: this.getError.bind(this),
                  range: {
                      max,
                  },
              } }
              events={ { onChange: setQuantity } }
              validateOn={ ['onChange', 'onLoad'] }
            />
        );
    }

    renderImage(): ReactElement {
        const { product } = this.props;
        const imageUrl = getThumbnailImage(product);

        return (
            <Image
              mix={ { block: 'GroupedProductsItem', elem: 'Image' } }
              src={ imageUrl }
              isPlaceholder={ !imageUrl }
              alt="Product Thumbnail"
            />
        );
    }

    render(): ReactElement {
        return (
            <li block="GroupedProductsItem" aria-label="Product Item">
                { this.renderImage() }
                { this.renderTitle() }
                { this.renderQuantity() }
                { this.renderTierPrices() }
            </li>
        );
    }
}

export default GroupedProductsItemComponent;
