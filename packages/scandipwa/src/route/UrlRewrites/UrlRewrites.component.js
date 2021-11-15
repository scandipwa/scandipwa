/* eslint-disable max-len */
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
import { lazy, PureComponent, Suspense } from 'react';

import { HistoryType, LocationType, MatchType } from 'Type/Router.type';

import {
    TYPE_CATEGORY,
    TYPE_CMS_PAGE,
    TYPE_NOTFOUND,
    TYPE_PRODUCT
} from './UrlRewrites.config';

export const ProductPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "product" */ 'Route/ProductPage'));
export const CategoryPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "category" */ 'Route/CategoryPage'));
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/CmsPage'));
export const NoMatch = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Route/NoMatch'));

/**
 * Additional types possible:
 * const TYPE_PWA = 'PWA_ROUTER';
 * const TYPE_CUSTOM = 'CUSTOM';
 * @namespace Route/UrlRewrites/Component
 */
export class UrlRewrites extends PureComponent {
    static propTypes = {
        props: PropTypes.shape({
            location: LocationType,
            match: MatchType,
            history: HistoryType,
            categoryIds: PropTypes.number,
            id: PropTypes.number,
            productSKU: PropTypes.string,
            pageIds: PropTypes.number
        }),
        type: PropTypes.string
    };

    static defaultProps = {
        props: {},
        type: ''
    };

    renderDefaultPage() {
        return (
            <main />
        );
    }

    renderContent() {
        const { props, type } = this.props;
        const {
            id,
            history,
            location,
            match,
            productSKU,
            categoryIds,
            pageIds
        } = props;

        switch (type) {
        case TYPE_PRODUCT:
            return (
                <ProductPage
                  history={ history }
                  location={ location }
                  match={ match }
                  productSKU={ productSKU }
                  productID={ id }
                  key={ id }
                />
            );
        case TYPE_CMS_PAGE:
            return (
                <CmsPage
                  history={ history }
                  location={ location }
                  match={ match }
                  pageIds={ pageIds }
                />
            );
        case TYPE_CATEGORY:
            return (
                <CategoryPage
                  history={ history }
                  location={ location }
                  match={ match }
                  categoryIds={ categoryIds }
                />
            );
        case TYPE_NOTFOUND:
            return (
                <NoMatch
                  history={ history }
                  location={ location }
                  match={ match }
                />
            );
        default:
            return this.renderDefaultPage();
        }
    }

    render() {
        return (
            <Suspense fallback={ this.renderDefaultPage() }>
                { this.renderContent() }
            </Suspense>
        );
    }
}

export default UrlRewrites;
