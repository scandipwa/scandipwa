/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import CategoryPage from 'Route/CategoryPage/CategoryPage.component';
import { decodeString } from 'Util/Common';

import './SearchPage.style';

/** @namespace Route/SearchPage/Component */
export class SearchPage extends CategoryPage {
    renderSearchHeading() {
        const { search } = this.props;

        return (
            <h1
              block="CategoryDetails"
              elem="Heading"
              mix={ {
                  block: 'SearchPage',
                  elem: 'Heading'
              } }
            >
                { __('Search results for: ') }
                <span>{ decodeString(search) }</span>
            </h1>
        );
    }

    renderCategoryDetails() {
        return (
            <article block="CategoryDetails">
                <div block="CategoryDetails" elem="Description">
                    { this.renderSearchHeading() }
                </div>
            </article>
        );
    }

    renderCmsBlock() {
        return null;
    }
}

export default SearchPage;
