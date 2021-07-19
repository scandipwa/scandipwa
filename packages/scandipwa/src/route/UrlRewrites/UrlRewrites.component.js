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
        isNotFound: PropTypes.bool,
        props: PropTypes.object,
        type: PropTypes.string
    };

    static defaultProps = {
        isNotFound: false,
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
        const { id } = props;

        switch (type) {
        case TYPE_PRODUCT:
            return <ProductPage { ...props } key={ id } />;
        case TYPE_CMS_PAGE:
            return <CmsPage { ...props } />;
        case TYPE_CATEGORY:
            return <CategoryPage { ...props } />;
        case TYPE_NOTFOUND:
            return <NoMatch { ...props } />;
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
