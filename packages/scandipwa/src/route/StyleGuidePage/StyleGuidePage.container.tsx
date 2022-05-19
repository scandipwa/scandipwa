/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ProductItem } from 'Query/ProductList.type';
import CategoryReducer from 'Store/Category/Category.reducer';
import { updateProductDetails } from 'Store/Product/Product.action';
import ProductReducer from 'Store/Product/Product.reducer';
import { ReactElement } from 'Type/Common.type';
import { withReducers } from 'Util/DynamicReducer';
import { RootState } from 'Util/Store/Store.type';

import product from './product.json';
import StyleGuide from './StyleGuidePage.component';
import {
    StyleGuidePageComponentProps,
    StyleGuidePageContainerMapDispatchProps,
    StyleGuidePageContainerMapStateProps,
    StyleGuidePageContainerProps
} from './StyleGuidePage.type';

export const ProductDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Product/Product.dispatcher'
);

/** @namespace Route/StyleGuidePage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): StyleGuidePageContainerMapStateProps => ({
    product: state.ProductReducer.product
});

/** @namespace Route/StyleGuidePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): StyleGuidePageContainerMapDispatchProps => ({
    updateProductDetails: (product) => dispatch(updateProductDetails(product))
});

/** @namespace Route/StyleGuidePage/Container */
export class StyleGuidePageContainer extends PureComponent<StyleGuidePageContainerProps> {
    containerFunctions = {
        fakeFunction: this.fakeFunction.bind(this)
    };

    componentDidMount(): void {
        const { updateProductDetails } = this.props;

        updateProductDetails(product as unknown as ProductItem);
    }

    containerProps(): Pick<StyleGuidePageComponentProps, 'product'> {
        const { product } = this.props;

        return {
            product
        };
    }

    fakeFunction(): string {
        return 'fake';
    }

    render(): ReactElement {
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
