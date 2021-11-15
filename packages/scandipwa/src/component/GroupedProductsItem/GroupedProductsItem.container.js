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

import { ProductType } from 'Type/ProductList.type';

import GroupedProductsItem from './GroupedProductsItem.component';

/** @namespace Component/GroupedProductsItem/Container */
export class GroupedProductsItemContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        quantity: PropTypes.objectOf(PropTypes.number).isRequired,
        setQuantity: PropTypes.func.isRequired,
        defaultQuantity: PropTypes.number.isRequired
    };

    containerFunctions = {
        setQuantity: this.setQuantity.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        const { defaultQuantity } = this.props;
        this.setQuantity(defaultQuantity);
    }

    containerProps() {
        const { product } = this.props;

        return {
            itemCount: this._getCurrentQuantity(),
            product
        };
    }

    /**
     * Get the selected quantity of grouped product
     * @return {Number} product quantity
     */
    _getCurrentQuantity() {
        const {
            product: { id },
            quantity
        } = this.props;

        return quantity[id] || 0;
    }

    setQuantity(itemCount) {
        const { setQuantity, product: { id } } = this.props;
        setQuantity({ [id]: itemCount }, true);
    }

    render() {
        return (
            <GroupedProductsItem
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default GroupedProductsItemContainer;
