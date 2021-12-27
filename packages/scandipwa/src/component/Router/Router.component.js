/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */

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
import {
    cloneElement,
    lazy,
    PureComponent,
    Suspense
} from 'react';
import { Router as ReactRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import Loader from 'Component/Loader';
import Meta from 'Component/Meta';
import UrlRewrites from 'Route/UrlRewrites';
import {
    ADDRESS_BOOK, MY_DOWNLOADABLE, MY_ORDERS, MY_WISHLIST, NEWSLETTER_SUBSCRIPTION
} from 'Type/Account.type';
import history from 'Util/History';

import {
    ACCOUNT_FORGOT_PASSWORD,
    AFTER_ITEMS_TYPE,
    BEFORE_ITEMS_TYPE,
    BREADCRUMBS,
    CART,
    CHANGE_PASSWORD,
    CHECKOUT,
    CMS_PAGE,
    COMPARE,
    CONFIRM_ACCOUNT,
    CONTACT_PAGE,
    COOKIE_POPUP,
    CREATE_ACCOUNT,
    DEMO_NOTICE,
    FOOTER,
    HEADER,
    HOME,
    LOGIN,
    MENU,
    MY_ACCOUNT,
    MY_ACCOUNT_ADDRESS,
    MY_ACCOUNT_DOWNLOADABLE,
    MY_ACCOUNT_NEWSLETTER,
    MY_ACCOUNT_ORDER,
    MY_ACCOUNT_ORDERS,
    MY_ACCOUNT_WISHLIST,
    NAVIGATION_TABS,
    NEW_VERSION_POPUP,
    NOTIFICATION_LIST,
    SEARCH,
    SHARED_WISHLIST,
    STYLE_GUIDE,
    SWITCH_ITEMS_TYPE,
    URL_REWRITES
} from './Router.config';

export const CartPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cart" */ 'Route/CartPage'));
export const Checkout = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "checkout" */ 'Route/Checkout'));
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/CmsPage'));
export const CookiePopup = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ 'Component/CookiePopup'));
export const DemoNotice = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ 'Component/DemoNotice'));
export const Header = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "header" */ 'Component/Header'));
export const HomePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/HomePage'));
export const MyAccount = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "account" */ 'Route/MyAccount'));
export const PasswordChangePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Route/PasswordChangePage'));
export const SearchPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "search" */ 'Route/SearchPage'));
export const ConfirmAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/ConfirmAccountPage'));
export const MenuPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/MenuPage'));
export const Footer = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "footer" */ 'Component/Footer'));
export const NavigationTabs = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "header" */ 'Component/NavigationTabs'));
export const NewVersionPopup = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ 'Component/NewVersionPopup'));
export const NotificationList = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ 'Component/NotificationList'));
export const WishlistShared = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Route/WishlistSharedPage'));
export const OfflineNotice = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ 'Component/OfflineNotice'));
export const ContactPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "contact" */ 'Route/ContactPage'));
export const ProductComparePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Route/ProductComparePage'));
export const CreateAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Route/CreateAccount'));
export const LoginAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Route/LoginAccount'));
export const ForgotPasswordPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Route/ForgotPassword'));
export const SomethingWentWrong = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "something-went-wrong" */ 'Route/SomethingWentWrong'));
export const StyleGuidePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Route/StyleGuidePage'));
export const Breadcrumbs = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "header" */ 'Component/Breadcrumbs'));

/** @namespace Component/Router/Component/withStoreRegex */
export const withStoreRegex = (path) => window.storeRegexText.concat(path);

/** @namespace Component/Router/Component */
export class Router extends PureComponent {
    static propTypes = {
        isBigOffline: PropTypes.bool
    };

    static defaultProps = {
        isBigOffline: false
    };

    [BEFORE_ITEMS_TYPE] = [
        {
            component: <NotificationList />,
            position: 10,
            name: NOTIFICATION_LIST
        },
        {
            component: <DemoNotice />,
            position: 15,
            name: DEMO_NOTICE
        },
        {
            component: <Header />,
            position: 20,
            name: HEADER
        },
        {
            component: <NavigationTabs />,
            position: 25,
            name: NAVIGATION_TABS
        },
        {
            component: <Breadcrumbs />,
            position: 30,
            name: BREADCRUMBS
        },
        {
            component: <NewVersionPopup />,
            position: 35,
            name: NEW_VERSION_POPUP
        }
    ];

    [SWITCH_ITEMS_TYPE] = [
        {
            component: <Route path={ withStoreRegex('/') } exact render={ (props) => <HomePage { ...props } /> } />,
            position: 10,
            name: HOME
        },
        {
            component: <Route path={ withStoreRegex('/search/:query/') } render={ (props) => <SearchPage { ...props } /> } />,
            position: 25,
            name: SEARCH
        },
        {
            component: <Route path={ withStoreRegex('/page') } render={ (props) => <CmsPage { ...props } /> } />,
            position: 40,
            name: CMS_PAGE
        },
        {
            component: <Route path={ withStoreRegex('/cart') } exact render={ (props) => <CartPage { ...props } /> } />,
            position: 50,
            name: CART
        },
        {
            component: <Route path={ withStoreRegex('/checkout/:step?') } render={ (props) => <Checkout { ...props } /> } />,
            position: 55,
            name: CHECKOUT
        },
        {
            component: <Route path={ withStoreRegex('/customer/account/createPassword/') } render={ (props) => <PasswordChangePage { ...props } /> } />,
            position: 60,
            name: CHANGE_PASSWORD
        },
        {
            component: <Route path={ withStoreRegex('/customer/account/create/') } render={ (props) => <CreateAccountPage { ...props } /> } />,
            position: 61,
            name: CREATE_ACCOUNT
        },
        {
            component: <Route path={ withStoreRegex('/customer/account/login/') } render={ (props) => <LoginAccountPage { ...props } /> } />,
            position: 62,
            name: LOGIN
        },
        {
            component: <Route path={ withStoreRegex('/customer/account/forgotpassword/') } render={ (props) => <ForgotPasswordPage { ...props } /> } />,
            position: 63,
            name: ACCOUNT_FORGOT_PASSWORD
        },
        {
            component: <Route path={ withStoreRegex('/customer/account/confirm') } render={ (props) => <ConfirmAccountPage { ...props } /> } />,
            position: 65,
            name: CONFIRM_ACCOUNT
        },
        {
            component: <Route path={ withStoreRegex('/sales/order/view/order_id/:orderId?') } render={ (props) => <MyAccount { ...props } selectedTab={ MY_ORDERS } /> } />,
            position: 70,
            name: MY_ACCOUNT_ORDER
        },
        {
            component: <Route path={ withStoreRegex('/sales/order/history') } render={ (props) => <MyAccount { ...props } selectedTab={ MY_ORDERS } /> } />,
            position: 71,
            name: MY_ACCOUNT_ORDERS
        },
        {
            component: <Route path={ withStoreRegex('/downloadable/customer/products') } render={ (props) => <MyAccount { ...props } selectedTab={ MY_DOWNLOADABLE } /> } />,
            position: 72,
            name: MY_ACCOUNT_DOWNLOADABLE
        },
        {
            component: <Route path={ withStoreRegex('/wishlist') } render={ (props) => <MyAccount { ...props } selectedTab={ MY_WISHLIST } /> } />,
            position: 73,
            name: MY_ACCOUNT_WISHLIST
        },
        {
            component: <Route path={ withStoreRegex('/customer/address') } render={ (props) => <MyAccount { ...props } selectedTab={ ADDRESS_BOOK } /> } />,
            position: 74,
            name: MY_ACCOUNT_ADDRESS
        },
        {
            component: <Route path={ withStoreRegex('/newsletter/manage') } render={ (props) => <MyAccount { ...props } selectedTab={ NEWSLETTER_SUBSCRIPTION } /> } />,
            position: 75,
            name: MY_ACCOUNT_NEWSLETTER
        },
        {
            component: <Route path={ withStoreRegex('/customer/account/:tab?') } render={ (props) => <MyAccount { ...props } /> } />,
            position: 76,
            name: MY_ACCOUNT
        },
        {
            component: <Route path={ withStoreRegex('/menu') } render={ (props) => <MenuPage { ...props } /> } />,
            position: 80,
            name: MENU
        },
        {
            component: <Route path={ withStoreRegex('/wishlist/shared/:code') } render={ (props) => <WishlistShared { ...props } /> } />,
            position: 81,
            name: SHARED_WISHLIST
        },
        {
            component: <Route path={ withStoreRegex('/contact') } render={ (props) => <ContactPage { ...props } /> } />,
            position: 82,
            name: CONTACT_PAGE
        },
        {
            component: <Route path={ withStoreRegex('/compare') } render={ (props) => <ProductComparePage { ...props } /> } />,
            position: 83,
            name: COMPARE
        },
        {
            component: <Route path={ withStoreRegex('/styleguide') } render={ (props) => <StyleGuidePage { ...props } /> } />,
            position: 84,
            name: STYLE_GUIDE
        },
        {
            component: <Route render={ (props) => <UrlRewrites { ...props } /> } />,
            position: 1000,
            name: URL_REWRITES
        }
    ];

    [AFTER_ITEMS_TYPE] = [
        {
            component: <Footer />,
            position: 10,
            name: FOOTER
        },
        {
            component: <CookiePopup />,
            position: 20,
            name: COOKIE_POPUP
        }
    ];

    state = {
        hasError: false,
        errorDetails: {}
    };

    componentDidCatch(err, info) {
        this.setState({
            hasError: true,
            errorDetails: { err, info }
        });
    }

    getSortedItems(type) {
        return this[type].sort(
            (a, b) => a.position - b.position
        ).filter(
            (entry) => {
                if (!entry.component) {
                    // eslint-disable-next-line no-console
                    console.warn('There is an item without a component property declared in main router.');

                    return false;
                }

                return true;
            }
        );
    }

    handleErrorReset() {
        this.setState({ hasError: false });
    }

    renderComponentsOfType(type) {
        return this.getSortedItems(type)
            .map(({ position, component }) => cloneElement(component, { key: position }));
    }

    renderSectionOfType(type) {
        return (
            <Suspense fallback={ <Loader isLoading /> }>
                { this.renderComponentsOfType(type) }
            </Suspense>
        );
    }

    renderMainItems() {
        const { isBigOffline } = this.props;

        if (!navigator.onLine && isBigOffline) {
            return <OfflineNotice isPage />;
        }

        return (
            <Switch>
                { this.renderComponentsOfType(SWITCH_ITEMS_TYPE) }
            </Switch>
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

    renderFallbackPage() {
        return (
            <main style={ { height: '100vh' } }>
                <Loader isLoading />
            </main>
        );
    }

    renderDefaultRouterContent() {
        if (location.pathname.match('/styleguide')) {
            return this.renderMainItems();
        }

        return (
            <>
                { this.renderSectionOfType(BEFORE_ITEMS_TYPE) }
                { this.renderMainItems() }
                { this.renderSectionOfType(AFTER_ITEMS_TYPE) }
            </>
        );
    }

    renderRouterContent() {
        const { hasError } = this.state;

        if (hasError) {
            return this.renderErrorRouterContent();
        }

        return this.renderDefaultRouterContent();
    }

    render() {
        return (
            <>
                <Meta />
                <Suspense fallback={ this.renderFallbackPage() }>
                    <ReactRouter history={ history }>
                        { this.renderRouterContent() }
                    </ReactRouter>
                </Suspense>
            </>
        );
    }
}

export default Router;
