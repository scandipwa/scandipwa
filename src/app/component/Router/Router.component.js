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

// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import {
    cloneElement,
    lazy,
    PureComponent,
    Suspense
} from 'react';
import { connect } from 'react-redux';
import { Router as ReactRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import Breadcrumbs from 'Component/Breadcrumbs';
import CookiePopup from 'Component/CookiePopup';
import DemoNotice from 'Component/DemoNotice';
import Footer from 'Component/Footer';
import Header from 'Component/Header';
import Loader from 'Component/Loader';
import Meta from 'Component/Meta';
import NavigationTabs from 'Component/NavigationTabs';
import NewVersionPopup from 'Component/NewVersionPopup';
import NotificationList from 'Component/NotificationList';
import OfflineNotice from 'Component/OfflineNotice';
import NoMatchHandler from 'Route/NoMatchHandler';
import SomethingWentWrong from 'Route/SomethingWentWrong';
import UrlRewrites from 'Route/UrlRewrites';
import { getStore } from 'Store';
import { updateMeta } from 'Store/Meta/Meta.action';
import history from 'Util/History';

import { AFTER_ITEMS_TYPE, BEFORE_ITEMS_TYPE, SWITCH_ITEMS_TYPE } from './Router.config';

export const CartDispatcher = import(/* webpackMode: "lazy", webpackChunkName: "dispatchers" */'Store/Cart/Cart.dispatcher');
export const ConfigDispatcher = import(/* webpackMode: "lazy", webpackChunkName: "dispatchers" */'Store/Config/Config.dispatcher');
export const WishlistDispatcher = import(/* webpackMode: "lazy", webpackChunkName: "dispatchers" */'Store/Wishlist/Wishlist.dispatcher');

export const CartPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cart" */ 'Route/CartPage'));
export const Checkout = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "checkout" */ 'Route/Checkout'));
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/CmsPage'));
export const HomePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/HomePage'));
export const MyAccount = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "account" */ 'Route/MyAccount'));
export const PasswordChangePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Route/PasswordChangePage'));
export const SearchPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "category" */ 'Route/SearchPage'));
export const ConfirmAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/ConfirmAccountPage'));
export const MenuPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/MenuPage'));
export const WishlistShared = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Route/WishlistSharedPage'));

/** @namespace Component/Router/Component/mapStateToProps */
export const mapStateToProps = state => ({
    isLoading: state.ConfigReducer.isLoading,
    default_description: state.ConfigReducer.default_description,
    default_keywords: state.ConfigReducer.default_keywords,
    default_title: state.ConfigReducer.default_title,
    base_link_url: state.ConfigReducer.base_link_url,
    title_prefix: state.ConfigReducer.title_prefix,
    title_suffix: state.ConfigReducer.title_suffix,
    isOffline: state.OfflineReducer.isOffline,
    isBigOffline: state.OfflineReducer.isBig
});

/** @namespace Component/Router/Component/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    updateMeta: meta => dispatch(updateMeta(meta))
});

/** @namespace Component/Router/Component/withStoreRegex */
export const withStoreRegex = path => window.storeRegexText.concat(path);

/** @namespace Component/Router/Component */
export class Router extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        default_description: PropTypes.string,
        base_link_url: PropTypes.string,
        default_keywords: PropTypes.string,
        default_title: PropTypes.string,
        title_prefix: PropTypes.string,
        title_suffix: PropTypes.string,
        isLoading: PropTypes.bool,
        isBigOffline: PropTypes.bool
    };

    static defaultProps = {
        default_description: '',
        base_link_url: '',
        default_keywords: '',
        default_title: '',
        title_prefix: '',
        title_suffix: '',
        isLoading: true,
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
            component: <Route path={ withStoreRegex('/') } exact component={ HomePage } />,
            position: 10
        },
        {
            component: <Route path={ withStoreRegex('/search/:query/') } component={ SearchPage } />,
            position: 25
        },
        {
            component: <Route path={ withStoreRegex('/page') } component={ CmsPage } />,
            position: 40
        },
        {
            component: <Route path={ withStoreRegex('/cart') } exact component={ CartPage } />,
            position: 50
        },
        {
            component: <Route path={ withStoreRegex('/checkout/:step?') } component={ Checkout } />,
            position: 55
        },
        {
            component: <Route path={ withStoreRegex('/:account*/createPassword/') } component={ PasswordChangePage } />,
            position: 60
        },
        {
            component: <Route path={ withStoreRegex('/:account*/confirm') } component={ ConfirmAccountPage } />,
            position: 65
        },
        {
            component: <Route path={ withStoreRegex('/my-account/:tab?') } component={ MyAccount } />,
            position: 70
        },
        {
            component: <Route path={ withStoreRegex('/forgot-password') } component={ MyAccount } />,
            position: 71
        },
        {
            component: <Route path={ withStoreRegex('/menu') } component={ MenuPage } />,
            position: 80
        },
        {
            component: <Route path={ withStoreRegex('/wishlist/shared/:code') } component={ WishlistShared } />,
            position: 81
        },
        {
            component: <Route component={ UrlRewrites } />,
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

    __construct(props) {
        super.__construct(props);

        this.dispatchActions();
        this.redirectFromPartialUrl();
    }

    componentDidUpdate(prevProps) {
        const { isLoading, updateMeta } = this.props;
        const { isLoading: prevIsLoading } = prevProps;

        if (!isLoading && isLoading !== prevIsLoading) {
            const {
                default_description,
                default_keywords,
                default_title,
                title_prefix,
                title_suffix
            } = this.props;

            // TODO: this breaks META always
            updateMeta({
                default_title,
                title: default_title,
                default_description,
                description: default_description,
                default_keywords,
                keywords: default_keywords,
                title_prefix,
                title_suffix
            });
        }
    }

    componentDidCatch(err, info) {
        this.setState({
            hasError: true,
            errorDetails: { err, info }
        });
    }

    redirectFromPartialUrl() {
        const { base_link_url } = this.props;
        const { pathname: storePrefix } = new URL(base_link_url || window.location.origin);
        const { pathname } = location;

        if (storePrefix === '/') {
            return;
        }

        if (storePrefix.slice(0, -1) === pathname) {
            history.replace(storePrefix);
        }
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

    dispatchActions() {
        const { dispatch } = getStore();
        WishlistDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialWishlistData(dispatch)
        );
        CartDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialCartData(dispatch)
        );
        ConfigDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleData(dispatch)
        );
    }

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
                <NoMatchHandler>
                    <Switch>
                        { this.renderItemsOfType(SWITCH_ITEMS_TYPE) }
                    </Switch>
                </NoMatchHandler>
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

export default connect(mapStateToProps, mapDispatchToProps)(Router);
