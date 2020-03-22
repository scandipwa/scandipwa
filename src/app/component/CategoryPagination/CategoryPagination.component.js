/* eslint-disable fp/no-let, fp/no-loops */
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
        getSearchQuery: PropTypes.func.isRequired,
        paginationFrame: PropTypes.number,
        paginationFrameSkip: PropTypes.number,
        anchorTextPrevious: PropTypes.string,
        anchorTextNext: PropTypes.string
    };

    static defaultProps = {
        isLoading: false,
        paginationFrame: 5,
        paginationFrameSkip: 4,
        anchorTextPrevious: '',
        anchorTextNext: ''
    };

    renderPreviousPageLink(page) {
        const { anchorTextPrevious } = this.props;

        return this.renderPageLink(page, __('Previous page'), false, anchorTextPrevious || '◄');
    }

    renderPageLinks() {
        const {
            totalPages,
            paginationFrame,
            paginationFrameSkip,
            currentPage
        } = this.props;
        let pages = [];
        let i;

        // Render next pagination links
        for (i = currentPage; i <= currentPage + paginationFrame; i++) {
            if (i <= totalPages && pages.length <= paginationFrameSkip) {
                pages.push(this.renderPageLink(i, __('Page %s', i), i === currentPage, i.toString()));
            }
        }

        // Render previous pagination links if necessary
        for (i = 1; i < currentPage; i++) {
            if (pages.length < paginationFrame) {
                const id = currentPage - i;
                const pageData = this.renderPageLink(id, __('Page %s', id), false, id.toString());

                pages = [pageData, ...pages];
            }
        }

        // Edge case for rendering correct count of next links when current page is 1
        if (currentPage === 1 && pages.length < totalPages) {
            for (i = pages.length + 1; i <= paginationFrame; i++) {
                pages.push(this.renderPageLink(i, __('Page %s', i), false, i.toString()));
            }
        }

        return pages;
    }

    renderNextPageLink(page) {
        const { anchorTextNext } = this.props;

        return this.renderPageLink(page, __('Next page'), false, anchorTextNext || '►');
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
