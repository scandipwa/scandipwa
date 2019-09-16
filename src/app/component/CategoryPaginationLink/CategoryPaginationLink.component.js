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
import Link from 'Component/Link';
import './CategoryPaginationLink.style';

export default class CategoryPaginationLink extends PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired,
        getPage: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        isCurrent: PropTypes.bool.isRequired,
        url_path: PropTypes.string.isRequired,
        pageNumber: PropTypes.number.isRequired,
        getSearchQueryForPage: PropTypes.func.isRequired
    };

    getPage = () => {
        const { getPage, pageNumber } = this.props;
        getPage(pageNumber);
    };

    getSearchQueryForPage = () => {
        const { getSearchQueryForPage, pageNumber } = this.props;
        return getSearchQueryForPage(pageNumber);
    };

    render() {
        const {
            text,
            label,
            url_path: pathname,
            isCurrent
        } = this.props;

        const search = this.getSearchQueryForPage();

        return (
            <Link
              to={ {
                  search,
                  pathname
              } }
              aria-label={ label }
              block="CategoryPaginationLink"
              mods={ { isCurrent } }
              aria-current={ isCurrent ? 'page' : 'false' }
              onClick={ this.getPage }
            >
                { text }
            </Link>
        );
    }
}
