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

import Breadcrumbs from '../Breadcrumbs';
import CookiePopup from '../CookiePopup';
import DemoNotice from '../DemoNotice';
import Footer from '../Footer';
import Header from '../Header';
import Loader from '../Loader';
import Meta from '../Meta';
import NavigationTabs from '../NavigationTabs';
import NewVersionPopup from '../NewVersionPopup';
import NotificationList from '../NotificationList';
import OfflineNotice from '../OfflineNotice';
import SomethingWentWrong from '../../../../../../../123/src/app/route/SomethingWentWrong';
import UrlRewrites from '../../../../../../../123/src/app/route/UrlRewrites';
import history from '../../../../../../../123/src/app/util/History';

import {
    AFTER_ITEMS_TYPE,
    BEFORE_ITEMS_TYPE,
    SWITCH_ITEMS_TYPE
} from './Router.config';

export const CartPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cart" */ '../../../../../../../123/src/app/route/CartPage'));
export const Checkout = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "checkout" */ '../../../../../../../123/src/app/route/Checkout'));
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ '../../../../../../../123/src/app/route/CmsPage'));
export const HomePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ '../../../../../../../123/src/app/route/HomePage'));
export const MyAccount = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "account" */ '../../../../../../../123/src/app/route/MyAccount'));
export const PasswordChangePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ '../../../../../../../123/src/app/route/PasswordChangePage'));
export const SearchPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "category" */ '../../../../../../../123/src/app/route/SearchPage'));
export const ConfirmAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ '../../../../../../../123/src/app/route/ConfirmAccountPage'));
export const MenuPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ '../../../../../../../123/src/app/route/MenuPage'));
export const WishlistShared = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ '../../../../../../../123/src/app/route/WishlistSharedPage'));
export const ContactPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "contact" */ '../../../../../../../123/src/app/route/ContactPage'));

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
            position: 10
        },
        {
            component: <DemoNotice />,
            position: 15
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
            component: <NewVersionPopup />,
            position: 35
        }
    ];

    [SWITCH_ITEMS_TYPE] = [
        {
            component: <Route path={ withStoreRegex('/') } exact render={ (props) => <HomePage { ...props } /> } />,
            position: 10
        },
        {
            component: <Route path={ withStoreRegex('/search/:query/') } render={ (props) => <SearchPage { ...props } /> } />,
            position: 25
        },
        {
            component: <Route path={ withStoreRegex('/page') } render={ (props) => <CmsPage { ...props } /> } />,
            position: 40
        },
        {
            component: <Route path={ withStoreRegex('/cart') } exact render={ (props) => <CartPage { ...props } /> } />,
            position: 50
        },
        {
            component: <Route path={ withStoreRegex('/checkout/:step?') } render={ (props) => <Checkout { ...props } /> } />,
            position: 55
        },
        {
            component: <Route path={ withStoreRegex('/:account*/createPassword/') } render={ (props) => <PasswordChangePage { ...props } /> } />,
            position: 60
        },
        {
            component: <Route path={ withStoreRegex('/:account*/confirm') } render={ (props) => <ConfirmAccountPage { ...props } /> } />,
            position: 65
        },
        {
            component: <Route path={ withStoreRegex('/my-account/:tab?') } render={ (props) => <MyAccount { ...props } /> } />,
            position: 70
        },
        {
            component: <Route path={ withStoreRegex('/forgot-password') } render={ (props) => <MyAccount { ...props } /> } />,
            position: 71
        },
        {
            component: <Route path={ withStoreRegex('/menu') } render={ (props) => <MenuPage { ...props } /> } />,
            position: 80
        },
        {
            component: <Route path={ withStoreRegex('/wishlist/shared/:code') } render={ (props) => <WishlistShared { ...props } /> } />,
            position: 81
        },
        {
            component: <Route path={ withStoreRegex('/contact') } render={ (props) => <ContactPage { ...props } /> } />,
            position: 82
        },
        {
            component: <Route render={ (props) => <UrlRewrites { ...props } /> } />,
            position: 1000
        }
    ];

    [AFTER_ITEMS_TYPE] = [
        {
            component: <Footer />,
            position: 10
        },
        {
            component: <CookiePopup />,
            position: 20
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

    handleErrorReset = () => {
        this.setState({ hasError: false });
    };

    renderItemsOfType(type) {
        return this.getSortedItems(type)
            .map(({ position, component }) => cloneElement(component, { key: position }));
    }

    renderMainItems() {
        const { isBigOffline } = this.props;

        if (!navigator.onLine && isBigOffline) {
            return <OfflineNotice isPage />;
        }

        return (
            <Suspense fallback={ this.renderFallbackPage() }>
                <Switch>
                    { this.renderItemsOfType(SWITCH_ITEMS_TYPE) }
                </Switch>
            </Suspense>
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
        return (
            <>
                { this.renderItemsOfType(BEFORE_ITEMS_TYPE) }
                { this.renderMainItems() }
                { this.renderItemsOfType(AFTER_ITEMS_TYPE) }
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
                <ReactRouter history={ history }>
                    { this.renderRouterContent() }
                </ReactRouter>
            </>
        );
    }
}

export default Router;
