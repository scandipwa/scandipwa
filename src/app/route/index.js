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
                            <Route component={ NoMatch } />
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
