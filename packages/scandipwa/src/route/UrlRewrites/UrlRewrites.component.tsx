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

import { lazy, PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import {
    UrlRewritePageType,
} from './UrlRewrites.config';
import { UrlRewritesComponentProps, UrlRewritesComponentState } from './UrlRewrites.type';

export const ProductPage = lazy(
    () => import(/* webpackMode: "lazy", webpackChunkName: "product" */ 'Route/ProductPage'),
);
export const CategoryPage = lazy(
    () => import(/* webpackMode: "lazy", webpackChunkName: "category" */ 'Route/CategoryPage'),
);
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/CmsPage'));
export const NoMatch = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Route/NoMatch'));

/**
 * Additional types possible:
 * const TYPE_PWA = 'PWA_ROUTER';
 * const TYPE_CUSTOM = 'CUSTOM';
 * @namespace Route/UrlRewrites/Component
 */
export class UrlRewritesComponent<
P extends Readonly<UrlRewritesComponentProps> = Readonly<UrlRewritesComponentProps>,
S extends UrlRewritesComponentState = UrlRewritesComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<UrlRewritesComponentProps> = {
        props: {},
        type: '',
    };

    renderDefaultPage(): ReactElement {
        return (
            <main />
        );
    }

    renderProductPage(): ReactElement {
        const { props } = this.props;
        const {
            match,
            productSKU,
            id,
        } = props;

        if (!productSKU) {
            return this.renderDefaultPage();
        }

        return (
            <ProductPage
              match={ match }
              productSKU={ productSKU }
              productID={ id }
              key={ id }
            />
        );
    }

    renderCmsPage(): ReactElement {
        const { props } = this.props;
        const {
            match,
            pageIds,
        } = props;

        return (
            <CmsPage
              match={ match }
              pageIds={ pageIds }
            />
        );
    }

    renderCategoryPage(): ReactElement {
        const { props } = this.props;
        const {
            match,
            categoryIds,
            displayMode,
        } = props;

        return (
            <CategoryPage
              match={ match }
              categoryIds={ categoryIds }
              displayMode={ displayMode }
            />
        );
    }

    renderNoMatch(): ReactElement {
        return <NoMatch />;
    }

    renderContent(): ReactElement {
        const { type } = this.props;

        switch (type) {
        case UrlRewritePageType.PRODUCT:
            return this.renderProductPage();
        case UrlRewritePageType.CMS_PAGE:
            return this.renderCmsPage();
        case UrlRewritePageType.CATEGORY:
            return this.renderCategoryPage();
        case UrlRewritePageType.NOTFOUND:
            return this.renderNoMatch();
        default:
            return this.renderDefaultPage();
        }
    }

    render(): ReactElement {
        return this.renderContent();
    }
}

export default UrlRewritesComponent;
