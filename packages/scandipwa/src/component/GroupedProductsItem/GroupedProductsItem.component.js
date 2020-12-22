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

import Field from 'Component/Field';
import Image from 'Component/Image';
import ProductPrice from 'Component/ProductPrice';
import TextPlaceholder from 'Component/TextPlaceholder';
import { ProductType } from 'Type/ProductList';
import media, { PRODUCT_MEDIA } from 'Util/Media';

import './GroupedProductsItem.style';

/**
 * Grouped Product Item
 * @class GroupedProduct
 * @namespace Component/GroupedProductsItem/Component
 */
export class GroupedProductsItem extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        changeCount: PropTypes.func.isRequired,
        itemCount: PropTypes.number.isRequired
    };

    renderTitle() {
        const {
            product: {
                name,
                price_range
            }
        } = this.props;

        return (
            <div block="GroupedProductsItem" elem="Title">
                <p>
                    <TextPlaceholder content={ name } />
                </p>
                <ProductPrice price={ price_range } mods={ { type: 'regular' } } />
            </div>
        );
    }

    renderQuantity() {
        const {
            changeCount,
            itemCount
        } = this.props;

        return (
            <div block="GroupedProductsItem" elem="Quantity">
                <Field
                  type="number"
                  id="HeaderInput"
                  name="HeaderInput"
                  onChange={ changeCount }
                  value={ itemCount }
                  min={ 0 }
                />
            </div>
        );
    }

    renderImage() {
        const {
            product: {
                thumbnail: {
                    path: thumb_url
                }
            }
        } = this.props;

        return (
            <Image
              mix={ { block: 'GroupedProductsItem', elem: 'Image' } }
              src={ thumb_url && media(thumb_url, PRODUCT_MEDIA) }
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
