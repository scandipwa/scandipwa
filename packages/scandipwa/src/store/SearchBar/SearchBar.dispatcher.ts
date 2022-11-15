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

import ProductListQuery from 'Query/ProductList.query';
import { ProductListOptions } from 'Query/ProductList.type';
import { NetworkError } from 'Type/Common.type';
import { fetchCancelableQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { clearSearchResults, updateLoadStatus, updateSearchBar } from './SearchBar.action';
import { SearchBarDispatcherData } from './SearchBar.type';

/**
 * Search Bar Dispatcher
 * @class SearchBarDispatcher
 * @extends QueryDispatcher
 * @namespace Store/SearchBar/Dispatcher
 */
export class SearchBarDispatcher extends SimpleDispatcher {
    clearSearchResults(): void {
        this.dispatch(clearSearchResults());
    }

    async getSearchProductList(
        options: Partial<ProductListOptions>,
    ) {
        const rawQueries = ProductListQuery.getQuery({
            ...options,
            notRequireInfo: true,
            noVariants: true,
        });

        try {
            const result = await fetchCancelableQuery<SearchBarDispatcherData>(rawQueries, 'SearchBar');

            this.dispatch(updateLoadStatus(false));
            this.dispatch(updateSearchBar(result));
        } catch (err) {
            if (!isAbortError(err as NetworkError)) {
                this.dispatch(updateLoadStatus(false));
            }
        }
    }
}

export default new SearchBarDispatcher();
