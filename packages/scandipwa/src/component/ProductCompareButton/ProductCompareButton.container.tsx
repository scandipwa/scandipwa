/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { MouseEvent, PureComponent } from 'react';
import { connect } from 'react-redux';

import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import ProductCompareButton from './ProductCompareButton.component';
import {
    ProductCompareButtonComponentContainerPropKeys,
    ProductCompareButtonComponentProps,
    ProductCompareButtonContainerFunctions,
    ProductCompareButtonContainerMapDispatchProps,
    ProductCompareButtonContainerMapStateProps,
    ProductCompareButtonContainerProps,
    ProductCompareButtonContainerState,
} from './ProductCompareButton.type';

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);

/** @namespace Component/ProductCompareButton/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductCompareButtonContainerMapStateProps => ({
    comparedProducts: state.ProductCompareReducer.productIds,
});

/** @namespace Component/ProductCompareButton/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductCompareButtonContainerMapDispatchProps => ({
    addProductToCompare: (productId) => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCompare(productId),
    ),
    removeComparedProduct: (productId) => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeComparedProduct(productId),
    ),
});

/** @namespace Component/ProductCompareButton/Container */
export class ProductCompareButtonContainer extends PureComponent<
ProductCompareButtonContainerProps,
ProductCompareButtonContainerState
> {
    static defaultProps: Partial<ProductCompareButtonContainerProps> = {
        productId: null,
        mix: {},
    };

    state: ProductCompareButtonContainerState = {
        isLoading: false,
    };

    containerFunctions: ProductCompareButtonContainerFunctions = {
        handleClick: this.handleClick.bind(this),
    };

    containerProps(): Pick<ProductCompareButtonComponentProps, ProductCompareButtonComponentContainerPropKeys> {
        const { mix } = this.props;
        const { isLoading } = this.state;

        return {
            mix,
            isLoading,
            isActive: this.isActive(),
        };
    }

    isActive(): boolean {
        const { comparedProducts, productId } = this.props;

        return !!productId && comparedProducts.indexOf(productId) !== -1;
    }

    async handleClick(e: MouseEvent): Promise<void> {
        const {
            productId,
            addProductToCompare,
            removeComparedProduct,
        } = this.props;

        const { isLoading } = this.state;

        if (isLoading) {
            return;
        }

        e.preventDefault();

        this.setState({ isLoading: true });

        if (this.isActive()) {
            await removeComparedProduct(String(productId));
        } else {
            await addProductToCompare(String(productId));
        }

        this.setState({ isLoading: false });
    }

    render(): ReactElement {
        return (
            <ProductCompareButton
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareButtonContainer);
