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
import UrlRewritesMockData from '../urlRewritesMockData';

class UrlRewrites extends Component {
    switcher({ originalKey, i }, route) {
        // removeProductFromCart.
    
        const newRoute = {
            ...route,
            location: {
                ...route.location,
                pathname: `/${ originalKey }`
            }
            
        };

        switch (i) {
        case 0:
            return <ProductPage { ...newRoute } />;
        case 1:
            return <CmsPage { ...newRoute } />;
        case 2:
            return <CategoryPage { ...newRoute } />;
        default:
            return <NoMatch { ...newRoute } />;
        }
    }

    findUrlRewrites(urlInput) {
        const { data: { products, cms, categories } } = UrlRewritesMockData;
        const getOriginalKey = (element) => {
            if (element) {
                const { items } = element;
                let original_url_key;
                items.forEach((item) => {
                    const { url_key, url_rewrites } = item;
                    url_rewrites.forEach((url_rewrite) => {
                        const { url } = url_rewrite;
                        if (url === urlInput) { original_url_key = url_key; }
                    });
                });

                return original_url_key;
            }

            return null;
        };

        const productsRewrites = [products, cms, categories].map((element, i) => {
            const originalKey = getOriginalKey(element);

            if (originalKey) return { originalKey, i };
            return null;
        });
        return productsRewrites && productsRewrites.filter(Boolean);
    }

    render() {
        const {
            props,
            props: {
                location: {
                    pathname
                }
            }
        } = this;
        const urlRewrites = this.findUrlRewrites(pathname);
        const switcher = this.switcher(urlRewrites[0], props);

        return switcher;
    }
}

// UrlRewrites.propTypes = {
//     updateHeaderAndFooter: PropTypes.func.isRequired
// };

// const mapDispatchToProps = dispatch => ({
//     updateHeaderAndFooter: (options) => {
//         HeaderAndFooterDispatcher.handleData(dispatch, options);
//     }
// });

// const UrlRewritesContainer = connect(() => ({}), mapDispatchToProps)(UrlRewrites);

export default UrlRewrites;
