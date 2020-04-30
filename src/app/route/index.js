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

import {
    PureComponent,
    cloneElement,
    lazy,
    Suspense
} from 'react';

import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import { updateMeta } from 'Store/Meta';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';

import Store from 'Store';
import Meta from 'Component/Meta';
import Footer from 'Component/Footer';
import CookiePopup from 'Component/CookiePopup';
import Header from 'Component/Header';
import { CartDispatcher } from 'Store/Cart';
import DemoNotice from 'Component/DemoNotice';
import { ConfigDispatcher } from 'Store/Config';
import Breadcrumbs from 'Component/Breadcrumbs';
import { WishlistDispatcher } from 'Store/Wishlist';
import OfflineNotice from 'Component/OfflineNotice';
import NavigationTabs from 'Component/NavigationTabs';
import NewVersionPopup from 'Component/NewVersionPopup';
import SomethingWentWrong from 'Route/SomethingWentWrong';
import NotificationList from 'Component/NotificationList';
import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';

// suppress prop-types warning on Route component when using with React.lazy
// until react-router-dom@4.4.0 or higher version released
/* eslint-disable react/forbid-foreign-prop-types */
Route.propTypes.component = PropTypes.oneOfType([
    Route.propTypes.component,
    PropTypes.object
]);
/* eslint-enable react/forbid-foreign-prop-types */

export const CartPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/CartPage'));
export const CategoryPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/CategoryPage'));
export const Checkout = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/Checkout'));
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/CmsPage'));
export const HomePage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/HomePage'));
export const MyAccount = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/MyAccount'));
export const NoMatchHandler = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/NoMatchHandler'));
export const PasswordChangePage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/PasswordChangePage'));
export const ProductPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/ProductPage'));
export const SearchPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/SearchPage'));
export const ConfirmAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/ConfirmAccountPage'));
export const UrlRewrites = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/UrlRewrites'));
export const MenuPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/MenuPage'));

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
            component: <Route path="/menu" component={ MenuPage } />,
            position: 80
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
            <main style={ { height: '100vh' } } />
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
