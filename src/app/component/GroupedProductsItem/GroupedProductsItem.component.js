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
import Image from 'Component/Image';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductPrice from 'Component/ProductPrice';
import Field from 'Component/Field';
import { ProductType } from 'Type/ProductList';
import PropTypes from 'prop-types';
import './GroupedProductsItem.style';

/**
 * Grouped Product Item
 * @class GroupedProduct
 */
export default class GroupedProductsItem extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        changeCount: PropTypes.func.isRequired,
        itemCount: PropTypes.number.isRequired
    };

    render() {
        const {
            product: {
                thumbnail: { path: thumb_url },
                name,
                price
            },
            changeCount,
            itemCount
        } = this.props;

        return (
            <li block="GroupedProductsItem" aria-label="Product Item">
                <Image
                  mix={ { block: 'GroupedProductsItem', elem: 'Image' } }
                  src={ thumb_url && `/media/catalog/product${ thumb_url }` }
                  alt="Product Thumbnail"
                />
                <div block="GroupedProductsItem" elem="Title">
                    <p><TextPlaceholder content={ name } /></p>
                    <ProductPrice price={ price } mods={ { type: 'regular' } } />
                </div>
                <div block="GroupedProductsItem" elem="Quantity">
                    <Field
                      type="number"
                      id="HeaderInput"
                      name="HeaderInput"
                      onChange={ changeCount }
                      value={ itemCount }
                    />
                </div>
            </li>
        );
    }
}
