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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { UTMOST_PAGES_COUNT } from 'Component/CategoryPagination/CategoryPagination.config';
import CategoryPaginationLink from 'Component/CategoryPaginationLink';
import TextPlaceholder from 'Component/TextPlaceholder';

import './CategoryPagination.style';

/** @namespace Component/CategoryPagination/Component */
export class CategoryPagination extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        pathname: PropTypes.string.isRequired,
        onPageSelect: PropTypes.func.isRequired,
        totalPages: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        getSearchQuery: PropTypes.func.isRequired,
        anchorTextPrevious: PropTypes.string,
        anchorTextNext: PropTypes.string,
        firstFramePage: PropTypes.number.isRequired,
        lastFramePage: PropTypes.number.isRequired,
        prevPageJump: PropTypes.number.isRequired,
        nextPageJump: PropTypes.number.isRequired,
        paginationFrameSkip: PropTypes.number.isRequired
    };

    static defaultProps = {
        isLoading: false,
        anchorTextPrevious: '',
        anchorTextNext: ''
    };

    renderPreviousPageLink() {
        const {
            anchorTextPrevious,
            currentPage
        } = this.props;

        if (currentPage <= 1) {
            return (
                <li block="CategoryPagination" elem="ListItem" />
            );
        }

        return this.renderPageLink(
            currentPage - 1,
            __('Previous page'),
            anchorTextPrevious || this.renderPageIcon()
        );
    }

    renderPageLinks() {
        const {
            currentPage,
            firstFramePage,
            lastFramePage
        } = this.props;

        const pages = [];
        let i;

        // Render frame pagination links
        for (i = firstFramePage; i <= lastFramePage; i++) {
            pages.push(this.renderPageLink(
                i,
                __('Page %s', i),
                i.toString(),
                i === currentPage
            ));
        }

        return pages;
    }

    renderPageIcon(isNext = false) {
        return (
            <span
              block="CategoryPagination"
              elem="Icon"
              mods={ { isNext } }
            />
        );
    }

    renderNextPageLink() {
        const {
            anchorTextNext,
            currentPage,
            totalPages
        } = this.props;

        if (currentPage > totalPages - 1) {
            return (
                <li block="CategoryPagination" elem="ListItem" />
            );
        }

        return this.renderPageLink(
            currentPage + 1,
            __('Next page'),
            anchorTextNext || this.renderPageIcon(true)
        );
    }

    renderPageLink(
        pageNumber,
        label,
        children,
        isCurrent = false
    ) {
        const {
            pathname,
            onPageSelect,
            getSearchQuery
        } = this.props;

        return (
            <li
              key={ pageNumber }
              block="CategoryPagination"
              elem="ListItem"
            >
                <CategoryPaginationLink
                  label={ label }
                  url_path={ pathname }
                  getPage={ onPageSelect }
                  isCurrent={ isCurrent }
                  pageNumber={ pageNumber }
                  getSearchQueryForPage={ getSearchQuery }
                >
                    { children }
                </CategoryPaginationLink>
            </li>
        );
    }

    renderFirstPageLink() {
        const { firstFramePage } = this.props;

        if (firstFramePage === 1) {
            return null;
        }

        return this.renderPageLink(
            1,
            __('Page %s', 1),
            '1',
        );
    }

    renderLastPageLink() {
        const { totalPages, lastFramePage } = this.props;

        if (totalPages === lastFramePage) {
            return null;
        }

        return this.renderPageLink(
            totalPages,
            __('Page %s', totalPages),
            totalPages.toString(),
        );
    }

    // displayed as '...' by default
    renderPreviousJump() {
        const { firstFramePage, prevPageJump, paginationFrameSkip } = this.props;

        if (!paginationFrameSkip || paginationFrameSkip < 2) {
            return null;
        }

        if (firstFramePage <= UTMOST_PAGES_COUNT) {
            return null;
        }

        return this.renderPageLink(
            prevPageJump,
            __('Page %s', prevPageJump),
            '...',
        );
    }

    // displayed as '...' by default
    renderNextJump() {
        const {
            totalPages,
            lastFramePage,
            nextPageJump,
            paginationFrameSkip
        } = this.props;

        if (!paginationFrameSkip || paginationFrameSkip < 2) {
            return null;
        }

        if (totalPages - lastFramePage < UTMOST_PAGES_COUNT) {
            return null;
        }

        return this.renderPageLink(
            nextPageJump,
            __('Page %s', nextPageJump),
            '...',
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
        const { isLoading, totalPages } = this.props;

        if (totalPages === 1) { // do not show pagination, if there are less then one page
            return <ul block="CategoryPagination" />;
        }

        if (isLoading) {
            return this.renderPlaceholder();
        }

        return (
            <nav aria-label={ __('Product list navigation') }>
                <ul block="CategoryPagination">
                    { this.renderPreviousPageLink() }
                    { this.renderFirstPageLink() }
                    { this.renderPreviousJump() }
                    { this.renderPageLinks() }
                    { this.renderNextJump() }
                    { this.renderLastPageLink() }
                    { this.renderNextPageLink() }
                </ul>
            </nav>
        );
    }
}

export default CategoryPagination;
