export const UPDATE_SEARCH_BAR = 'UPDATE_SEARCH_BAR';
export const UPDATE_SEARCH_LOAD_STATUS = 'UPDATE_SEARCH_LOAD_STATUS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

const updateSearchBar = result => ({
    type: UPDATE_SEARCH_BAR,
    result
});

const updateLoadStatus = status => ({
    type: UPDATE_SEARCH_LOAD_STATUS,
    isLoading: status
});

const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
});

export { updateSearchBar, updateLoadStatus, clearSearchResults };
