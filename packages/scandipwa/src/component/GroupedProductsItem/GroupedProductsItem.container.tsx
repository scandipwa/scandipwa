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

import { ReactElement } from 'Type/Common.type';
import { getProductInStock } from 'Util/Product/Extract';
import { StockCheckProduct } from 'Util/Product/Product.type';

import GroupedProductsItem from './GroupedProductsItem.component';
import {
    GroupedProductsItemComponentContainerPropKeys,
    GroupedProductsItemComponentProps,
    GroupedProductsItemContainerFunctions,
    GroupedProductsItemContainerProps,
    GroupedProductsItemContainerState,
} from './GroupedProductsItem.type';

/** @namespace Component/GroupedProductsItem/Container */
export class GroupedProductsItemContainer<
P extends Readonly<GroupedProductsItemContainerProps> = Readonly<GroupedProductsItemContainerProps>,
S extends GroupedProductsItemContainerState = GroupedProductsItemContainerState,
> extends PureComponent<P, S> {
    containerFunctions: GroupedProductsItemContainerFunctions = {
        setQuantity: this.setQuantity.bind(this),
    };

    __construct(props: P): void {
        super.__construct?.(props);

        const { defaultQuantity } = this.props;

        this.setQuantity(defaultQuantity);
    }

    containerProps(): Pick<GroupedProductsItemComponentProps, GroupedProductsItemComponentContainerPropKeys> {
        const { product } = this.props;

        return {
            itemCount: this._getCurrentQuantity(),
            product,
        };
    }

    /**
     * Get the selected quantity of grouped product
     * @return {Number} product quantity
     */
    _getCurrentQuantity(): number {
        const {
            product: { id = 0 },
            quantity,
        } = this.props;

        return (quantity as Record<number, number>)[ id ] || 0;
    }

    setQuantity(itemCount: number): void {
        const { setQuantity, product, product: { id } } = this.props;

        if (getProductInStock(product as Partial<StockCheckProduct>)) {
            setQuantity({ [id]: itemCount });
        }
    }

    render(): ReactElement {
        return (
            <GroupedProductsItem
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default GroupedProductsItemContainer;
