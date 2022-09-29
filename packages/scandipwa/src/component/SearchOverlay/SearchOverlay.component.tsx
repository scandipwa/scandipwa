/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import Overlay from 'Component/Overlay';
import SearchItem from 'Component/SearchItem';
import { ReactElement } from 'Type/Common.type';
import { IndexedProduct } from 'Util/Product/Product.type';

import {
    AMOUNT_OF_PLACEHOLDERS,
    SEARCH_TIMEOUT,
} from './SearchOverlay.config';
import { SearchOverlayComponentProps } from './SearchOverlay.type';

import './SearchOverlay.style';

/** @namespace Component/SearchOverlay/Component */
export class SearchOverlay extends PureComponent<SearchOverlayComponentProps> {
    static defaultProps: Partial<SearchOverlayComponentProps> = {
        searchCriteria: '',
    };

    timeout: NodeJS.Timeout | null = null;

    componentDidUpdate(prevProps: SearchOverlayComponentProps): void {
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

    renderSearchItem(product: Partial<IndexedProduct>, i: number): ReactElement {
        return (
            <SearchItem
              product={ product }
              key={ product.id || i }
            />
        );
    }

    renderNoResults(): ReactElement {
        return <p block="NoResults">{ __('No results found!') }</p>;
    }

    renderSearchResults(): ReactElement {
        const { searchResults, isLoading } = this.props;

        if (!searchResults.length && !isLoading && !this.timeout) {
            return this.renderNoResults();
        }

        const resultsToRender = (isLoading || this.timeout) ? Array(AMOUNT_OF_PLACEHOLDERS).fill({}) : searchResults;

        return (
            <ul
              block="SearchOverlay"
              elem="ItemsHolder"
            >
                { resultsToRender.map((item, i) => this.renderSearchItem(item, i)) }
            </ul>
        );
    }

    render(): ReactElement {
        const { isHideOverlay, searchCriteria } = this.props;

        if (!searchCriteria.trim()) {
            return null;
        }

        if (isHideOverlay) {
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
