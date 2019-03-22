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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from 'Component/Image';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductPrice from 'Component/ProductPrice';
import Field from 'Component/Field';
import { ProductType } from 'Type/ProductList';
import PropTypes from 'prop-types';
import './GroupedProductsItem.style';

/**
 * Product description
 * @class GroupedProduct
 */
class GroupedProductsItem extends Component {
    constructor() {
        super();

        this.state = {
            itemCount: 1,
            // eslint-disable-next-line react/no-unused-state
            isConfigurationInitilized: false
        };
    }

    renderItemTitle(url_key, name, manufacturer) {
        return (
            <div block="CartItem" elem="Title">
                <Link
                  onClick={ () => this.handleItemClick() }
                    // TODO: replace from configuration file
                  to={ this.getProductLinkTo(url_key) }
                >
                    {manufacturer && <span>{manufacturer}</span>}
                    <p><TextPlaceholder content={ name } /></p>
                </Link>
            </div>
        );
    }

    renderItemDetails(price) {
        const { itemCount } = this.state;
        return (
            <div
              block="CartItem"
              elem="Details"
            >
                <Field
                  type="number"
                  id="HeaderInput"
                  onChange={ itemCount => this.setState({ itemCount }) }
                  value={ itemCount }
                />
                <div block="CartItem" elem="Price">
                    <ProductPrice price={ price } mods={ { type: 'regular' } } />
                </div>
            </div>
        );
    }

    render() {
        const {
            product: {
                thumbnail,
                url_key,
                name,
                quantity,
                price,
                brand,
                id
            }
        } = this.props;
        const { itemCount } = this.state;

        return (
            <li block="GroupedProductsItem" aria-label="Cart Item" key={ id }>
                <div
                  block="GroupedProductsItem"
                  elem="Thumbnail"
                  aria-label="Cart Thumbnail"
                >
                    <Image src={ `/media/catalog/product${thumbnail}` } alt="Cart Thumbnail" />
                </div>
                <div block="GroupedProductsItem" elem="Title">
                    <TextPlaceholder content={ name } />
                    <ProductPrice price={ price } mods={ { type: 'regular' } } />
                </div>
                <div block="GroupedProductsItem" elem="Quantity">
                    <Field
                      type="number"
                      id="HeaderInput"
                      onChange={ itemCount => this.setState({ itemCount }) }
                      value={ itemCount }
                    />
                </div>
            </li>
        );
    }
}

GroupedProductsItem.propTypes = {
    product: ProductType.isRequired
};

export default GroupedProductsItem;
