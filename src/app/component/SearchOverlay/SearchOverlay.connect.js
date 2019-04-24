import { connect } from 'react-redux';
import { SearchBarDispatcher } from 'Store/SearchBar';
import SearchOverlay from './SearchOverlay.component';

const mapStateToProps = state => ({
    products: state.SearchBarReducer.productsInSearch,
    isLoading: state.SearchBarReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
    requestSearchBar: (options) => {
        SearchBarDispatcher.handleData(dispatch, options);
    },
    clearSearchResults: () => {
        SearchBarDispatcher.clearSearchResults(dispatch);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchOverlay);
