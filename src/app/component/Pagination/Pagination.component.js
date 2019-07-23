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
import './Pagination.style';

class Pagination extends Component {
    renderPageLink(pageNumber, isCurrent) {
        const { category: { url_path } } = this.props;
        return (
        <Link
          to={ `/category/${ url_path }` }
          className={ isCurrent && 'active' }
          onClick={ () => window.scrollTo(0, 0) }
        >
            { pageNumber }
        </Link>
        );
    }

    render() {
        const { totalPages, currentPage } = this.props;

        return (
        <nav>
            <ul block="Pagination">
                { Array.from({ length: totalPages }, ((_, i) => (
                    <li block="Pagination" elem="ListItem">{ this.renderPageLink(i + 1, (i + 1) === currentPage) }</li>
                ))) }
            </ul>
        </nav>
        );
    }
}

Pagination.propTypes = {
    category: CategoryTreeType.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
