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

import { createRef, PureComponent } from 'react';

import Overlay from 'Component/Overlay';
import SearchItem from 'Component/SearchItem';
import { ReactElement } from 'Type/Common.type';
import { IndexedProduct } from 'Util/Product/Product.type';

import {
    AMOUNT_OF_PLACEHOLDERS,
    SEARCH_TIMEOUT,
} from './SearchOverlay.config';
import { SearchOverlayComponentProps, SearchOverlayComponentState } from './SearchOverlay.type';

import './SearchOverlay.style';

/** @namespace Component/SearchOverlay/Component */
export class SearchOverlayComponent extends PureComponent<SearchOverlayComponentProps> {
    static defaultProps: Partial<SearchOverlayComponentProps> = {
        searchCriteria: '',
    };

    state: SearchOverlayComponentState = {
        activeClosingAnimation: false,
    };

    timeout: NodeJS.Timeout | null = null;

    resultRef = createRef<HTMLDivElement>();

    componentDidUpdate(prevProps: SearchOverlayComponentProps): void {
        const { searchCriteria: prevSearchCriteria } = prevProps;
        const { searchCriteria, clearSearchResults, makeSearchRequest } = this.props;

        if (!searchCriteria.trim() && searchCriteria !== prevSearchCriteria) {
            this.setState({ activeClosingAnimation: true });

            const animationendHandler = () => {
                this.setState({ activeClosingAnimation: false });

                this.resultRef.current?.removeEventListener('animationend', animationendHandler);
            };

            this.resultRef.current?.addEventListener('animationend', animationendHandler);
        }

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

    renderSearchOverlayResults(): ReactElement {
        const { activeClosingAnimation } = this.state;

        return (
            <div
              block="SearchOverlay"
              elem="Results"
              aria-label="Search results"
              mods={ { activeClosingAnimation } }
              ref={ this.resultRef }
            >
                { this.renderSearchResults() }
            </div>
        );
    }

    render(): ReactElement {
        const { isHideOverlay, searchCriteria } = this.props;
        const { activeClosingAnimation } = this.state;

        const isOpen = searchCriteria.trim().length > 0 || activeClosingAnimation;

        if (isHideOverlay) {
            return (
                <div
                  block="SearchOverlay"
                  mods={ { isOpen } }
                >
                        <div block="SearchOverlay" elem="Background" />
                        <div
                          block="SearchOverlay"
                          elem="ResultsWrapper"
                        >
                            { this.renderSearchOverlayResults() }
                        </div>
                </div>
            );
        }

        return (
            <Overlay
              id="search"
              isOpen={ isOpen }
            >
                { this.renderSearchOverlayResults() }
            </Overlay>
        );
    }
}

export default SearchOverlayComponent;
