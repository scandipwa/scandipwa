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

import { connect } from 'react-redux';

import ProductList from 'Component/ProductList';
import ProductListQuery from 'Query/ProductList.query';
import { ProductListOptions } from 'Query/ProductList.type';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { getIndexedProducts } from 'Util/Product';
import DataContainer from 'Util/Request/DataContainer';

import {
    ProductListWidgetAdaptProps,
    ProductListWidgetComponentContainerPropKeys,
    ProductListWidgetContainerFunctions,
    ProductListWidgetContainerMapDispatchProps,
    ProductListWidgetContainerMapStateProps,
    ProductListWidgetContainerProps,
    ProductListWidgetContainerState,
    ProductListWidgetQueryResult
} from './ProductListWidget.type';

import './ProductListWidget.style';

/** @namespace Component/ProductListWidget/Container/mapStateToProps */
export const mapStateToProps = (): ProductListWidgetContainerMapStateProps => ({});

/** @namespace Component/ProductListWidget/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductListWidgetContainerMapDispatchProps => ({
    updateNoMatch,
    showNotification
});

/** @namespace Component/ProductListWidget/Container */
export class ProductListWidgetContainer extends DataContainer<
ProductListWidgetContainerProps,
ProductListWidgetContainerState
> {
    static defaultProps: Partial<ProductListWidgetContainerProps> = {
        showPager: false,
        productsCount: 10,
        productsPerPage: 5,
        conditionsEncoded: undefined
    };

    state: ProductListWidgetContainerState = {
        pages: {},
        totalItems: 0,
        totalPages: 0,
        isLoading: true
    };

    containerFunctions: ProductListWidgetContainerFunctions = {
        requestProductList: this.requestProductList.bind(this),
        updateLoadStatus: this.updateLoadStatus.bind(this),
        getIsNewCategory: this.getIsNewCategory.bind(this)
    };

    __construct(props: ProductListWidgetContainerProps): void {
        super.__construct(props, 'ProductListWidgetContainer', false);

        this.onError = this.onError.bind(this);
        this.appendPage = this.appendPage.bind(this);
        this.updateProductListItems = this.updateProductListItems.bind(this);
    }

    containerProps(): ProductListWidgetComponentContainerPropKeys {
        const {
            selectedFilters,
            title
        } = this.props;

        const {
            pages,
            totalItems,
            totalPages,
            isLoading
        } = this.state;

        return {
            selectedFilters,
            title,
            pages,
            totalItems,
            totalPages,
            isLoading,
            isInfiniteLoaderEnabled: false,
            numberOfPlaceholders: 6,
            mix: { block: 'ProductListWidget' },
            isWidget: true,
            ...this.adaptProps()
        };
    }

    dataModelName = 'ProductListWidget';

    onError(error: NetworkError | NetworkError[]): void {
        const { showNotification, updateNoMatch } = this.props;
<<<<<<< HEAD:packages/scandipwa/src/component/ProductListWidget/ProductListWidget.container.tsx
        showNotification(NotificationType.ERROR, __('Error fetching Product List!'), error);
=======

        showNotification('error', __('Error fetching Product List!'), error);
>>>>>>> scandipwa/master:packages/scandipwa/src/component/ProductListWidget/ProductListWidget.container.js
        updateNoMatch(true);
    }

    getIsNewCategory(): boolean {
        return true;
    }

    appendPage(data: ProductListWidgetQueryResult): void {
        const { showPager } = this.props;
        const { pages } = this.state;
        const {
            products: {
                items,
                page_info: {
                    current_page = 0
                } = {}
            } = {}
        } = data;

        if (!showPager) {
            return;
        }

        this.setState({
            pages: {
                ...pages,
                [current_page]: getIndexedProducts(items || [])
            }
        });
    }

    updateProductListItems(data: ProductListWidgetQueryResult): void {
        const { productsCount, productsPerPage } = this.props;
        const {
            products: {
                items,
                total_count: totalItems = 0,
                page_info: {
                    current_page = 0
                } = {}
            } = {}
        } = data;

        const totalPages = Math.ceil(productsCount / productsPerPage);

        this.setState({
            isLoading: false,
            totalItems,
            totalPages,
            pages: { [current_page]: getIndexedProducts(items || []) }
        });
    }

    updateLoadStatus(isLoading: boolean): void {
        this.setState({ isLoading });
    }

    requestProductList(options: Partial<ProductListOptions>): void {
        const { isNext } = options;

        if (!isNext) {
            this.updateLoadStatus(true);
        }

        this.fetchData<ProductListWidgetQueryResult>(
            [ProductListQuery.getQuery(options)],
            isNext ? this.appendPage : this.updateProductListItems,
            this.onError
        );
    }

    adaptProps(): ProductListWidgetAdaptProps {
        const {
            showPager,
            productsCount,
            productsPerPage,
            conditionsEncoded: conditions
        } = this.props;

        return {
            filter: { conditions },
            pageSize: showPager ? productsPerPage : productsCount,
            isPaginationEnabled: showPager
        };
    }

    render(): ReactElement {
        return (
            <ProductList
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListWidgetContainer);
