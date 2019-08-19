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
import { withRouter } from 'react-router';
import { ProductDispatcher } from 'Store/Product';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import ProductPage from './ProductPage.component';

const mapStateToProps = state => ({
    product: state.ProductReducer.product
});

const mapDispatchToProps = dispatch => ({
    requestProduct: (options) => {
        ProductDispatcher.handleData(dispatch, options);
    },
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.updateWithProduct(breadcrumbs, dispatch);
    },
    clearGroupedProductQuantity: () => {
        ProductDispatcher.clearGroupedProductQuantity(dispatch);
    }
});

const ProductPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProductPage);

export default withRouter(ProductPageContainer);
