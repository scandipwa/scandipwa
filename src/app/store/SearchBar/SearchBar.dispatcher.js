import { RequestDispatcher } from 'Util/Request';
import { ProductListQuery } from 'Query';
import { updateSearchBar, updateLoadStatus, clearSearchResults } from './SearchBar.action';
/**
 * Search Bar Dispatcher
 * @class SearchBarDispatcher
 * @extends RequestDispatcher
 */
class SearchBarDispatcher extends RequestDispatcher {
    constructor() {
        super('SearchBar', 86400);
    }

    onSuccess(data, dispatch) {
        dispatch(updateLoadStatus(false));
        dispatch(updateSearchBar(data));
    }

    onError(error, dispatch) {
        dispatch(updateLoadStatus(false));
    }

    clearSearchResults(dispatch) {
        dispatch(clearSearchResults());
    }

    /**
     * Prepare ProductList query
     * @param  {{search: String, categoryIds: Array<String|Number>, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} ProductList query
     * @memberof CategoryDispatcher
     */
    prepareRequest(options, dispatch) {
        dispatch(updateLoadStatus(true));
        return ProductListQuery.getQuery(options);
    }
}

export default new SearchBarDispatcher();
