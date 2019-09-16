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
import { getUrlParam } from 'Util/Url';
import './SearchPage.style';

export default class SearchPage extends CategoryPage {
    static propTypes = {
        makeSearchRequest: PropTypes.func.isRequired,
        totalItems: PropTypes.number.isRequired
    };

    state = {
        sortKey: 'name',
        sortDirection: 'ASC',
        defaultPriceRange: { min: 0, max: 300 },
        previousPage: 0,
        pageSize: 12
    };

    componentDidMount() {
        const { isOnlyPlaceholder, updateLoadStatus } = this.props;

        if (!isOnlyPlaceholder) {
            this.updateBreadcrumbs();
            this.requestCategoryWithPageList();
        } else {
            updateLoadStatus(true);
        }
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props;

        if (this.urlHasChanged(location, prevProps)) {
            this.updateBreadcrumbs();
            this.requestCategoryWithPageList(this.shouldChangeProductListInfo(location, prevProps));
        }
    }

    /**
     * @inheritdoc
     */
    getSearchParam() {
        return getUrlParam({ path: 'search/' }, location);
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs, location } = this.props;
        const search = getUrlParam({ path: 'search/' }, location);
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

    renderCategoryDetails() {
        const search = decodeURIComponent(getUrlParam({ path: 'search/' }, location));

        return (
            <div block="SearchPage" elem="Description">
                <h1 block="SearchPage" elem="Heading">
                    { __('Search results for: ') }
                    <span>{ search }</span>
                </h1>
            </div>
        );
    }
}
