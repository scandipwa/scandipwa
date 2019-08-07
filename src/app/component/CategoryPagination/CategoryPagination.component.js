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
import { CategoryTreeType } from 'Type/Category';
import { generateQuery } from 'Util/Url';
import './CategoryPagination.style';

class CategoryPagination extends Component {
    renderPreviousPageLink(page) {
        return this.renderPageLink(page, __('Previous page'), false, '<');
    }

    renderPageLinks() {
        const { totalPages: length, currentPage } = this.props;

        return Array.from(
            { length },
            ((_, i) => this.renderPageLink(i + 1, __('Page %s', i + 1), (i + 1) === currentPage, i + 1))
        );
    }

    renderNextPageLink(page) {
        return this.renderPageLink(page, __('Next page'), false, '>');
    }

    renderPageLink(pageNumber, label, isCurrent, text) {
        const {
            category: { url_path }, getPage, location, history
        } = this.props;

        const page = pageNumber !== 1 ? pageNumber : '';
        const search = generateQuery({ page }, location, history);

        const active = isCurrent ? ' CategoryPagination-PaginationLink_active' : '';
        const className = `CategoryPagination-PaginationLink${active}`;

        return (
            <li
              key={ page }
              block="CategoryPagination"
              elem="ListItem"
            >
                <Link
                  to={ {
                      pathname: `/category/${ url_path }`,
                      search
                  } }
                  aria-label={ label }
                  className={ className }
                  aria-current={ isCurrent ? 'page' : 'false' }
                  onClick={ () => getPage(pageNumber) }
                >
                    { text }
                </Link>
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
    ariaLabel: PropTypes.string,
    getPage: PropTypes.func.isRequired,
    category: CategoryTreeType.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

CategoryPagination.defaultProps = {
    ariaLabel: ''
};

export default CategoryPagination;
