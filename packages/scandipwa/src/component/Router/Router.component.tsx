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

// import PropTypes from 'prop-types';
import {
    cloneElement,
    ErrorInfo,
    // ErrorInfo,
    lazy,
    // PureComponent,
    Suspense
} from 'react';
import { Router as ReactRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import Breadcrumbs from 'Component/Breadcrumbs';
import Loader from 'Component/Loader';
import Meta from 'Component/Meta';
import { UrlRewrites } from 'Component/UrlRewrites';
import history from 'Util/History';
import { SimpleComponent } from 'Util/SimpleComponent';

import {
    // ACCOUNT_FORGOT_PASSWORD,
    AFTER_ITEMS_TYPE,
    BEFORE_ITEMS_TYPE,
    BREADCRUMBS,
    // CART,
    // CHANGE_PASSWORD,
    // CHECKOUT,
    // CMS_PAGE,
    // COMPARE,
    // CONFIRM_ACCOUNT,
    // CONTACT_PAGE,
    COOKIE_POPUP,
    // CREATE_ACCOUNT,
    DEMO_NOTICE,
    FOOTER,
    // FORGOT_PASSWORD,
    HEADER,
    HOME,
    // LOGIN,
    // MENU,
    // MY_ACCOUNT,
    NAVIGATION_TABS,
    NEW_VERSION_POPUP,
    NOTIFICATION_LIST,
    // SEARCH,
    // SHARED_WISHLIST,
    // STYLE_GUIDE,
    SWITCH_ITEMS_TYPE,
    URL_REWRITES
} from './Router.config';

export const CartPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cart" */ 'Component/CartPage'));
export const Checkout = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "checkout" */ 'Component/Checkout'));
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Component/CmsPage'));
export const CookiePopup = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ 'Component/CookiePopup'));
export const DemoNotice = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ 'Component/DemoNotice'));
export const Header = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "header" */ 'Component/Header'));
export const HomePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Component/HomePage'));
export const MyAccount = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "account" */ 'Component/MyAccount'));
export const PasswordChangePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Component/PasswordChangePage'));
export const SearchPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "search" */ 'Component/SearchPage'));
export const ConfirmAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Component/ConfirmAccountPage'));
export const MenuPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Component/MenuPage'));
export const Footer = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "footer" */ 'Component/Footer'));
export const NavigationTabs = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "header" */ 'Component/NavigationTabs'));
export const NewVersionPopup = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ 'Component/NewVersionPopup'));
export const NotificationList = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ 'Component/NotificationList'));
export const WishlistShared = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Component/WishlistSharedPage'));
export const OfflineNotice = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ 'Component/OfflineNotice'));
export const ContactPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "contact" */ 'Component/ContactPage'));
export const ProductComparePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Component/ProductComparePage'));
export const CreateAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Component/CreateAccount'));
export const LoginAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Component/LoginAccount'));
export const ForgotPasswordPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Component/ForgotPassword'));
export const SomethingWentWrong = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "something-went-wrong" */ 'Component/SomethingWentWrong'));
export const StyleGuidePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Component/StyleGuidePage'));

/** @namespace Component/Router/Component/withStoreRegex */
export const withStoreRegex = (path: string): string => window.storeRegexText.concat(path);

export interface RouterProps {
    isBigOffline: boolean // what is it?
    setHasError: (bool: boolean) => void;
    hasError: boolean
    errorDetails?: { error: Error, errorInfo: ErrorInfo }
}

type ItemsType = typeof BEFORE_ITEMS_TYPE | typeof SWITCH_ITEMS_TYPE | typeof AFTER_ITEMS_TYPE

/** @namespace Component/Router/Component */
export class RouterComponent extends SimpleComponent<RouterProps> {
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
            component: <Route path={ withStoreRegex('/') } exact render={ ({ match }) => <HomePage match={ match } /> } />,
            position: 10,
            name: HOME
        },
        // {
        //     component: <Route path={ withStoreRegex('/search/:query/') } render={ () => <SearchPage /> } />,
        //     position: 25,
        //     name: SEARCH
        // },
        // {
        //     component: <Route path={ withStoreRegex('/page') } render={ () => <CmsPage /> } />,
        //     position: 40,
        //     name: CMS_PAGE
        // },
        // {
        //     component: <Route path={ withStoreRegex('/cart') } exact render={ () => <CartPage /> } />,
        //     position: 50,
        //     name: CART
        // },
        // {
        //     component: <Route path={ withStoreRegex('/checkout/:step?') } render={ () => <CheckoutButtons /> } />,
        //     position: 55,
        //     name: CHECKOUT
        // },
        // {
        //     component: <Route path={ withStoreRegex('/:account*/createPassword/') } render={ () => <PasswordChangePage /> } />,
        //     position: 60,
        //     name: CHANGE_PASSWORD
        // },
        // {
        //     component: <Route path={ withStoreRegex('/:account*/create/') } render={ () => <CreateAccountPage /> } />,
        //     position: 61,
        //     name: CREATE_ACCOUNT
        // },
        // {
        //     component: <Route path={ withStoreRegex('/:account*/login/') } render={ () => <LoginAccountPage /> } />,
        //     position: 62,
        //     name: LOGIN
        // },
        // {
        //     component: <Route path={ withStoreRegex('/:account*/forgotpassword/') } render={ () => <ForgotPasswordPage /> } />,
        //     position: 63,
        //     name: ACCOUNT_FORGOT_PASSWORD
        // },
        // {
        //     component: <Route path={ withStoreRegex('/:account*/confirm') } render={ () => <ConfirmAccountPage /> } />,
        //     position: 65,
        //     name: CONFIRM_ACCOUNT
        // },
        // {
        //     component: <Route path={ withStoreRegex('/my-account/:tab?') } render={ () => <MyAccount /> } />,
        //     position: 70,
        //     name: MY_ACCOUNT
        // },
        // {
        //     component: <Route path={ withStoreRegex('/forgot-password') } render={ () => <MyAccount /> } />,
        //     position: 71,
        //     name: FORGOT_PASSWORD
        // },
        // {
        //     component: <Route path={ withStoreRegex('/menu') } render={ () => <MenuPage /> } />,
        //     position: 80,
        //     name: MENU
        // },
        // {
        //     component: <Route path={ withStoreRegex('/wishlist/shared/:code') } render={ () => <WishlistShared /> } />,
        //     position: 81,
        //     name: SHARED_WISHLIST
        // },
        // {
        //     component: <Route path={ withStoreRegex('/contact') } render={ () => <ContactPage /> } />,
        //     position: 82,
        //     name: CONTACT_PAGE
        // },
        // {
        //     component: <Route path={ withStoreRegex('/compare') } render={ () => <ProductComparePage /> } />,
        //     position: 83,
        //     name: COMPARE
        // },
        // {
        //     component: <Route path={ withStoreRegex('/styleguide') } render={ () => <StyleGuidePage /> } />,
        //     position: 84,
        //     name: STYLE_GUIDE
        // },
        {
            component: <Route render={ ({ match }) => <UrlRewrites match={ match } /> } />,
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

    getSortedItems(type: ItemsType): {
        component: JSX.Element;
        position: number;
        name: string;
    }[] {
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

    handleErrorReset = (): void => {
        this.props.setHasError(false);
    };

    renderComponentsOfType(type: ItemsType): React.FunctionComponentElement<unknown>[] {
        return this.getSortedItems(type)
            .map(({ position, component }) => cloneElement(component, { key: position }));
    }

    renderSectionOfType(type: ItemsType): JSX.Element {
        return (
            <Suspense fallback={ <Loader isLoading /> }>
                { this.renderComponentsOfType(type) }
            </Suspense>
        );
    }

    renderMainItems(): JSX.Element {
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

    renderErrorRouterContent(): JSX.Element {
        const { errorDetails = {} } = this.props;

        return (
            <SomethingWentWrong
              onClick={ this.handleErrorReset }
              errorDetails={ errorDetails }
            />
        );
    }

    renderFallbackPage(): JSX.Element {
        return (
            <main style={ { height: '100vh' } }>
                <Loader isLoading />
            </main>
        );
    }

    renderDefaultRouterContent(): JSX.Element {
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

    renderRouterContent(): JSX.Element {
        const { hasError } = this.props;

        if (hasError) {
            return this.renderErrorRouterContent();
        }

        return this.renderDefaultRouterContent();
    }

    render(): JSX.Element {
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
