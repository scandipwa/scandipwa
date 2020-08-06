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

import './SearchPage.style';

import CategoryPage from 'Route/CategoryPage/CategoryPage.component';

export class SearchPage extends CategoryPage {
    renderCategoryDetails() {
        const { search } = this.props;

        return (
            <article block="CategoryDetails">
                <div block="CategoryDetails" elem="Description">
                <h1
                  block="CategoryDetails"
                  elem="Heading"
                  mix={ {
                      block: 'SearchPage',
                      elem: 'Heading'
                  } }
                >
                    { __('Search results for: ') }
                    <span>{ search }</span>
                </h1>
                </div>
            </article>
        );
    }

    renderCmsBlock() {
        return null;
    }
}

export default SearchPage;
