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
import { CartDispatcher } from 'Store/Cart';
import ProductActions from './ProductActions.component';

const mapStateToProps = state => ({
    groupedProductQuantity: state.ProductReducer.groupedProductQuantity
});

const mapDispatchToProps = dispatch => ({
    addProduct: (options) => {
        return CartDispatcher.addProductToCart(dispatch, options);
    }
});

const ProductActionsContainer = connect(mapStateToProps, mapDispatchToProps)(ProductActions);

export default ProductActionsContainer;
