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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryPage from 'Route/CategoryPage';
import ProductPage from 'Route/ProductPage';
import CmsPage from 'Route/CmsPage';
import NoMatch from 'Route/NoMatch';
import { getUrlParam } from 'Util/Url';
import BrowserDatabase from 'Util/BrowserDatabase';

class UrlRewrites extends Component {
    constructor() {
        super();

        this.state = {
            isNotFound: false,
            placeholderType: ''
        };
    }

    componentWillMount() {
        const { status } = BrowserDatabase.getItem('response_status');
        if (status === 200) {
            const { type } = BrowserDatabase.getItem('response_type');
            this.setState({ placeholderType: type });
            const { requestUrlRewrite, match, location } = this.props;
            const urlParam = getUrlParam(match, location);
            requestUrlRewrite({ urlParam });
        } else {
            this.setState({ isNotFound: true });
        }
    }

    componentWillUnmount() {
        const { clearUrlRewrites } = this.props;
        clearUrlRewrites();
    }

    switcher({ type, id, url_key }) {
        const { props } = this;
        console.log('RENDERING SWITCHER')
        switch (type) {
        case 'PRODUCT':
            const newRoute = {
                ...props,
                location: {
                    ...props.location,
                    pathname: `/${ url_key }`
                }

            };
            return <ProductPage { ...newRoute } />;
        case 'CMS_PAGE':
            return <CmsPage { ...props } cmsId={ id } />;
        case 'CATEGORY':
            return <CategoryPage { ...props } categoryIds={ id } />;
        default:
            return <NoMatch { ...props } />;
        }
    }

    renderPlaceholders() {
        const { props } = this;
        const { placeholderType } = this.state;

        switch (placeholderType) {
        case 'PRODUCT':
            return <ProductPage { ...props } isOnlyPlaceholder />;
        case 'CMS_PAGE':
            return <CmsPage { ...props } cmsId={ 0 } isOnlyPlaceholder />;
        case 'CATEGORY':
            return <CategoryPage { ...props } isOnlyPlaceholder />;
        default:
            return <NoMatch { ...props } />;
        }
    }

    render() {
        const { urlRewrite } = this.props;
        const { isNotFound } = this.state;

        if ((urlRewrite && Object.entries(urlRewrite).length) || isNotFound) {
            return this.switcher(urlRewrite);
        }

        return this.renderPlaceholders();
    }
}

UrlRewrites.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired
};

export default UrlRewrites;
