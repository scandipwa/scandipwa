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
export class UrlRewrites extends PureComponent {
    static propTypes = {
        location: LocationType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        match: MatchType.isRequired,
        clearUrlRewrites: PropTypes.func.isRequired,
        requestUrlRewrite: PropTypes.func.isRequired,
        urlRewrite: PropTypes.shape({
            notFound: PropTypes.bool
        }).isRequired
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

    stateMapping = {
        category: TYPE_CATEGORY,
        product: TYPE_PRODUCT,
        page: TYPE_CMS_PAGE
    };

    constructor(props) {
        super(props);

        this.handleUrlRewrite();
    }

    componentDidUpdate(prevProps) {
        const { match, location } = prevProps;
        const { match: prevMatch, location: prevLocation } = this.props;

        const urlParam = getUrlParam(match, location);
        const prevUrlParam = getUrlParam(prevMatch, prevLocation);

        if (urlParam !== prevUrlParam) {
            this.handleUrlRewrite();
        }
    }

    componentWillUnmount() {
        const { clearUrlRewrites } = this.props;
        clearUrlRewrites();
    }

    getUrlRewriteType() {
        const {
            location: { state = {} }
        } = this.props;

        const { actionName = '' } = window;
        const typeKey = Object.keys(state).find(key => this.stateMapping[key]);

        if (typeKey) {
            return this.stateMapping[typeKey];
        }

        return actionName;
    }

    handleUrlRewrite() {
        const type = this.getUrlRewriteType();

        // Type is not set
        if (!type) {
            this.requestRewrite();
            return;
        }

        // Known components
        if (this.knownTypes.indexOf(type) >= 0) {
            this.setState({ placeholderType: type });
            this.requestRewrite();
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

    requestRewrite() {
        const { requestUrlRewrite, match, location } = this.props;
        const urlParam = getUrlParam(match, location);
        requestUrlRewrite({ urlParam });
    }

    renderEmptyPage() {
        const { isNotFound } = this.state;
        const { urlRewrite: { notFound } } = this.props;

        if (isNotFound || notFound) {
            return <NoMatch { ...this.props } />;
        }

        return <main />;
    }

    renderPage({ type, id }) {
        switch (type) {
        case TYPE_PRODUCT:
            return <ProductPage { ...this.props } productsIds={ id } />;
        case TYPE_CMS_PAGE:
            return <CmsPage { ...this.props } pageIds={ id } />;
        case TYPE_CATEGORY:
            return <CategoryPage { ...this.props } categoryIds={ id } />;
        case TYPE_NOTFOUND:
            return <NoMatch { ...this.props } />;
        default:
            return this.renderEmptyPage();
        }
    }

    renderPlaceholders() {
        const { placeholderType } = this.state;

        switch (placeholderType) {
        case TYPE_PRODUCT:
            return <ProductPage { ...this.props } isOnlyPlaceholder />;
        case TYPE_CMS_PAGE:
            return <CmsPage { ...this.props } isOnlyPlaceholder />;
        case TYPE_CATEGORY:
            return <CategoryPage { ...this.props } isOnlyPlaceholder />;
        case TYPE_NOTFOUND:
            return <NoMatch { ...this.props } />;
        default:
            return this.renderEmptyPage();
        }
    }

    render() {
        const { urlRewrite, isLoading } = this.props;
        const { isNotFound } = this.state;

        if (isLoading) {
            return this.renderPlaceholders();
        }

        if (
            (urlRewrite && Object.entries(urlRewrite).length)
            || isNotFound
        ) {
            return this.renderPage(urlRewrite);
        }

        return this.renderPlaceholders();
    }
}

export default UrlRewrites;
