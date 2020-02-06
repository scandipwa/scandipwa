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

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PureComponent } from 'react';
import { ItemsType } from 'Type/ProductList';
import { hideActiveOverlay } from 'Store/Overlay';
import { SearchBarDispatcher } from 'Store/SearchBar';
import Event, { EVENT_GTM_IMPRESSIONS_SEARCH } from 'Util/Event';

import SearchOverlay from './SearchOverlay.component';

export const mapStateToProps = state => ({
    searchResults: state.SearchBarReducer.productsInSearch,
    isLoading: state.SearchBarReducer.isLoading
});

export const mapDispatchToProps = dispatch => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    makeSearchRequest: options => SearchBarDispatcher.handleData(dispatch, options),
    clearSearchResults: () => SearchBarDispatcher.clearSearchResults(dispatch)
});

export class SearchOverlayContainer extends PureComponent {
    static propTypes = {
        searchResults: ItemsType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        searchCriteria: PropTypes.string.isRequired,
        makeSearchRequest: PropTypes.func.isRequired,
        clearSearchResults: PropTypes.func.isRequired
    };

    containerFunctions = {
        getProductLinkTo: this.getProductLinkTo.bind(this),
        makeSearchRequest: this.makeSearchRequest.bind(this)
    };

    componentDidUpdate() {
        const { searchResults: items, isLoading, searchCriteria } = this.props;
        if (!isLoading && searchCriteria && items.length) {
            Event.dispatch(EVENT_GTM_IMPRESSIONS_SEARCH, { items });
        }
    }

    getProductLinkTo(product) {
        const { url_key } = product;

        if (!url_key) return {};
        return {
            pathname: `/product/${ url_key }`,
            state: { product }
        };
    }

    makeSearchRequest() {
        const { makeSearchRequest, clearSearchResults, searchCriteria } = this.props;
        if (searchCriteria) {
            clearSearchResults();
            makeSearchRequest({ args: { search: searchCriteria } });
        }
    }

    render() {
        return (
            <SearchOverlay
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchOverlayContainer);
