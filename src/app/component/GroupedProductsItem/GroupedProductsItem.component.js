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
class GroupedProductsItem extends Component {
    constructor() {
        super();

        this.state = {
            // eslint-disable-next-line react/no-unused-state
            isConfigurationInitilized: false
        };
    }

    componentWillMount() {
        const { updateGroupedProductQuantity, product } = this.props;

        updateGroupedProductQuantity({ product, quantity: 1 });
    }

    /**
     * Get quantity of grouped product
     * @param {Number} id Product id
     * @param {Object} groupedProductQuantity list of grouped products with quantities
     * @return {Number} product quantity
     */
    getCurrentQuantity(id, groupedProductQuantity) {
        return groupedProductQuantity[id] || 1;
    }

    changeCount(itemCount) {
        const { updateGroupedProductQuantity, product } = this.props;

        updateGroupedProductQuantity({ product, quantity: itemCount });
    }

    render() {
        const {
            product: {
                thumbnail: { path: thumb_url },
                name,
                price,
                id
            },
            groupedProductQuantity
        } = this.props;
        const itemCount = this.getCurrentQuantity(id, groupedProductQuantity);

        return (
            <li block="GroupedProductsItem" aria-label="Product Item">
                <Image src={ thumb_url && `/media/jpg/catalog/product${ thumb_url }` } alt="Product Thumbnail" />
                <div block="GroupedProductsItem" elem="Title">
                    <p><TextPlaceholder content={ name } /></p>
                    <ProductPrice price={ price } mods={ { type: 'regular' } } />
                </div>
                <div block="GroupedProductsItem" elem="Quantity">
                    <Field
                      type="number"
                      id="HeaderInput"
                      onChange={ itemCount => this.changeCount(itemCount) }
                      value={ itemCount }
                    />
                </div>
            </li>
        );
    }
}

GroupedProductsItem.propTypes = {
    product: ProductType.isRequired,
    updateGroupedProductQuantity: PropTypes.func.isRequired,
    groupedProductQuantity: PropTypes.objectOf(PropTypes.number).isRequired
};

export default GroupedProductsItem;
