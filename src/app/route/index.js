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
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route } from 'react-router';

import Header from 'Component/Header';
import Footer from 'Component/Footer';
import Breadcrumbs from 'Component/Breadcrumbs';
import NotificationList from 'Component/NotificationList';
import NoMatchHandler from 'Route/NoMatchHandler';

import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';

import Routes from 'Config/Routes';

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
    }

    loadRoutes() {
        const cache = [];

        // compare existing route with route from json and format it
        const getMatchingRoute = (item, realComponent) => {
            const componentName = item.split('/')[1];
            const matchingRoute = Routes.routes.filter(route => (route.component === componentName))[0];

            if (matchingRoute) {
                if (matchingRoute.path === '') matchingRoute.path = null;
                if (matchingRoute.path === '/') matchingRoute.exact = true;
                matchingRoute.realComponent = realComponent.default;
                return matchingRoute;
            }

            return null;
        };

        const parseRoutes = route => route.keys().forEach(key => cache.push(getMatchingRoute(key, route(key))));

        parseRoutes(require.context('./../route', true, /container\.js$/));

        // move NoMatch to the end
        cache.push(cache.splice(cache.findIndex(v => v.path === null), 1)[0]);

        return cache.map(item => item && (
            <Route
              key={ item.path + item.component }
              exact={ item.exact }
              path={ item.path }
              component={ item.realComponent }
            />
        ));
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
                            { this.loadRoutes() }
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
