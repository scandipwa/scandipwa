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

import { PureComponent } from 'react';
import Link from 'Component/Link';
import PropTypes from 'prop-types';
import Image from 'Component/Image';
import Overlay from 'Component/Overlay';
import { ItemsType } from 'Type/ProductList';
import './SearchOverlay.style';
import TextPlaceholder from 'Component/TextPlaceholder';

export const SEARCH_TIMEOUT = 500;
export const AMOUNT_OF_PLACEHOLDERS = 5;

export default class SearchOverlay extends PureComponent {
    static propTypes = {
        hideActiveOverlay: PropTypes.func.isRequired,
        searchCriteria: PropTypes.string,
        searchResults: ItemsType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        getProductLinkTo: PropTypes.func.isRequired,
        makeSearchRequest: PropTypes.func.isRequired,
        clearSearchResults: PropTypes.func.isRequired
    };

    static defaultProps = {
        searchCriteria: ''
    };

    componentDidUpdate(prevProps) {
        const { searchCriteria: prevSearchCriteria } = prevProps;
        const { searchCriteria, clearSearchResults, makeSearchRequest } = this.props;

        if (this.timeout) clearTimeout(this.timeout);

        if (searchCriteria !== prevSearchCriteria) {
            clearSearchResults();
            this.timeout = setTimeout(() => {
                this.timeout = null;
                makeSearchRequest();
            }, SEARCH_TIMEOUT);
        }
    }

    renderSearchItemContent(name, brand) {
        return (
            <>
                <p block="SearchOverlay" elem="Brand">
                    <TextPlaceholder content={ brand } />
                </p>
                <h4 block="SearchOverlay" elem="Title" mods={ { isLoaded: !!name } }>
                    <TextPlaceholder content={ name } length="long" />
                </h4>
            </>
        );
    }

    renderSearchItem(product, i) {
        const { hideActiveOverlay, getProductLinkTo } = this.props;
        const {
            name,
            thumbnail: { path } = {},
            attributes: { brand: { attribute_value: brand } = {} } = {}
        } = product;

        const imageSrc = path ? `/media/catalog/product${ path }` : undefined;

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
                  onClick={ hideActiveOverlay }
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
              mods={ { isVisible: !!searchCriteria } }
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

        if (!searchCriteria) this.renderNoSearchCriteria();
        if (!searchResults.length && !isLoading && !this.timeout) this.renderNoResults();
        const resultsToRender = (isLoading || this.timeout) ? Array(AMOUNT_OF_PLACEHOLDERS).fill({}) : searchResults;

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
