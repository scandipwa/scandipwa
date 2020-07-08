/* eslint-disable max-len */
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

// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import {
    cloneElement,
    lazy,
    PureComponent,
    Suspense
} from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
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
import SomethingWentWrong from 'Route/SomethingWentWrong';
import UrlRewrites from 'Route/UrlRewrites';
import { getStore } from 'Store';
import { CartDispatcher } from 'Store/Cart';
import { ConfigDispatcher } from 'Store/Config';
import { updateMeta } from 'Store/Meta';
import { WishlistDispatcher } from 'Store/Wishlist';

// suppress prop-types warning on Route component when using with React.lazy
// until react-router-dom@4.4.0 or higher version released
/* eslint-disable react/forbid-foreign-prop-types */
Route.propTypes.component = PropTypes.oneOfType([
    Route.propTypes.component,
    PropTypes.object
]);
/* eslint-enable react/forbid-foreign-prop-types */

export const CartPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "cart" */ 'Route/CartPage'));
export const CategoryPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "category" */ 'Route/CategoryPage'));
export const Checkout = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "checkout" */ 'Route/Checkout'));
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "cms" */ 'Route/CmsPage'));
export const HomePage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "home" */ 'Route/HomePage'));
export const MyAccount = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "account" */ 'Route/MyAccount'));
export const NoMatchHandler = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "no-match" */ 'Route/NoMatchHandler'));
export const PasswordChangePage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "misc" */ 'Route/PasswordChangePage'));
export const ProductPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "product" */ 'Route/ProductPage'));
export const SearchPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "category" */ 'Route/SearchPage'));
export const ConfirmAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "misc" */ 'Route/ConfirmAccountPage'));
export const MenuPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "menu" */ 'Route/MenuPage'));
export const WishlistShared = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "misc" */ 'Route/WishlistSharedPage'));

export const BEFORE_ITEMS_TYPE = 'BEFORE_ITEMS_TYPE';
export const SWITCH_ITEMS_TYPE = 'SWITCH_ITEMS_TYPE';
export const AFTER_ITEMS_TYPE = 'AFTER_ITEMS_TYPE';

export const history = createBrowserHistory({ basename: '/' });

export const mapStateToProps = state => ({
    isLoading: state.ConfigReducer.isLoading,
    default_description: state.ConfigReducer.default_description,
    default_keywords: state.ConfigReducer.default_keywords,
    default_title: state.ConfigReducer.default_title,
    title_prefix: state.ConfigReducer.title_prefix,
    title_suffix: state.ConfigReducer.title_suffix,
    isOffline: state.OfflineReducer.isOffline,
    isBigOffline: state.OfflineReducer.isBig
});

export const mapDispatchToProps = dispatch => ({
    updateMeta: meta => dispatch(updateMeta(meta))
});

export class AppRouter extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        default_description: PropTypes.string,
        default_keywords: PropTypes.string,
        default_title: PropTypes.string,
        title_prefix: PropTypes.string,
        title_suffix: PropTypes.string,
        isLoading: PropTypes.bool,
        isBigOffline: PropTypes.bool
    };

    static defaultProps = {
        default_description: '',
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
            component: <Route path="/" exact component={ HomePage } />,
            position: 10
        },
        {
            component: <Route path="/category" component={ CategoryPage } />,
            position: 20
        },
        {
            component: <Route path="/search/:query/" component={ SearchPage } />,
            position: 25
        },
        {
            component: <Route path="/product" component={ ProductPage } />,
            position: 30
        },
        {
            component: <Route path="/page" component={ CmsPage } />,
            position: 40
        },
        {
            component: <Route path="/cart" exact component={ CartPage } />,
            position: 50
        },
        {
            component: <Route path="/checkout/:step?" component={ Checkout } />,
            position: 55
        },
        {
            component: <Route path="/:account*/createPassword/" component={ PasswordChangePage } />,
            position: 60
        },
        {
            component: <Route path="/:account*/confirm" component={ ConfirmAccountPage } />,
            position: 65
        },
        {
            component: <Route path="/my-account/:tab?" component={ MyAccount } />,
            position: 70
        },
        {
            component: <Route path="/forgot-password" component={ MyAccount } />,
            position: 71
        },
        {
            component: <Route path="/menu" component={ MenuPage } />,
            position: 80
        },
        {
            component: <Route path="/wishlist/shared/:code" component={ WishlistShared } />,
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

    constructor(props) {
        super(props);

        this.dispatchActions();
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

    dispatchActions() {
        const { dispatch } = getStore();
        WishlistDispatcher.updateInitialWishlistData(dispatch);
        CartDispatcher.updateInitialCartData(dispatch);
        ConfigDispatcher.handleData(dispatch);
    }

    renderItemsOfType(type) {
        return Object.entries(this.getSortedItems(type)).map(
            ([key, component]) => cloneElement(component, { key })
        );
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
                <Router history={ history }>
                    { this.renderRouterContent() }
                </Router>
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
