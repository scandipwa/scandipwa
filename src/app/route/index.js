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

export const BEFORE_ITEMS_TYPE = 'BEFORE_ITEMS_TYPE';
export const SWITCH_ITEMS_TYPE = 'SWITCH_ITEMS_TYPE';
export const AFTER_ITEMS_TYPE = 'AFTER_ITEMS_TYPE';

export class AppRouter extends Component {
    constructor() {
        super();
        this.items = {
            beforeItems: [
                {
                    component: <NotificationList />,
                    position: 10
                },
                {
                    component: <Header />,
                    position: 20
                },
                {
                    component: <Breadcrumbs />,
                    position: 30
                }
            ],
            switchItems: [
                {
                    component: <Route path="/" exact component={ HomePage } />,
                    position: 10
                },
                {
                    component: <Route path="/category" component={ CategoryPage } />,
                    position: 20
                },
                {
                    component: <Route path="/product" component={ ProductPage } />,
                    position: 30
                },
                {
                    component: <Route path="/page/:id" component={ CmsPage } />,
                    position: 40
                },
                {
                    component: <Route path="/cart" exact component={ CartPage } />,
                    position: 50
                },
                {
                    component: <Route component={ NoMatch } />,
                    position: 100
                }
            ],
            afterItems: [
                {
                    component: <Footer />,
                    position: 10
                }
            ]
        };
    }

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

    prepareContent(items) {
        return items;
    }

    applyKeyToReactElement(element, key) {
        return React.cloneElement(element, { ...element.props, key });
    }

    render() {
        const {
            beforeItems,
            switchItems,
            afterItems
        } = this.items;

        return (
            <Router>
                <>
                    {
                        this.prepareContent(beforeItems, BEFORE_ITEMS_TYPE)
                            .map((item, key) => item && this.applyKeyToReactElement(item.component, key))
                    }
                    <NoMatchHandler>
                        <Switch>
                            {
                                this.prepareContent(switchItems, SWITCH_ITEMS_TYPE)
                                    .map((item, key) => item && this.applyKeyToReactElement(item.component, key))
                            }
                        </Switch>
                    </NoMatchHandler>
                    {
                        this.prepareContent(afterItems, AFTER_ITEMS_TYPE)
                            .map((item, key) => item && this.applyKeyToReactElement(item.component, key))
                    }
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
