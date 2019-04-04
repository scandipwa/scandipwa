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

import { connect } from 'react-redux';
import { ProductDispatcher } from 'Store/Product';
import GroupedProductsItem from './GroupedProductsItem.component';

const mapStateToProps = state => ({
    groupedProductQuantity: state.ProductReducer.groupedProductQuantity
});

const mapDispatchToProps = dispatch => ({
    updateGroupedProductQuantity: (options) => {
        ProductDispatcher.updateGroupedProductQuantity(dispatch, options);
    }
});

const GroupedProductsItemContainer = connect(mapStateToProps, mapDispatchToProps)(GroupedProductsItem);

export default GroupedProductsItemContainer;
