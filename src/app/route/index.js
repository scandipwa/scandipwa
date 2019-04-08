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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from 'Route/HomePage';
import CategoryPage from 'Route/CategoryPage';
import ProductPage from 'Route/ProductPage';
import CmsPage from 'Route/CmsPage';
import CartPage from 'Route/CartPage';
import NoMatch from 'Route/NoMatch';
import NoMatchHandler from 'Route/NoMatchHandler';

import Header from 'Component/Header';
import Footer from 'Component/Footer';
import Breadcrumbs from 'Component/Breadcrumbs';
import NotificationList from 'Component/NotificationList';
import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';
import UrlRewrites from './urlRewrites';

const Testing = (test) => {
    const testing = findUrlRewrites(test.location.pathname);

    return (
        <p>Test is working</p>
    );
};
const Switcher = ({ match }, id) => {
    switch (id) {
    case 'category':
        return <CategoryPage />;
    case 'cms':
        return <CmsPage />;
    case 'product':
        return <ProductPage />;
    default:
        return <NoMatch />;
    }
};

const findUrlRewrites = (urlInput) => {
    const { data: { products, cms, categories } } = UrlRewrites;

    const getOriginalKey = ({ items }) => {
        let original_url_key;
        items.forEach((item) => {
            const { url_key, url_rewrites } = item;
            url_rewrites.forEach((url_rewrite) => {
                const { url } = url_rewrite;
                if (url === urlInput) { original_url_key = url_key; }
            });
        });

        return original_url_key;
    };

    const productsRewrites = [products, cms, categories].forEach(element => getOriginalKey(element));

    return productsRewrites;
};

class AppRouter extends Component {
    componentWillMount() {
        const { updateHeaderAndFooter } = this.props;
        const footerOptions = {
            identifiers: [
                'footer-free-shipping',
                'footer-online-support',
                'footer-payment-secure',
                'footer-company-links',
                'footer-resources-links',
                'footer-quick-links',
                'footer-social-links',
                'footer-download-our-apps',
                'footer-payment-options',
                'footer-copyright-text',
                'newsletter-signup'
            ],
            fields: ['identifier']
        };

        updateHeaderAndFooter({ menu: { menuId: 1 }, footer: footerOptions });

        console.log('000----->', UrlRewrites);
    }

    render() {
        return (
            <Router>
                <>
                    <NotificationList />
                    <Header />
                    <Breadcrumbs />
                    <NoMatchHandler>
                        <Switch>
                            <Route path="/" exact component={ HomePage } />
                            <Route path="/category" component={ CategoryPage } />
                            <Route path="/product" component={ ProductPage } />
                            <Route path="/page/:id" component={ CmsPage } />
                            <Route path="/cart" exact component={ CartPage } />
                            <Route component={ Testing } />
                        </Switch>
                    </NoMatchHandler>
                    <Footer />
                </>
            </Router>
        );
    }
}

AppRouter.propTypes = {
    updateHeaderAndFooter: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    updateHeaderAndFooter: (options) => {
        HeaderAndFooterDispatcher.handleData(dispatch, options);
    }
});

const AppRouterContainer = connect(() => ({}), mapDispatchToProps)(AppRouter);

export default AppRouterContainer;
