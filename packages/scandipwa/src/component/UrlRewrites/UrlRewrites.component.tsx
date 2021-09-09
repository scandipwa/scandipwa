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

import { lazy, Suspense } from 'react';
import { match } from 'react-router-dom';

import { lazily } from 'Util/Lazily';
import { SimpleComponent } from 'Util/SimpleComponent';

import {
    TYPE_CATEGORY,
    TYPE_CMS_PAGE,
    TYPE_NOTFOUND,
    TYPE_PRODUCT
} from './UrlRewrites.config';

export const ProductPage = lazy(
    () => import(/* webpackMode: "lazy", webpackChunkName: "product" */ 'Component/ProductPage')
);
export const CategoryPage = lazy(
    () => import(/* webpackMode: "lazy", webpackChunkName: "category" */ 'Component/CategoryPage')
);
export const { CmsPage } = lazily(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Component/CmsPage'));
export const NoMatch = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Component/NoMatch'));

export type UrlRewritesTypes = |
    typeof TYPE_CATEGORY |
    typeof TYPE_CMS_PAGE |
    typeof TYPE_NOTFOUND |
    typeof TYPE_PRODUCT |
    ''

export interface UrlRewritesProps {
    id?: string
    type: UrlRewritesTypes
    productSKU?: string
    categoryIds?: number
    pageIds?: number
    match: match
}

/**
 * Additional types possible:
 * const TYPE_PWA = 'PWA_ROUTER';
 * const TYPE_CUSTOM = 'CUSTOM';
 * @namespace Component/UrlRewrites/Component
 */
export class UrlRewritesComponent extends SimpleComponent<UrlRewritesProps> {
    renderDefaultPage(): JSX.Element {
        return (
            <main />
        );
    }

    renderContent(): JSX.Element {
        const {
            id,
            type,
            match,
            productSKU,
            categoryIds,
            pageIds
        } = this.props;

        switch (type) {
        case TYPE_PRODUCT:
            return (
                <ProductPage
                  match={ match }
                  productSKU={ productSKU }
                  key={ id }
                />
            );
        case TYPE_CMS_PAGE:
            return (
                <CmsPage pageIds={ pageIds } match={ match } />
            );
        case TYPE_CATEGORY:
            return (
                <CategoryPage
                  match={ match }
                  categoryIds={ categoryIds }
                />
            );
        case TYPE_NOTFOUND:
            return (
                <NoMatch />
            );
        default:
            return this.renderDefaultPage();
        }
    }

    render(): JSX.Element {
        return (
            <Suspense fallback={ this.renderDefaultPage() }>
                { this.renderContent() }
            </Suspense>
        );
    }
}
