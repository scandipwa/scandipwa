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

import GroupedProductsItem from 'Component/GroupedProductsItem';
import { ProductType } from 'Component/Product/Product.config';
import { GroupedProductItem } from 'Query/ProductList.type';
import { ReactElement } from 'Type/Common.type';

import { GroupedProductListComponentProps } from './GroupedProductList.type';

/**
 * Product description
 * @class GroupedProductList
 * @namespace Component/GroupedProductList/Component */
export class GroupedProductListComponent extends PureComponent<GroupedProductListComponentProps> {
    renderProductList(items: GroupedProductItem[]): ReactElement {
        const {
            quantity,
            setQuantity,
        } = this.props;

        const sortedItems = items.sort(({ position }, { position: cmpPosition }) => position - cmpPosition);

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

    render(): ReactElement {
        const {
            product: { items, type_id },
        } = this.props;

        if (type_id !== ProductType.GROUPED) {
            return null;
        }

        if (!items) {
            return null;
        }

        return this.renderProductList(items as GroupedProductItem[]);
    }
}

export default GroupedProductListComponent;
