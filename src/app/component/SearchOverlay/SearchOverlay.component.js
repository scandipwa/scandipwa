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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from 'Component/Image';
import Overlay from 'Component/Overlay';
import { ItemsType } from 'Type/ProductList';
import './SearchOverlay.style';
import TextPlaceholder from 'Component/TextPlaceholder';

class SearchOverlay extends Component {
    componentDidUpdate(prevProps) {
        const { searchCriteria: prevSearchCriteria } = prevProps;
        const { searchCriteria, clearSearchResults } = this.props;

        if (this.timeout) clearTimeout(this.timeout);

        if (searchCriteria !== prevSearchCriteria) {
            clearSearchResults();
            this.timeout = setTimeout(() => {
                this.timeout = null;
                this.makeSearchRequest();
            }, 500);
        }
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
            makeSearchRequest({ search: searchCriteria });
        }
    }

    renderSearchItem(product, i) {
        const { hideActiveOverlay } = this.props;
        const {
            thumbnail,
            name,
            brand
        } = product;

        const imageSrc = thumbnail ? `/media/catalog/product${ thumbnail.path }` : null;

        return (
            <li
              block="SearchOverlay"
              elem="Item"
              key={ i }
            >
                <Link to={ this.getProductLinkTo(product) } onClick={ () => hideActiveOverlay() }>
                    <figure
                      block="SearchOverlay"
                      elem="Wrapper"
                    >
                        <Image
                          block="SearchOverlay"
                          elem="Image"
                          src={ imageSrc }
                          alt={ `Product ${name} thumbnail.` }
                        />
                        <figcaption block="SearchOverlay" elem="Content">
                            <p block="SearchOverlay" elem="Brand">
                                <TextPlaceholder content={ brand } />
                            </p>
                            <h4 block="SearchOverlay" elem="Title">
                                <TextPlaceholder content={ name } length="long" />
                            </h4>
                        </figcaption>
                    </figure>
                </Link>
            </li>
        );
    }

    renderSearchCriteria() {
        const { searchCriteria } = this.props;

        return (
            <p
              block="SearchOverlay"
              elem="Criteria"
              mods={ { isVisible: !!searchCriteria } }
            >
                Results for:
                <strong>{ searchCriteria }</strong>
            </p>
        );
    }

    renderSearchResults() {
        const { searchCriteria, searchResults, isLoading } = this.props;

        if (!searchCriteria) {
            return (<p>Start typing to see search results!</p>);
        }

        if (!searchResults.length && !isLoading && !this.timeout) {
            return (<p>No results found!</p>);
        }

        const resultsToRender = isLoading || this.timeout ? Array(5).fill({}) : searchResults;

        return (
            <ul>
                { resultsToRender.map((item, i) => this.renderSearchItem(item, i)) }
            </ul>
        );
    }

    render() {
        return (
            <Overlay
              id="search"
              mix={ { block: 'SearchOverlay' } }
            >
                { this.renderSearchCriteria() }
                <article
                  block="SearchOverlay"
                  elem="Results"
                  aria-label="Search results"
                >
                    { this.renderSearchResults() }
                </article>
            </Overlay>
        );
    }
}

SearchOverlay.propTypes = {
    makeSearchRequest: PropTypes.func.isRequired,
    clearSearchResults: PropTypes.func.isRequired,
    hideActiveOverlay: PropTypes.func.isRequired,
    searchCriteria: PropTypes.string,
    searchResults: ItemsType.isRequired,
    isLoading: PropTypes.bool.isRequired
};

SearchOverlay.defaultProps = {
    searchCriteria: ''
};

export default SearchOverlay;
