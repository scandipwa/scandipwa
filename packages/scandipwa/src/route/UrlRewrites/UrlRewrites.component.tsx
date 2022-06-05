/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { lazy, PureComponent, Suspense } from 'react';

import { ReactElement } from 'Type/Common.type';

import {
    UrlRewritePageType
} from './UrlRewrites.config';
import { UrlRewritesComponentProps } from './UrlRewrites.type';

export const ProductPage = lazy(
    () => import(/* webpackMode: "lazy", webpackChunkName: "product" */ 'Route/ProductPage')
);
export const CategoryPage = lazy(
    () => import(/* webpackMode: "lazy", webpackChunkName: "category" */ 'Route/CategoryPage')
);
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/CmsPage'));
export const NoMatch = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Route/NoMatch'));

/**
 * Additional types possible:
 * const TYPE_PWA = 'PWA_ROUTER';
 * const TYPE_CUSTOM = 'CUSTOM';
 * @namespace Route/UrlRewrites/Component
 */
export class UrlRewrites extends PureComponent<UrlRewritesComponentProps> {
    static defaultProps: Partial<UrlRewritesComponentProps> = {
        props: {},
        type: ''
    };

    renderDefaultPage(): JSX.Element {
        return (
            <main />
        );
    }

    renderContent(): ReactElement {
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
        case UrlRewritePageType.PRODUCT:
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
        case UrlRewritePageType.CMS_PAGE:
            return (
                    <CmsPage
                      history={ history }
                      location={ location }
                      match={ match }
                      pageIds={ pageIds }
                    />
            );
        case UrlRewritePageType.CATEGORY:
            return (
                    <CategoryPage
                      history={ history }
                      location={ location }
                      match={ match }
                      categoryIds={ categoryIds }
                    />
            );
        case UrlRewritePageType.NOTFOUND:
            return (
                    <NoMatch />
            );
        default:
            return this.renderDefaultPage();
        }
    }

    render(): ReactElement {
        return (
            <Suspense fallback={ this.renderDefaultPage() }>
                { this.renderContent() }
            </Suspense>
        );
    }
}

export default UrlRewrites;
