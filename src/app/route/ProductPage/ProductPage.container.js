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
import { ProductDispatcher } from 'Store/Product';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import ProductPage from './ProductPage.component';

const mapStateToProps = state => ({
    product: state.ProductReducer.product,
    filters: state.ProductReducer.filters
});

const mapDispatchToProps = dispatch => ({
    requestProduct: (options) => {
        ProductDispatcher.handleData(dispatch, options);
    },
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.updateWithProduct(breadcrumbs, dispatch);
    }
});

const ProductPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProductPage);

export default ProductPageContainer;
