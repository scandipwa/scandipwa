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

import { ProductType } from 'Type/ProductList';

import GroupedProductsItem from './GroupedProductsItem.component';

/** @namespace Component/GroupedProductsItem/Container */
export class GroupedProductsItemContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        groupedProductQuantity: PropTypes.objectOf(PropTypes.number).isRequired,
        setGroupedProductQuantity: PropTypes.func.isRequired,
        defaultQuantity: PropTypes.number.isRequired
    };

    containerFunctions = {
        changeCount: this.changeCount.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        const { defaultQuantity } = this.props;
        this.changeCount(defaultQuantity);
    }

    containerProps = () => ({
        itemCount: this._getCurrentQuantity()
    });

    /**
     * Get the selected quantity of grouped product
     * @return {Number} product quantity
     */
    _getCurrentQuantity() {
        const {
            product: { id },
            groupedProductQuantity
        } = this.props;

        return groupedProductQuantity[id] || 0;
    }

    changeCount(itemCount) {
        const { setGroupedProductQuantity, product: { id } } = this.props;
        setGroupedProductQuantity(id, itemCount);
    }

    render() {
        return (
            <GroupedProductsItem
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default GroupedProductsItemContainer;
