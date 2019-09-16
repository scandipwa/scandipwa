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
import PropTypes from 'prop-types';
import './CategoryPagination.style';
import CategoryPaginationLink from 'Component/CategoryPaginationLink';
import TextPlaceholder from 'Component/TextPlaceholder';

export default class CategoryPagination extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        pathname: PropTypes.string.isRequired,
        onPageSelect: PropTypes.func.isRequired,
        totalPages: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        getSearchQuery: PropTypes.func.isRequired
    };

    static defaultProps = {
        isLoading: false
    };

    renderPreviousPageLink(page) {
        return this.renderPageLink(page, __('Previous page'), false, '◄');
    }

    renderPageLinks() {
        const { totalPages: length, currentPage } = this.props;

        return Array.from({ length }, (_, i) => (
            this.renderPageLink(i + 1, __('Page %s', i + 1), (i + 1) === currentPage, (i + 1).toString())
        ));
    }

    renderNextPageLink(page) {
        return this.renderPageLink(page, __('Next page'), false, '►');
    }

    renderPageLink(pageNumber, label, isCurrent, text) {
        const { pathname, onPageSelect, getSearchQuery } = this.props;

        return (
            <li
              key={ pageNumber }
              block="CategoryPagination"
              elem="ListItem"
            >
                <CategoryPaginationLink
                  text={ text }
                  label={ label }
                  url_path={ pathname }
                  getPage={ onPageSelect }
                  isCurrent={ isCurrent }
                  pageNumber={ pageNumber }
                  getSearchQueryForPage={ getSearchQuery }
                />
            </li>
        );
    }

    renderPlaceholder() {
        return (
            <ul block="CategoryPagination" mods={ { isLoading: true } }>
                { Array.from({ length: 4 }, (_, i) => (
                    <li
                      key={ i }
                      block="CategoryPagination"
                      elem="ListItem"
                    >
                        <TextPlaceholder length="block" />
                    </li>
                )) }
            </ul>
        );
    }

    render() {
        const { totalPages, currentPage, isLoading } = this.props;

        if (isLoading) return this.renderPlaceholder();

        return (
            <nav aria-label={ __('Product list navigation') }>
                <ul block="CategoryPagination">
                    { (currentPage > 1)
                        ? this.renderPreviousPageLink(currentPage - 1)
                        : <li block="CategoryPagination" elem="ListItem" /> }
                    { this.renderPageLinks() }
                    { (currentPage <= totalPages - 1)
                        ? this.renderNextPageLink(currentPage + 1)
                        : <li block="CategoryPagination" elem="ListItem" /> }
                </ul>
            </nav>
        );
    }
}
