import { connect } from 'react-redux';
import { RelatedProductsDispatcher } from 'Store/RelatedProducts';
import RelatedProducts from './RelatedProducts.component';

const mapStateToProps = state => ({
    relatedProducts: state.RelatedProductsReducer.relatedProducts
});

const mapDispatchToProps = dispatch => ({
    clearRelatedProducts: () => {
        RelatedProductsDispatcher.clearRelatedProducts(dispatch);
    }
});

const RelatedProductsContainer = connect(mapStateToProps, mapDispatchToProps)(RelatedProducts);

export default RelatedProductsContainer;
