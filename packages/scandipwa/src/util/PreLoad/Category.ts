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

import { ProductListOptions } from 'Query/ProductList.type';
import { SortDirections } from 'Route/CategoryPage/CategoryPage.config';
import CategoryDispatcher from 'Store/Category/Category.dispatcher';
import ProductListDispatcher from 'Store/ProductList/ProductList.dispatcher';
import ProductListInfoDispatcher from 'Store/ProductListInfo/ProductListInfo.dispatcher';
import history from 'Util/History';
import getStore from 'Util/Store';
import { getQueryParam } from 'Util/Url';

/** @namespace Util/PreLoad/Category */
export class CategoryPreLoad {
    productListOptions: Partial<ProductListOptions> = {
        isNext: false,
        isPlp: true,
        noAttributes: false,
        noVariants: false,
        args: {
            sort: {
                sortDirection: SortDirections.ASC,
                sortKey: window.actionName?.catalog_default_sort_by || 'price',
            },
            filter: {
                priceRange: this.getSelectedPriceRangeFromUrl(),
                customFilters: this.getSelectedFiltersFromUrl(),
                categoryIds: window.actionName?.id,
            },
            search: '',
            pageSize: 24,
            currentPage: this.getPageFromUrl(),
        },
    };

    productListInfoOptions = {
        args: {
            filter: {
                priceRange: this.getSelectedPriceRangeFromUrl(),
                customFilters: this.getSelectedFiltersFromUrl(),
                categoryIds: window.actionName?.id,
            },
            search: '',
        },
    };

    getPageFromUrl() {
        const { location } = history;

        return +(getQueryParam('page', location) || 1);
    }

    getSelectedFiltersFromUrl() {
        const { location } = history;
        const selectedFiltersString = (getQueryParam('customFilters', location) || '').split(';');

        return selectedFiltersString.reduce((acc, filter) => {
            if (!filter) {
                return acc;
            }
            const [key, value] = filter.split(':');

            return { ...acc, [key]: value.split(',') };
        }, {});
    }

    getSelectedPriceRangeFromUrl() {
        const { location } = history;
        const min = +getQueryParam('priceMin', location);
        const max = +getQueryParam('priceMax', location);

        return { min, max };
    }

    dispatch = getStore().dispatch;

    preloadProducts() {
        ProductListDispatcher.handleData(this.dispatch, this.productListOptions);
        ProductListInfoDispatcher.handleData(this.dispatch, this.productListInfoOptions);
        CategoryDispatcher.handleData(this.dispatch, { isSearchPage: false, categoryIds: window.actionName?.id || 0 });
    }
}

export default new CategoryPreLoad();
