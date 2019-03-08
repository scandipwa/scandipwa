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
