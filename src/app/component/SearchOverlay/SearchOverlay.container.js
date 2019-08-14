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
import React, { PureComponent } from 'react';
import { SearchBarDispatcher } from 'Store/SearchBar';
import { hideActiveOverlay } from 'Store/Overlay';
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
    constructor(props) {
        super(props);

        this.containerFunctions = {
            getProductLinkTo: this.getProductLinkTo.bind(this),
            makeSearchRequest: this.makeSearchRequest.bind(this)
        };
    }

    getProductLinkTo(product) {
        const { url_key, configurableVariantIndex, parent } = product;
        const variantIndex = configurableVariantIndex || 0;

        if (!url_key) return '/';

        return {
            pathname: `/product/${ url_key }`,
            state: { product: parent || product, variantIndex },
            search: `?variant=${ variantIndex }`
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

SearchOverlayContainer.propTypes = {
    makeSearchRequest: PropTypes.func.isRequired,
    clearSearchResults: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchOverlayContainer);
