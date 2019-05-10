/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { connect } from 'react-redux';
import { SearchBarDispatcher } from 'Store/SearchBar';
import { hideActiveOverlay } from 'Store/Overlay';
import SearchOverlay from './SearchOverlay.component';

const mapStateToProps = state => ({
    searchResults: state.SearchBarReducer.productsInSearch,
    isLoading: state.SearchBarReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    makeSearchRequest: options => SearchBarDispatcher.handleData(dispatch, options),
    clearSearchResults: () => SearchBarDispatcher.clearSearchResults(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchOverlay);
