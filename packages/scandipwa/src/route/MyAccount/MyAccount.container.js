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
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { CUSTOMER_ACCOUNT, CUSTOMER_ACCOUNT_PAGE, CUSTOMER_WISHLIST } from 'Component/Header/Header.config';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import OrderReducer from 'Store/Order/Order.reducer';
import { toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import {
    ACCOUNT_INFORMATION,
    ADDRESS_BOOK,
    FIRST_SECTION,
    MY_ACCOUNT, MY_DOWNLOADABLE, MY_ORDERS,
    MY_WISHLIST, NEWSLETTER_SUBSCRIPTION,
    SECOND_SECTION, THIRD_SECTION
} from 'Type/Account.type';
import { ItemType } from 'Type/ProductList.type';
import { LocationType, MatchType } from 'Type/Router.type';
import { isSignedIn } from 'Util/Auth';
import { scrollToTop } from 'Util/Browser';
import { withReducers } from 'Util/DynamicReducer';
import history from 'Util/History';
import { appendWithStoreCode, replace } from 'Util/Url';

import MyAccount from './MyAccount.component';
import { ACCOUNT_LOGIN_URL, ACCOUNT_URL } from './MyAccount.config';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Route/MyAccount/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile,
    isWishlistEnabled: state.ConfigReducer.wishlist_general_active,
    wishlistItems: state.WishlistReducer.productsInWishlist,
    IsSignedInFromState: state.MyAccountReducer.isSignedIn,
    newsletterActive: state.ConfigReducer.newsletter_general_active,
    baseLinkUrl: state.ConfigReducer.base_link_url
});

/** @namespace Route/MyAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
    ),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    requestCustomerData: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestCustomerData(dispatch)
    ),
    toggleOverlayByKey: (key) => dispatch(toggleOverlayByKey(key)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Route/MyAccount/Container */
export class MyAccountContainer extends PureComponent {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired,
        requestCustomerData: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        toggleOverlayByKey: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        match: MatchType.isRequired,
        location: LocationType.isRequired,
        isMobile: PropTypes.bool.isRequired,
        wishlistItems: PropTypes.objectOf(ItemType),
        newsletterActive: PropTypes.bool.isRequired,
        isWishlistEnabled: PropTypes.bool.isRequired,
        IsSignedInFromState: PropTypes.bool.isRequired,
        baseLinkUrl: PropTypes.string.isRequired,
        showNotification: PropTypes.func.isRequired,
        selectedTab: PropTypes.string
    };

    static defaultProps = {
        wishlistItems: {},
        selectedTab: null
    };

    static tabMap = {
        [MY_ACCOUNT]: {
            url: '',
            tabName: __('My Account'),
            section: FIRST_SECTION
        },
        [MY_ORDERS]: {
            url: '/sales/order/history',
            tabName: __('My Orders'),
            section: FIRST_SECTION,
            isFullUrl: true
        },
        [MY_DOWNLOADABLE]: {
            url: '/downloadable/customer/products',
            tabName: __('My Downloadable'),
            section: FIRST_SECTION,
            isFullUrl: true
        },
        [MY_WISHLIST]: {
            url: '/wishlist',
            tabName: __('My Wish List'),
            section: FIRST_SECTION,
            isFullUrl: true
        },
        [ADDRESS_BOOK]: {
            url: '/customer/address',
            tabName: __('Address Book'),
            section: SECOND_SECTION,
            isFullUrl: true
        },
        [ACCOUNT_INFORMATION]: {
            url: '/edit',
            tabName: __('Account Information'),
            title: __('Edit Account Information'),
            section: SECOND_SECTION
        },
        [NEWSLETTER_SUBSCRIPTION]: {
            url: '/newsletter/manage',
            tabName: __('Newsletter Subscription'),
            section: THIRD_SECTION,
            isFullUrl: true
        }
    };

    static isTabEnabled(props, tabName) {
        const { isWishlistEnabled, newsletterActive } = props;

        switch (tabName) {
        case MY_WISHLIST:
            return isWishlistEnabled;
        case NEWSLETTER_SUBSCRIPTION:
            return newsletterActive;
        default:
            return true;
        }
    }

    static navigateToSelectedTab(props, state = {}) {
        const {
            match: {
                params: {
                    tab: historyActiveTab
                } = {}
            } = {},
            isMobile,
            selectedTab
        } = props;
        const { activeTab } = state;

        if (this.tabMap[selectedTab] && isSignedIn()) {
            return { activeTab: selectedTab };
        }

        // redirect to Dashboard, if user visited non-existent or disabled page
        const newActiveTab = this.tabMap[historyActiveTab] && this.isTabEnabled(props, historyActiveTab)
            ? historyActiveTab
            : MY_ACCOUNT;
        const { url: activeTabUrl } = this.tabMap[newActiveTab];

        if (historyActiveTab !== newActiveTab && activeTab !== MY_ACCOUNT && isSignedIn() && !isMobile) {
            history.push(appendWithStoreCode(`${ ACCOUNT_URL }${ activeTabUrl }`));
        }

        if (activeTab !== newActiveTab) {
            return { activeTab: newActiveTab };
        }

        return null;
    }

    containerFunctions = {
        changeActiveTab: this.changeActiveTab.bind(this),
        changeTabName: this.changeTabName.bind(this),
        onSignIn: this.onSignIn.bind(this),
        onSignOut: this.onSignOut.bind(this),
        getMyWishlistSubHeading: this.getMyWishlistSubHeading.bind(this),
        setTabSubheading: this.setTabSubheading.bind(this)
    };

    subHeadingRenderMap = {
        [MY_WISHLIST]: this.getMyWishlistSubHeading.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        const {
            updateMeta,
            toggleOverlayByKey
        } = this.props;

        this.state = {
            ...MyAccountContainer.navigateToSelectedTab(this.props),
            isEditingActive: false,
            tabName: '',
            stateSubHeading: ''
        };

        if (!isSignedIn()) {
            toggleOverlayByKey(CUSTOMER_ACCOUNT);
        }

        updateMeta({ title: __('My account') });

        this.redirectIfNotSignedIn();
        this.onSignIn();
        this.updateBreadcrumbs();
        scrollToTop();
    }

    static getDerivedStateFromProps(props, state) {
        return MyAccountContainer.navigateToSelectedTab(props, state);
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            wishlistItems: prevWishlistItems,
            IsSignedInFromState: prevIsSignedInFromState
        } = prevProps;

        const {
            wishlistItems,
            IsSignedInFromState: currIsSignedInFromState
        } = this.props;

        const { activeTab: prevActiveTab } = prevState;
        const { activeTab } = this.state;

        this.redirectIfNotSignedIn();

        if (prevIsSignedInFromState !== currIsSignedInFromState) {
            this.changeMyAccountHeaderState();
        }

        if (prevActiveTab !== activeTab) {
            this.updateBreadcrumbs();
            this.changeMyAccountHeaderState();

            scrollToTop();
        }

        if (Object.keys(wishlistItems).length !== Object.keys(prevWishlistItems).length) {
            this.changeMyAccountHeaderState();
        }

        if (!isSignedIn()) {
            this.changeMyAccountHeaderState();
        }
    }

    containerProps() {
        const { location, match } = this.props;
        const { activeTab, isEditingActive } = this.state;

        return {
            activeTab,
            isEditingActive,
            location,
            match,
            tabName: this.getTabName(),
            subHeading: this.getSubHeading()
        };
    }

    // #region GETTERS
    getSubHeading() {
        const { activeTab, stateSubHeading } = this.state;

        const subHeadingFunc = this.subHeadingRenderMap[activeTab];

        if (!subHeadingFunc) {
            return stateSubHeading;
        }

        return subHeadingFunc();
    }

    getTabName() {
        const { location: { pathname } } = this.props;
        const { tabName: stateTabName, activeTab } = this.state;
        const { tabName, url } = MyAccountContainer.tabMap[activeTab];

        if (!pathname.includes(url)) {
            return stateTabName;
        }

        return tabName;
    }

    getMyWishlistSubHeading() {
        const count = this.getWishlistItemsCount();

        return ` (${ count })`;
    }

    getWishlistItemsCount() {
        const { wishlistItems } = this.props;

        const { length } = Object.keys(wishlistItems);

        return length;
    }

    getMyWishlistHeaderTitle() {
        const count = this.getWishlistItemsCount();

        return `${ count } ${ count === 1 ? __('item') : __('items') }`;
    }
    // #endregion

    // #region HANDLE TABS
    setTabSubheading(subHeading) {
        this.setState({ stateSubHeading: subHeading });
    }

    isTabEnabled(tabName) {
        const { isWishlistEnabled, newsletterActive } = this.props;

        switch (tabName) {
        case MY_WISHLIST:
            return isWishlistEnabled;
        case NEWSLETTER_SUBSCRIPTION:
            return newsletterActive;
        default:
            return true;
        }
    }

    tabsFilterEnabled() {
        return Object.fromEntries(Object.entries(MyAccountContainer.tabMap)
            .filter(([tabName]) => this.isTabEnabled(this.props, tabName)));
    }

    changeActiveTab(activeTab) {
        const {
            [activeTab]: {
                url,
                isFullUrl = false
            }
        } = this.tabsFilterEnabled(MyAccountContainer.tabMap);

        if (isFullUrl) {
            history.push(appendWithStoreCode(url));
        } else {
            history.push(appendWithStoreCode(`${ ACCOUNT_URL }${ url }`));
        }

        this.changeMyAccountHeaderState();
    }

    handleCheckIfSelectedTab() {
        const {
            selectedTab,
            location: { pathname = '' }
        } = this.props;

        if (selectedTab) {
            return true;
        }

        return Object.values(MyAccountContainer.tabMap)
            .find(({ url }) => pathname.includes(url));
    }
    // #endregion

    // #region EVENT
    onSignOut() {
        const { toggleOverlayByKey } = this.props;
        this.setState({ activeTab: MY_ACCOUNT });
        toggleOverlayByKey(CUSTOMER_ACCOUNT);
        history.replace(appendWithStoreCode('/'));
    }

    onSignIn() {
        const { requestCustomerData } = this.props;

        if (isSignedIn()) {
            requestCustomerData();
        }

        this.changeMyAccountHeaderState();
    }

    changeMyAccountHeaderState() {
        const { changeHeaderState } = this.props;
        const { activeTab } = this.state;
        const isActiveTabWishList = activeTab === MY_WISHLIST;

        changeHeaderState({
            title: isActiveTabWishList ? this.getMyWishlistHeaderTitle() : __('My account'),
            name: isActiveTabWishList ? CUSTOMER_WISHLIST : CUSTOMER_ACCOUNT_PAGE,
            onBackClick: () => {
                history.push(appendWithStoreCode('/'));
            }
        });
    }

    changeHeaderState(activeTabParam) {
        const { activeTab: activeTabState } = this.state;
        const activeTab = activeTabParam || activeTabState;

        if (activeTab !== MY_WISHLIST) {
            this.changeDefaultHeaderState();

            return;
        }

        this.changeWishlistHeaderState();
    }

    changeTabName(newTabName) {
        this.setState({ tabName: newTabName });
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const { activeTab } = this.state;
        const { url, tabName, isFullUrl } = MyAccountContainer.tabMap[activeTab];
        const breadcrumbs = [];

        if (activeTab !== MY_ACCOUNT) {
            breadcrumbs.push({
                url: isFullUrl ? url : `${ ACCOUNT_URL }${ url }`,
                name: tabName
            });
        }

        breadcrumbs.push({ name: __('My Account'), url: ACCOUNT_URL });

        updateBreadcrumbs(breadcrumbs);
    }

    redirectIfNotSignedIn() {
        const {
            isMobile,
            baseLinkUrl,
            showNotification
        } = this.props;

        if (isSignedIn()) { // do nothing for signed-in users
            return;
        }

        if (isMobile) { // do not redirect on mobile
            return;
        }

        if (this.handleCheckIfSelectedTab()) { // do redirect if it is customer url
            history.replace({ pathname: ACCOUNT_LOGIN_URL });
        }

        const path = baseLinkUrl
            ? appendWithStoreCode(ACCOUNT_LOGIN_URL)
            : replace(/\/customer\/account\/?.*/i, ACCOUNT_LOGIN_URL);

        history.replace({ pathname: path });
        showNotification('info', __('Please, sign in to access this page contents!'));
    }
    // #endregion

    render() {
        return (
            <MyAccount
              { ...this.containerProps() }
              { ...this.containerFunctions }
              tabMap={ this.tabsFilterEnabled(MyAccountContainer.tabMap) }
            />
        );
    }
}

export default withRouter(withReducers({
    OrderReducer
})(connect(mapStateToProps, mapDispatchToProps)(MyAccountContainer)));
