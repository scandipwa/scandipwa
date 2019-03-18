import { connect } from 'react-redux';
import { SearchBarDispatcher } from 'Store/SearchBar';
import SearchBar from './SearchBar.component';

const mapStateToProps = state => ({
    products: state.SearchBarReducer.products,
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

const SearchBarContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default SearchBarContainer;
