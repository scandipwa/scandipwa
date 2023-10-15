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

import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import ProductListQuery from 'Query/ProductList.query';
import { ProductListOptions, ProductsQueryOutput } from 'Query/ProductList.type';
import { QueryDispatcher } from 'Util/Request/QueryDispatcher';

import { clearSearchResults, updateLoadStatus, updateSearchBar } from './SearchBar.action';
import { SearchBarDispatcherData } from './SearchBar.type';

/**
 * Search Bar Dispatcher
 * @class SearchBarDispatcher
 * @extends QueryDispatcher
 * @namespace Store/SearchBar/Dispatcher
 */
export class SearchBarDispatcher extends QueryDispatcher<
Partial<ProductListOptions>,
SearchBarDispatcherData
> {
    __construct(): void {
        super.__construct('SearchBar');
    }

    onSuccess(data: SearchBarDispatcherData, dispatch: Dispatch): void {
        dispatch(updateLoadStatus(false));
        dispatch(updateSearchBar(data));
    }

    onError(_: unknown, dispatch: Dispatch): void {
        dispatch(updateLoadStatus(false));
    }

    clearSearchResults(dispatch: Dispatch): void {
        dispatch(clearSearchResults());
    }

    prepareRequest(options: Partial<ProductListOptions>, dispatch: Dispatch): Query<'products', ProductsQueryOutput> {
        dispatch(updateLoadStatus(true));

        return ProductListQuery.getQuery({
            ...options,
            notRequireInfo: true,
            noVariants: true,
        });
    }
}

export default new SearchBarDispatcher();
