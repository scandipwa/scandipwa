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
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';

import HomePage from 'Route/HomePage';
import CategoryPage from 'Route/CategoryPage';
import ProductPage from 'Route/ProductPage';
import CmsPage from 'Route/CmsPage';
import CartPage from 'Route/CartPage';
import CheckoutPage from 'Route/CheckoutPage';
import MyAccountDetails from 'Route/MyAccountDetails';
import PasswordChangePage from 'Route/PasswordChangePage';
import NoMatch from 'Route/NoMatch';
import NoMatchHandler from 'Route/NoMatchHandler';

import Header from 'Component/Header';
import Footer from 'Component/Footer';
import Breadcrumbs from 'Component/Breadcrumbs';
import NotificationList from 'Component/NotificationList';

import Store from 'Store';
import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';
import { CartDispatcher } from 'Store/Cart';

const BEFORE_ITEMS_TYPE = 'BEFORE_ITEMS_TYPE';
const SWITCH_ITEMS_TYPE = 'SWITCH_ITEMS_TYPE';
const AFTER_ITEMS_TYPE = 'AFTER_ITEMS_TYPE';

export const history = createBrowserHistory({ basename: '/' });

class AppRouter extends Component {
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
                    component: <Route path="/checkout" component={ CheckoutPage } />,
                    position: 55
                },
                {
                    component: <Route path="/:account*/createPassword/" component={ PasswordChangePage } />,
                    position: 60
                },
                {
                    component: <Route path="/my-account/" exact component={ MyAccountDetails } />,
                    position: 70
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

        this.customItems = {};
    }

    componentWillMount() {
        const {
            beforeItems,
            switchItems,
            afterItems
        } = this.customItems;

        this.itemsMap = {
            [BEFORE_ITEMS_TYPE]: beforeItems,
            [SWITCH_ITEMS_TYPE]: switchItems,
            [AFTER_ITEMS_TYPE]: afterItems
        };
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

        HeaderAndFooterDispatcher.handleData(Store.dispatch, { menu: { menuId: 2 }, footer: footerOptions });
        CartDispatcher.updateInitialCartData(Store.dispatch);
    }

    /**
     * Returns custom items by contentType
     * @param {string} contentType
     */
    getItemsByContentType(contentType) {
        return this.itemsMap[contentType];
    }

    /**
     * Merges core items and custom items. Returns sorted array by position.
     * @param {Array} items
     * @param {string} contentType
     */
    prepareContent(items, contentType) {
        const customItems = this.getItemsByContentType(contentType) || [];
        const mergedItems = items.concat(customItems);

        return Object.values(mergedItems.reduce((prev, current) => {
            const { position, component } = current;
            const { position: prevPosition } = prev;

            if (position < 0) {
                console.warn(
                    `Router item has negative position ${
                        position
                    }! Use positive values only.`
                );

                return current;
            }

            if (prev[position]) {
                throw new Error(`Router item has occupied position ${
                    prevPosition
                }! Choose another position.`);
            }

            return { [position]: component, ...prev };
        }, {}));
    }

    /**
     * Applies given key to the given element
     * @param {Object} element
     * @param {string|number} key
     */
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
            <Router history={ history }>
                <>
                    {
                        this.prepareContent(beforeItems, BEFORE_ITEMS_TYPE)
                            .map((item, key) => item && this.applyKeyToReactElement(item, key))
                    }
                    <NoMatchHandler>
                        <Switch>
                            {
                                this.prepareContent(switchItems, SWITCH_ITEMS_TYPE)
                                    .map((item, key) => item && this.applyKeyToReactElement(item, key))
                            }
                        </Switch>
                    </NoMatchHandler>
                    {
                        this.prepareContent(afterItems, AFTER_ITEMS_TYPE)
                            .map((item, key) => item && this.applyKeyToReactElement(item, key))
                    }
                </>
            </Router>
        );
    }
}

export default AppRouter;
