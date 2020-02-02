/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
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

import { PureComponent, cloneElement } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';

import GoogleTagManagerRouteWrapperComponent from 'Component/GoogleTagManager/GoggleTagManagerRouteWrapper.component';
import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';
import PasswordChangePage from 'Route/PasswordChangePage';
import NotificationList from 'Component/NotificationList';
import GoogleTagManager from 'Component/GoogleTagManager';
import NavigationTabs from 'Component/NavigationTabs';
import { WishlistDispatcher } from 'Store/Wishlist';
import NoMatchHandler from 'Route/NoMatchHandler';
import Breadcrumbs from 'Component/Breadcrumbs';
import { ConfigDispatcher } from 'Store/Config';
import CategoryPage from 'Route/CategoryPage';
import UrlRewrites from 'Route/UrlRewrites';
import { CartDispatcher } from 'Store/Cart';
import ProductPage from 'Route/ProductPage';
import SearchPage from 'Route/SearchPage';
import MyAccount from 'Route/MyAccount';
import Checkout from 'Route/Checkout';
import HomePage from 'Route/HomePage';
import Header, {
    PDP,
    CATEGORY,
    CUSTOMER_ACCOUNT,
    HOME_PAGE,
    MENU,
    SEARCH,
    CART,
    CHECKOUT,
    CMS_PAGE,
    URL_REWRITE,
    PASSWORD_CHANGE
} from 'Component/Header';
import Footer from 'Component/Footer';
import CartPage from 'Route/CartPage';
import MenuPage from 'Route/MenuPage';
import CmsPage from 'Route/CmsPage';
import Store from 'Store';

import SomethingWentWrong from './SomethingWentWrong';

export const BEFORE_ITEMS_TYPE = 'BEFORE_ITEMS_TYPE';
export const SWITCH_ITEMS_TYPE = 'SWITCH_ITEMS_TYPE';
export const AFTER_ITEMS_TYPE = 'AFTER_ITEMS_TYPE';

export const history = createBrowserHistory({ basename: '/' });

class AppRouter extends PureComponent {
    [BEFORE_ITEMS_TYPE] = [
        {
            component: <NotificationList />,
            position: 10
        },
        {
            component: <Header />,
            position: 20
        },
        {
            component: <NavigationTabs />,
            position: 25
        },
        {
            component: <Breadcrumbs />,
            position: 30
        },
        {
            component: <GoogleTagManager />,
            position: 40
        }
    ];

    [SWITCH_ITEMS_TYPE] = [
        {
            component: <Route
              path="/"
              exact
              render={ props => (
                <GoogleTagManagerRouteWrapperComponent route={ HOME_PAGE }>
                    <HomePage { ...props } />
                </GoogleTagManagerRouteWrapperComponent>
              ) }
            />,
            position: 10
        },
        {
            component: <Route
              path="/category"
              render={ props => (
                <GoogleTagManagerRouteWrapperComponent route={ CATEGORY }>
                    <CategoryPage { ...props } />
                </GoogleTagManagerRouteWrapperComponent>
              ) }
            />,
            position: 20
        },
        {
            component: <Route
              path="/search/:query/"
              render={ props => (
                <GoogleTagManagerRouteWrapperComponent route={ SEARCH }>
                    <SearchPage { ...props } />
                </GoogleTagManagerRouteWrapperComponent>
              ) }
            />,
            position: 25
        },
        {
            component: <Route
              path="/product"
              render={ props => (
                <GoogleTagManagerRouteWrapperComponent route={ PDP }>
                    <ProductPage { ...props } />
                </GoogleTagManagerRouteWrapperComponent>
              ) }
            />,
            position: 30
        },
        {
            component: <Route
              path="/page"
              render={ props => (
                <GoogleTagManagerRouteWrapperComponent route={ CMS_PAGE }>
                    <CmsPage { ...props } />
                </GoogleTagManagerRouteWrapperComponent>
              ) }
            />,
            position: 40
        },
        {
            component: <Route
              path="/cart"
              exact
              render={ props => (
                <GoogleTagManagerRouteWrapperComponent route={ CART }>
                    <CartPage { ...props } />
                </GoogleTagManagerRouteWrapperComponent>
              ) }
            />,
            position: 50
        },
        {
            component: <Route
              path="/checkout/:step?"
              render={ props => (
                <GoogleTagManagerRouteWrapperComponent route={ CHECKOUT }>
                    <Checkout { ...props } />
                </GoogleTagManagerRouteWrapperComponent>
              ) }
            />,
            position: 55
        },
        {
            component: <Route
              path="/:account*/createPassword/"
              render={ props => (
                <GoogleTagManagerRouteWrapperComponent route={ PASSWORD_CHANGE }>
                    <PasswordChangePage { ...props } />
                </GoogleTagManagerRouteWrapperComponent>
              ) }
            />,
            position: 60
        },
        {
            component: <Route
              path="/my-account/:tab?"
              render={ props => (
                <GoogleTagManagerRouteWrapperComponent route={ CUSTOMER_ACCOUNT }>
                    <MyAccount { ...props } />
                </GoogleTagManagerRouteWrapperComponent>
              ) }
            />,
            position: 70
        },
        {
            component: <Route
              path="/menu"
              render={ props => (
                <GoogleTagManagerRouteWrapperComponent route={ MENU }>
                    <MenuPage { ...props } />
                </GoogleTagManagerRouteWrapperComponent>
              ) }
            />,
            position: 80
        },
        {
            component: <Route
              render={ props => (
                <GoogleTagManagerRouteWrapperComponent route={ URL_REWRITE }>
                    <UrlRewrites { ...props } />
                </GoogleTagManagerRouteWrapperComponent>
              ) }
            />,
            position: 1000
        }
    ];

    [AFTER_ITEMS_TYPE] = [
        {
            component: <Footer />,
            position: 10
        }
    ];

    state = {
        hasError: false,
        errorDetails: {}
    };

    constructor(props) {
        super(props);

        this.dispatchActions();
    }

    getCmsBlocksToRequest() {
        const blocks = Object.values(window.contentConfiguration).reduce(
            (acc, config) => [
                ...acc,
                ...Object.entries(config).reduce(
                    (acc, [key, identifier]) => ((key.indexOf('cms') === -1)
                        ? acc
                        : [...acc, identifier]
                    ),
                    []
                )
            ],
            []
        ).filter((value, index, self) => value && self.indexOf(value) === index);

        return blocks.length ? blocks : ['social-links'];
    }

    getHeaderAndFooterOptions() {
        const { header_content: { header_menu } = {} } = window.contentConfiguration;

        return {
            menu: { identifier: [header_menu || 'new-main-menu'] },
            footer: { identifiers: this.getCmsBlocksToRequest() }
        };
    }

    getSortedItems(type) {
        const items = this[type].reduce((acc, { component, position }) => {
            if (!component) {
                console.warn('There is an item without a component property declared in main router.');
                return acc;
            }

            if (acc[position]) {
                console.warn(`There is already an item with ${ position } declared in main router.`);
                return acc;
            }

            return { ...acc, [position]: component };
        }, {});

        return items;
    }

    handleErrorReset = () => {
        this.setState({ hasError: false });
    };

    componentDidCatch(err, info) {
        this.setState({
            hasError: true,
            errorDetails: { err, info }
        });
    }

    dispatchActions() {
        WishlistDispatcher.updateInitialWishlistData(Store.dispatch);
        CartDispatcher.updateInitialCartData(Store.dispatch);
        ConfigDispatcher.handleData(Store.dispatch);
        HeaderAndFooterDispatcher.handleData(Store.dispatch, this.getHeaderAndFooterOptions());
    }

    renderItemsOfType(type) {
        return Object.entries(this.getSortedItems(type)).map(
            ([key, component]) => cloneElement(component, { key })
        );
    }

    renderErrorRouterContent() {
        const { errorDetails } = this.state;

        return (
            <SomethingWentWrong
              onClick={ this.handleErrorReset }
              errorDetails={ errorDetails }
            />
        );
    }

    renderDefaultRouterContent() {
        return (
            <>
                { this.renderItemsOfType(BEFORE_ITEMS_TYPE) }
                <NoMatchHandler>
                    <Switch>
                        { this.renderItemsOfType(SWITCH_ITEMS_TYPE) }
                    </Switch>
                </NoMatchHandler>
                { this.renderItemsOfType(AFTER_ITEMS_TYPE) }
            </>
        );
    }

    renderRouterContent() {
        const { hasError } = this.state;
        if (hasError) return this.renderErrorRouterContent();
        return this.renderDefaultRouterContent();
    }

    render() {
        return (
            <Router history={ history }>
                { this.renderRouterContent() }
            </Router>
        );
    }
}

export default AppRouter;
