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
    renderPageLink(pageNumber, isCurrent) {
        const {
            category: { url_path }, getPage, location, history
        } = this.props;

        const page = pageNumber !== 1 ? pageNumber : '';
        const search = generateQuery({ page }, location, history);

        return (
            <Link
              to={ {
                  pathname: `/category/${ url_path }`,
                  search
              } }
              aria-label={ __('Page %s', pageNumber) }
              className={ isCurrent ? 'active' : '' }
              aria-current={ isCurrent ? 'page' : 'false' }
              onClick={ () => getPage(pageNumber) }
            >
                { pageNumber }
            </Link>
        );
    }

    render() {
        const {
            totalPages, currentPage, ariaLabel
        } = this.props;

        return (
            <nav aria-label={ ariaLabel }>
                <ul block="CategoryPagination">
                    { Array.from({ length: totalPages }, ((_, i) => (
                        <li
                          key={ i }
                          block="CategoryPagination"
                          elem="ListItem"
                        >
                            { this.renderPageLink(i + 1, (i + 1) === currentPage) }
                        </li>
                    ))) }
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
