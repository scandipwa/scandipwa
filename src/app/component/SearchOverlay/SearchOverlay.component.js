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

import './SearchOverlay.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Image from 'Component/Image';
import Link from 'Component/Link';
import Overlay from 'Component/Overlay';
import TextPlaceholder from 'Component/TextPlaceholder';
import { ItemsType } from 'Type/ProductList';
import media, { PRODUCT_MEDIA } from 'Util/Media';

import {
    AMOUNT_OF_PLACEHOLDERS,
    SEARCH_TIMEOUT
} from './SearchOverlay.config';

export class SearchOverlay extends PureComponent {
    static propTypes = {
        hideActiveOverlay: PropTypes.func.isRequired,
        searchCriteria: PropTypes.string,
        searchResults: ItemsType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        clearSearch: PropTypes.func.isRequired,
        getProductLinkTo: PropTypes.func.isRequired,
        makeSearchRequest: PropTypes.func.isRequired,
        clearSearchResults: PropTypes.func.isRequired,
        hideOverlay: PropTypes.bool
    };

    static defaultProps = {
        searchCriteria: '',
        hideOverlay: false
    };

    componentDidUpdate(prevProps) {
        const { searchCriteria: prevSearchCriteria } = prevProps;
        const { searchCriteria, clearSearchResults, makeSearchRequest } = this.props;

        if (searchCriteria !== prevSearchCriteria) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            clearSearchResults();
            this.timeout = setTimeout(() => {
                this.timeout = null;
                makeSearchRequest();
            }, SEARCH_TIMEOUT);
        }
    }

    handleItemClick = () => {
        const { clearSearch, hideActiveOverlay } = this.props;

        clearSearch();
        hideActiveOverlay();
    };

    renderSearchItemAdditionalContent(brand) {
        const { isLoading } = this.props;

        if (!isLoading && !brand) {
            return null;
        }

        return (
            <p block="SearchOverlay" elem="Brand">
                <TextPlaceholder content={ brand } />
            </p>
        );
    }

    renderSearchItemContent(name, brand) {
        return (
            <>
                { this.renderSearchItemAdditionalContent(brand) }
                <h4 block="SearchOverlay" elem="Title" mods={ { isLoaded: !!name } }>
                    <TextPlaceholder content={ name } length="long" />
                </h4>
            </>
        );
    }

    renderSearchItem(product, i) {
        const { getProductLinkTo } = this.props;
        const {
            name,
            thumbnail: { path } = {},
            attributes: { brand: { attribute_value: brand } = {} } = {}
        } = product;

        const imageSrc = path ? media(path, PRODUCT_MEDIA) : undefined;

        return (
            <li
              block="SearchOverlay"
              elem="Item"
              key={ i }
            >
                <Link
                  block="SearchOverlay"
                  elem="Link"
                  to={ getProductLinkTo(product) }
                  onClick={ this.handleItemClick }
                >
                    <figure
                      block="SearchOverlay"
                      elem="Wrapper"
                    >
                        <Image
                          block="SearchOverlay"
                          elem="Image"
                          src={ imageSrc }
                          alt={ __('Product %s thumbnail.', name) }
                          isPlaceholder={ !imageSrc }
                        />
                        <figcaption block="SearchOverlay" elem="Content">
                            { this.renderSearchItemContent(name, brand) }
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
              mods={ { isVisible: !!searchCriteria.trim() } }
            >
                { __('Results for:') }
                <strong>{ searchCriteria }</strong>
            </p>
        );
    }

    renderNoSearchCriteria() {
        return <p>{ __('Start typing to see search results!') }</p>;
    }

    renderNoResults() {
        return <p>{ __('No results found!') }</p>;
    }

    renderSearchResults() {
        const { searchCriteria, searchResults, isLoading } = this.props;

        if (!searchCriteria.trim()) {
            return this.renderNoSearchCriteria();
        }
        if (!searchResults.length && !isLoading && !this.timeout) {
            return this.renderNoResults();
        }
        const resultsToRender = (isLoading || this.timeout) ? Array(AMOUNT_OF_PLACEHOLDERS).fill({}) : searchResults;

        return (
            <ul>
                { resultsToRender.map((item, i) => this.renderSearchItem(item, i)) }
            </ul>
        );
    }

    render() {
        const { hideOverlay } = this.props;

        if (hideOverlay) {
            return (
                <article
                  block="SearchOverlay"
                  elem="Results"
                  aria-label="Search results"
                >
                    { this.renderSearchResults() }
                </article>
            );
        }

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

export default SearchOverlay;
