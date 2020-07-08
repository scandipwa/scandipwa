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

import NoMatch from 'Route/NoMatch';
import { LocationType, MatchType } from 'Type/Common';

import {
    TYPE_CATEGORY, TYPE_CMS_PAGE, TYPE_NOTFOUND, TYPE_PRODUCT
} from './UrlRewrites.config';

export const ProductPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "product" */ 'Route/ProductPage'));
export const CategoryPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "category" */ 'Route/CategoryPage'));
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "cms" */ 'Route/CmsPage'));

/**
 * Additional types possible:
 * const TYPE_PWA = 'PWA_ROUTER';
 * const TYPE_CUSTOM = 'CUSTOM';
 */
export class UrlRewrites extends PureComponent {
    static propTypes = {
        location: LocationType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        match: MatchType.isRequired,
        clearUrlRewrites: PropTypes.func.isRequired,
        requestUrlRewrite: PropTypes.func.isRequired,
        urlRewrite: PropTypes.shape({
            id: PropTypes.number,
            type: PropTypes.string,
            sku: PropTypes.string,
            notFound: PropTypes.bool
        }).isRequired
    };

    static stateMapping = {
        category: TYPE_CATEGORY,
        product: TYPE_PRODUCT,
        page: TYPE_CMS_PAGE
    };

    static getType(props) {
        const {
            location: {
                state = {}
            },
            urlRewrite: {
                type
            }
        } = props;

        const {
            actionName: { type: initialType = '' } = {}
        } = window;

        const typeKey = Object.keys(state).find(key => UrlRewrites.stateMapping[key]);

        if (typeKey) { // prefer state defined type
            return UrlRewrites.stateMapping[typeKey];
        }

        if (type) { // fallback to url-rewrite defined type
            return type;
        }

        // finally fallback to window property
        return initialType;
    }

    knownTypes = [
        TYPE_CATEGORY,
        TYPE_CMS_PAGE,
        TYPE_PRODUCT
    ];

    static getDerivedStateFromProps(props, state) {
        const {
            location: { pathname, state: historyState = {} },
            urlRewrite: { id, type, notFound },
            requestUrlRewrite
        } = props;

        const {
            prevPathname,
            prevId
        } = state;

        const {
            actionName: { type: initialType = '' } = {}
        } = window;

        if (pathname !== prevPathname) {
            requestUrlRewrite(pathname);

            // if URL is changed, we are interested in state type
            const typeKey = Object.keys(historyState).find(key => UrlRewrites.stateMapping[key]);
            const stateType = UrlRewrites.stateMapping[typeKey];

            return {
                type: stateType || initialType,
                prevPathname: pathname,
                isNotFound: false,
                id: null // unset id
            };
        }

        if (type === TYPE_NOTFOUND || notFound) {
            return {
                isNotFound: true
            };
        }

        if (id !== prevId) {
            // if url-rewrite is updated, update id and type
            return {
                id,
                type: type || initialType,
                prevId: id
            };
        }

        return null;
    }

    constructor(props) {
        super(props);

        const {
            location: {
                pathname
            },
            requestUrlRewrite
        } = props;

        this.state = {
            isNotFound: false,
            type: UrlRewrites.getType(props),
            id: null,
            prevId: null,
            prevPathname: pathname
        };

        requestUrlRewrite(pathname);
    }

    renderDefaultPage() {
        return (
            <main />
        );
    }

    renderEmptyPage() {
        const { isNotFound } = this.state;

        if (isNotFound) {
            return <NoMatch { ...this.props } />;
        }

        // TODO: add some loader?
        return this.renderDefaultPage();
    }

    getCategoryProps(id) {
        const {
            location: {
                state: {
                    category
                } = {}
            }
        } = this.props;

        const props = { ...this.props };

        if (id) {
            props.categoryIds = id;
        } else {
            props.isOnlyPlaceholder = true;
        }

        if (category && category !== true) {
            props.categoryIds = category;
            props.isNotRespectInfoLoading = true;
            // unset is loading to improve performance
            props.isOnlyPlaceholder = undefined;
        }

        return props;
    }

    getCurrentType() {
        const { type } = this.state;

        if (type) {
            return type;
        }

        return UrlRewrites.getType(this.props);
    }

    renderPage() {
        const type = this.getCurrentType();
        const { urlRewrite: { id, sku } } = this.props;

        switch (type) {
        case TYPE_PRODUCT:
            return <ProductPage { ...this.props } productSKU={ sku } />;
        case TYPE_CMS_PAGE:
            return <CmsPage { ...this.props } pageIds={ id } />;
        case TYPE_CATEGORY:
            return <CategoryPage { ...this.getCategoryProps(id) } />;
        case TYPE_NOTFOUND:
            return <NoMatch { ...this.props } />;
        default:
            return this.renderEmptyPage();
        }
    }

    renderPlaceholders() {
        const type = this.getCurrentType();

        switch (type) {
        case TYPE_PRODUCT:
            return <ProductPage { ...this.props } isOnlyPlaceholder />;
        case TYPE_CMS_PAGE:
            return <CmsPage { ...this.props } isOnlyPlaceholder />;
        case TYPE_CATEGORY:
            return <CategoryPage { ...this.getCategoryProps() } />;
        case TYPE_NOTFOUND:
            return <NoMatch { ...this.props } />;
        default:
            return this.renderEmptyPage();
        }
    }

    renderContent() {
        const { id, notFound } = this.state;

        if (id || notFound) {
            return this.renderPage();
        }

        return this.renderPlaceholders();
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
