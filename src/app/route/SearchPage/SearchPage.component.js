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
import CategoryPage from 'Route/CategoryPage/CategoryPage.component';


class SearchPage extends CategoryPage {
    constructor(props) {
        super(props);
        this.state = {
            sortKey: 'name',
            sortDirection: 'ASC',
            defaultPriceRange: { min: 0, max: 300 },
            minPriceRange: 0,
            maxPriceRange: 300,
            previousPage: 0,
            pageSize: 12,
            search: props.match.params.query
        };
    }

    componentWillMount() {
        this.updateBreadcrumbs();
    }

    componentDidMount() {
        const { isOnlyPlaceholder, updateLoadStatus } = this.props;

        if (!isOnlyPlaceholder) {
            this.updateBreadcrumbs();
            this.requestCategory();
        } else {
            updateLoadStatus(true);
        }
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const { search } = this.state;
        updateBreadcrumbs([
            {
                name: 'Results'
            },
            {
                url: search,
                name: search
            },
            {
                name: 'Search'
            }
        ]);
    }
}

SearchPage.propTypes = {
    makeSearchRequest: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default SearchPage;
