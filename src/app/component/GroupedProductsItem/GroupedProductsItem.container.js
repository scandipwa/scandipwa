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
import { connect } from 'react-redux';
import { ProductDispatcher } from 'Store/Product';
import { ProductType } from 'Type/ProductList';
import GroupedProductsItem from './GroupedProductsItem.component';

export const mapStateToProps = state => ({
    groupedProductQuantity: state.ProductReducer.groupedProductQuantity
});

export const mapDispatchToProps = dispatch => ({
    updateGroupedProductQuantity: options => ProductDispatcher.updateGroupedProductQuantity(dispatch, options)
});

export class GroupedProductsItemContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        groupedProductQuantity: PropTypes.number.isRequired,
        updateGroupedProductQuantity: PropTypes.func
    };

    static defaultProps = {
        updateGroupedProductQuantity: () => {}
    };

    containerFunctions = {
        changeCount: this.changeCount.bind(this)
    };

    constructor(props) {
        super(props);

        const { updateGroupedProductQuantity, product } = this.props;
        updateGroupedProductQuantity({ product, quantity: 1 });
    }

    containerProps = () => ({
        itemCount: this._getCurrentQuantity()
    });

    /**
     * Get quantity of grouped product
     * @param {Number} id Product id
     * @param {Object} groupedProductQuantity list of grouped products with quantities
     * @return {Number} product quantity
     */
    _getCurrentQuantity() {
        const {
            product: { id },
            groupedProductQuantity
        } = this.props;

        return groupedProductQuantity[id] || 1;
    }

    changeCount(itemCount) {
        const { updateGroupedProductQuantity, product } = this.props;

        updateGroupedProductQuantity({ product, quantity: itemCount });
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupedProductsItemContainer);
