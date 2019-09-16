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
import { PureComponent } from 'react';
import CategoryPage from 'Route/CategoryPage';
import ProductPage from 'Route/ProductPage';
import CmsPage from 'Route/CmsPage';
import NoMatch from 'Route/NoMatch';
import { getUrlParam } from 'Util/Url';
import { LocationType, MatchType } from 'Type/Common';

export const TYPE_PRODUCT = 'PRODUCT';
export const TYPE_CMS_PAGE = 'CMS_PAGE';
export const TYPE_CATEGORY = 'CATEGORY';
export const TYPE_NOTFOUND = 'NOT_FOUND';

/**
 * Additional types possible:
 * const TYPE_PWA = 'PWA_ROUTER';
 * const TYPE_CUSTOM = 'CUSTOM';
 */
export default class UrlRewrites extends PureComponent {
    static propTypes = {
        location: LocationType.isRequired,
        match: MatchType.isRequired,
        clearUrlRewrites: PropTypes.func.isRequired,
        requestUrlRewrite: PropTypes.func.isRequired,
        urlRewrite: PropTypes.shape({}).isRequired
    };

    state = {
        isNotFound: false,
        placeholderType: ''
    };

    knownTypes = [
        TYPE_CATEGORY,
        TYPE_CMS_PAGE,
        TYPE_PRODUCT
    ];

    componentWillMount() {
        const { type } = window.actionName || '';

        // Type is not set
        if (!type) {
            this.requestRewrite();
            return;
        }

        // Known components
        if (this.knownTypes.indexOf(type) >= 0) {
            this.setState({ placeholderType: type });
            const { requestUrlRewrite, match, location } = this.props;
            const urlParam = getUrlParam(match, location);
            requestUrlRewrite({ urlParam });
            return;
        }

        // Not found
        if (type === TYPE_NOTFOUND) {
            this.setState({ isNotFound: true });
            return;
        }

        // Try to resolve unknown rewrite
        this.requestRewrite();
    }

    componentWillUnmount() {
        const { clearUrlRewrites } = this.props;
        clearUrlRewrites();
    }

    requestRewrite() {
        const { requestUrlRewrite, match, location } = this.props;
        const urlParam = getUrlParam(match, location);
        requestUrlRewrite({ urlParam });
    }

    renderEmptyPage() {
        const { isNotFound } = this.state;
        const { urlRewrite: { notFound } } = this.props;

        if (isNotFound || notFound) return <NoMatch { ...this.props } />;

        return <main />;
    }

    renderPage({ type, id, url_key }) {
        const { props } = this;

        switch (type) {
        case TYPE_PRODUCT:
            const newRoute = {
                ...props,
                location: {
                    ...props.location,
                    pathname: `/${ url_key }`
                }

            };

            return <ProductPage { ...newRoute } />;
        case TYPE_CMS_PAGE:
            return <CmsPage { ...props } urlKey={ url_key } />;
        case TYPE_CATEGORY:
            return <CategoryPage { ...props } categoryIds={ id } />;
        case TYPE_NOTFOUND:
            return <NoMatch { ...props } />;
        default:
            return this.renderEmptyPage();
        }
    }

    renderPlaceholders() {
        const { props } = this;
        const { placeholderType } = this.state;

        switch (placeholderType) {
        case TYPE_PRODUCT:
            return <ProductPage { ...props } isOnlyPlaceholder />;
        case TYPE_CMS_PAGE:
            return <CmsPage { ...props } urlKey="" isOnlyPlaceholder />;
        case TYPE_CATEGORY:
            return <CategoryPage { ...props } isOnlyPlaceholder />;
        case TYPE_NOTFOUND:
            return <NoMatch { ...props } />;
        default:
            return this.renderEmptyPage();
        }
    }

    render() {
        const { urlRewrite } = this.props;
        const { isNotFound } = this.state;

        if ((urlRewrite && Object.entries(urlRewrite).length) || isNotFound) {
            return this.renderPage(urlRewrite);
        }

        return this.renderPlaceholders();
    }
}
