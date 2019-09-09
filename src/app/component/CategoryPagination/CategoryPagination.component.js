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
import { CategoryTreeType } from 'Type/Category';
import './CategoryPagination.style';
import CategoryPaginationLink from 'Component/CategoryPaginationLink';

export default class CategoryPagination extends PureComponent {
    static propTypes = {
        ariaLabel: PropTypes.string,
        getPage: PropTypes.func.isRequired,
        category: CategoryTreeType.isRequired,
        totalPages: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        getSearchQueryForPage: PropTypes.func.isRequired
    };

    static defaultProps = {
        ariaLabel: ''
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
        const {
            category: { url_path },
            getPage,
            getSearchQueryForPage
        } = this.props;

        return (
            <li
              key={ pageNumber }
              block="CategoryPagination"
              elem="ListItem"
            >
                <CategoryPaginationLink
                  text={ text }
                  label={ label }
                  getPage={ getPage }
                  url_path={ url_path }
                  isCurrent={ isCurrent }
                  pageNumber={ pageNumber }
                  getSearchQueryForPage={ getSearchQueryForPage }
                />
            </li>
        );
    }

    render() {
        const {
            totalPages, currentPage, ariaLabel
        } = this.props;

        return (
            <nav aria-label={ ariaLabel }>
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
