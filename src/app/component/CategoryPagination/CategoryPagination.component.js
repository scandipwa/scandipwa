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

import React, { PureComponent } from 'react';
import Link from 'Component/Link';
import PropTypes from 'prop-types';
import './CategoryPagination.style';

class CategoryPagination extends PureComponent {
    renderPreviousPageLink(page) {
        return this.renderPageLink(page, __('Previous page'), false, '◄');
    }

    renderPageLinks() {
        const { totalPages: length, currentPage } = this.props;

        return Array.from({ length }, (_, i) => (
            this.renderPageLink(i + 1, __('Page %s', i + 1), (i + 1) === currentPage, i + 1)
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
                <Link
                  to={ {
                      pathname,
                      search: getSearchQuery(pageNumber)
                  } }
                  aria-label={ label }
                  block="CategoryPagination"
                  elem="PaginationLink"
                  mods={ { isCurrent } }
                  aria-current={ isCurrent ? 'page' : 'false' }
                  onClick={ () => onPageSelect(pageNumber) }
                >
                    { text }
                </Link>
            </li>
        );
    }

    render() {
        const { totalPages, currentPage } = this.props;

        return (
            <nav aria-label={ __('Product list navigation') }>
                <ul block="CategoryPagination">
                    { (currentPage > 1)
                        ? this.renderPreviousPageLink(currentPage - 1)
                        : <li block="CategoryPagination" elem="ListItem" />
                    }
                    { this.renderPageLinks() }
                    { (currentPage <= totalPages - 1)
                        ? this.renderNextPageLink(currentPage + 1)
                        : <li block="CategoryPagination" elem="ListItem" />
                    }
                </ul>
            </nav>
        );
    }
}

CategoryPagination.propTypes = {
    pathname: PropTypes.string.isRequired,
    onPageSelect: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    getSearchQuery: PropTypes.func.isRequired
};

export default CategoryPagination;
