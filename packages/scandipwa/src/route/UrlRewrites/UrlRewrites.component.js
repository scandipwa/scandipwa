/* eslint-disable max-len */
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

import PropTypes from 'prop-types';
import { lazy, PureComponent } from 'react';

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

    renderProductPage() {
        const { props } = this.props;
        const {
            history,
            location,
            match,
            productSKU,
            id
        } = props;

        if (!productSKU) {
            return this.renderDefaultPage();
        }

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
    }

    renderCmsPage() {
        const { props } = this.props;
        const {
            history,
            location,
            match,
            pageIds
        } = props;

        return (
            <CmsPage
              history={ history }
              location={ location }
              match={ match }
              pageIds={ pageIds }
            />
        );
    }

    renderCategoryPage() {
        const { props } = this.props;
        const {
            history,
            location,
            match,
            categoryIds
        } = props;

        return (
            <CategoryPage
              history={ history }
              location={ location }
              match={ match }
              categoryIds={ categoryIds }
            />
        );
    }

    renderNoMatch() {
        const { props } = this.props;

        console.log('urlrewr', this.props);
        const {
            history,
            location,
            match
        } = props;

        return (
        <NoMatch
          history={ history }
          location={ location }
          match={ match }
        />
        );
    }

    renderDefaultPage() {
        return (
            <main />
        );
    }

    renderContent() {
        const { type } = this.props;

        switch (type) {
        case TYPE_PRODUCT:
            return this.renderProductPage();
        case TYPE_CMS_PAGE:
            return this.renderCmsPage();
        case TYPE_CATEGORY:
            return this.renderCategoryPage();
        case TYPE_NOTFOUND:
            return this.renderNoMatch();
        default:
            return this.renderDefaultPage();
        }
    }

    render() {
        return (
            this.renderContent()
        );
    }
}

export default UrlRewrites;
