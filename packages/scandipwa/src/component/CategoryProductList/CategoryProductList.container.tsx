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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ProductList from 'Component/ProductList';
import { ProductListContainerProps } from 'Component/ProductList/ProductList.type';
import { ProductListOptions } from 'Query/ProductList.type';
import { CategoryPageLayout } from 'Route/CategoryPage/CategoryPage.config';
import { updateLoadStatus } from 'Store/ProductList/ProductList.action';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import {
    CategoryProductListContainerMapDispatchProps,
    CategoryProductListContainerMapStateProps,
    CategoryProductListContainerPropKeys,
    CategoryProductListContainerProps,
} from './CategoryProductList.type';

import './CategoryProductList.style';

export const ProductListDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductList/ProductList.dispatcher'
);

/** @namespace Component/CategoryProductList/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CategoryProductListContainerMapStateProps => ({
    pages: state.ProductListReducer.pages,
    isOffline: state.OfflineReducer.isOffline,
    isLoading: state.ProductListReducer.isLoading,
    isPageLoading: state.ProductListReducer.isPageLoading,
    totalItems: state.ProductListReducer.totalItems,
    totalPages: state.ProductListReducer.totalPages,
});

/** @namespace Component/CategoryProductList/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CategoryProductListContainerMapDispatchProps => ({
    requestProductList: (options) => ProductListDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch, options),
    ),
    updateLoadStatus: (isLoading) => dispatch(updateLoadStatus(isLoading)),
});

/** @namespace Component/CategoryProductList/Container */
export class CategoryProductListContainer extends PureComponent<CategoryProductListContainerProps> {
    static defaultProps: Partial<CategoryProductListContainerProps> = {
        isMatchingListFilter: false,
        isMatchingInfoFilter: false,
        isCurrentCategoryLoaded: false,
        filter: {},
        layout: CategoryPageLayout.GRID,
        totalPages: 1,
        search: '',
        sort: undefined,
        selectedFilters: {},
        isPageLoading: false,
        isPlp: true,
    };

    containerFunctions = {
        requestProductList: this.requestProductList.bind(this),
    };

    getIsLoading(): boolean {
        const {
            filter,
            isLoading,
            isMatchingListFilter,
        } = this.props;

        /**
         * In case the wrong category was passed down to the product list,
         * show the loading animation, it will soon change to proper category.
         */
        if (filter.categoryIds === -1) {
            return true;
        }

        if (!navigator.onLine) {
            return false;
        }

        // if the filter expected matches the last requested filter
        if (isMatchingListFilter) {
            return false;
        }

        return isLoading;
    }

    getIsPreventRequest(): boolean {
        const { isMatchingListFilter, isMatchingInfoFilter } = this.props;

        return isMatchingListFilter && isMatchingInfoFilter; // if filter match - prevent request
    }

    getLayout(): CategoryPageLayout {
        const { layout } = this.props;

        return layout;
    }

    requestProductList(options: Partial<ProductListOptions>): void {
        const { requestProductList } = this.props;

        requestProductList({ ...options, isPlp: true });
    }

    containerProps(): Pick<ProductListContainerProps, CategoryProductListContainerPropKeys> {
        const {
            filter,
            isPageLoading,
            pages,
            search,
            selectedFilters,
            sort,
            totalItems,
            totalPages,
            isPlp,
        } = this.props;

        return {
            filter,
            isPageLoading,
            pages,
            search,
            selectedFilters,
            sort,
            totalItems,
            totalPages,
            isLoading: this.getIsLoading(),
            isPreventRequest: this.getIsPreventRequest(),
            isPlp,
            mix: { block: 'CategoryProductList', mods: { layout: this.getLayout() } },
        };
    }

    render(): ReactElement {
        return (
            <ProductList
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductListContainer);
