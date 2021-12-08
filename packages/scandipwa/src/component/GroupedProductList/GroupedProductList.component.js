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

import GroupedProductsItem from 'Component/GroupedProductsItem';
import PRODUCT_TYPE from 'Component/Product/Product.config';
import { ProductType } from 'Type/ProductList.type';

/**
 * Product description
 * @class GroupedProductList
 * @namespace Component/GroupedProductList/Component */
export class GroupedProductList extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        quantity: PropTypes.objectOf(PropTypes.number).isRequired,
        setQuantity: PropTypes.func.isRequired
    };

    renderProductList(items) {
        const {
            quantity,
            setQuantity
        } = this.props;

        const sortedItems = items.sort(({ position }, { position: cmpPosition }) => position > cmpPosition);

        return (
            <ul>
                { sortedItems.map(({ product, product: { id } = {}, qty }) => (
                    <GroupedProductsItem
                      key={ id }
                      product={ product }
                      defaultQuantity={ qty }
                      quantity={ quantity }
                      setQuantity={ setQuantity }
                    />
                )) }
            </ul>
        );
    }

    render() {
        const {
            product: { items, type_id }
        } = this.props;

        if (type_id !== PRODUCT_TYPE.grouped) {
            return null;
        }

        if (!items) {
            return null;
        }

        return this.renderProductList(items);
    }
}

export default GroupedProductList;
