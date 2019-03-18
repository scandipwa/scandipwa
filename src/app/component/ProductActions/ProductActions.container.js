/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { connect } from 'react-redux';
import { CartDispatcher } from 'Store/Cart';
import ProductActions from './ProductActions.component';

const mapDispatchToProps = dispatch => ({
    addProduct: (options) => {
        CartDispatcher.addProductToCart(dispatch, options);
    }
});

const ProductActionsContainer = connect(null, mapDispatchToProps)(ProductActions);

export default ProductActionsContainer;
