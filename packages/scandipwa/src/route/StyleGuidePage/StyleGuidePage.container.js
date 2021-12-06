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

import CategoryReducer from 'Store/Category/Category.reducer';
import { updateProductDetails } from 'Store/Product/Product.action';
import ProductReducer from 'Store/Product/Product.reducer';
import { ProductType } from 'Type/ProductList.type';
import { withReducers } from 'Util/DynamicReducer';

import product from './product.json';
import StyleGuide from './StyleGuidePage.component';

export const ProductDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Product/Product.dispatcher'
);

/** @namespace Route/StyleGuidePage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    product: state.ProductReducer.product
});

/** @namespace Route/StyleGuidePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateProductDetails: (product) => dispatch(updateProductDetails(product))
});

/** @namespace Route/StyleGuidePage/Container */
export class StyleGuidePageContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        updateProductDetails: PropTypes.func.isRequired
    };

    containerFunctions = {
        fakeFunction: this.fakeFunction.bind(this)
    };

    componentDidMount() {
        const { updateProductDetails } = this.props;

        updateProductDetails(product);
    }

    containerProps() {
        const { product } = this.props;

        return {
            product
        };
    }

    fakeFunction() {
        return 'fake';
    }

    render() {
        return (
            <StyleGuide
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default withReducers({
    CategoryReducer,
    ProductReducer
})(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(StyleGuidePageContainer)
);
