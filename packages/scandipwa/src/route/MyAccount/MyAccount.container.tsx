/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import BreadcrumbsDispatcher from 'Store/Breadcrumbs/Breadcrumbs.dispatcher';
import { updateMeta } from 'Store/Meta/Meta.action';
import { updateIsLocked } from 'Store/MyAccount/MyAccount.action';
import MyAccountDispatcher from 'Store/MyAccount/MyAccount.dispatcher';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import OrderReducer from 'Store/Order/Order.reducer';
import { toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import {
    MyAccountTabs, MyAccountTabsSection,
} from 'Type/Account.type';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { scrollToTop } from 'Util/Browser';
import { withReducers } from 'Util/DynamicReducer';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode, replace } from 'Util/Url';

import MyAccount from './MyAccount.component';
import { AccountPageUrl, LOCKED_ACCOUNT_ERROR_MESSAGE } from './MyAccount.config';
import {
    MyAccountComponentProps,
    MyAccountContainerFunctions,
    MyAccountContainerMapDispatchProps,
    MyAccountContainerMapStateProps,
    MyAccountContainerProps,
    MyAccountContainerState,
    MyAccountTab,
} from './MyAccount.type';

/** @namespace Route/MyAccount/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile,
    isWishlistEnabled: state.ConfigReducer.wishlist_general_active,
    wishlistItems: state.WishlistReducer.productsInWishlist,
    IsSignedInFromState: state.MyAccountReducer.isSignedIn,
    isLocked: state.MyAccountReducer.isLocked,
    newsletterActive: state.ConfigReducer.newsletter_general_active,
    baseLinkUrl: state.ConfigReducer.base_link_url,
    activeOverlay: state.OverlayReducer.activeOverlay,
    headerState: state.NavigationReducer[NavigationType.TOP_NAVIGATION_TYPE].navigationState,
});

/** @namespace Route/MyAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountContainerMapDispatchProps => ({
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.update(breadcrumbs, dispatch),
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state)),
    requestCustomerData: () => MyAccountDispatcher.requestCustomerData(dispatch),
    toggleOverlayByKey: (key) => dispatch(toggleOverlayByKey(key)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    logout: () => MyAccountDispatcher.logout(false, false, dispatch),
    updateIsLocked: (isLocked) => dispatch(updateIsLocked(isLocked)),
});

/** @namespace Route/MyAccount/Container */
export class MyAccountContainer extends PureComponent<
MyAccountContainerProps,
MyAccountContainerState
> {
    static defaultProps: Partial<MyAccountContainerProps> = {
        wishlistItems: {},
        selectedTab: undefined,
    };

    static tabMap: Record<string, MyAccountTab> = {
        [ MyAccountTabs.MY_ACCOUNT ]: {
            url: '',
            tabName: __('My Account'),
            section: MyAccountTabsSection.FIRST_SECTION,
        },
        [ MyAccountTabs.MY_ORDERS ]: {
            url: '/sales/order/history',
            tabName: __('My Orders'),
            section: MyAccountTabsSection.FIRST_SECTION,
            isFullUrl: true,
        },
        [ MyAccountTabs.MY_DOWNLOADABLE ]: {
            url: '/downloadable/customer/products',
            tabName: __('My Downloadable'),
            section: MyAccountTabsSection.FIRST_SECTION,
            isFullUrl: true,
        },
        [ MyAccountTabs.MY_WISHLIST ]: {
            url: '/wishlist',
            tabName: __('My Wish List'),
            section: MyAccountTabsSection.FIRST_SECTION,
            isFullUrl: true,
        },
        [ MyAccountTabs.ADDRESS_BOOK ]: {
            url: '/customer/address',
            tabName: __('Address Book'),
            section: MyAccountTabsSection.SECOND_SECTION,
            isFullUrl: true,
        },
        [ MyAccountTabs.ACCOUNT_INFORMATION ]: {
            url: '/edit',
            tabName: __('Account Information'),
            title: __('Edit Account Information'),
            section: MyAccountTabsSection.SECOND_SECTION,
        },
        [ MyAccountTabs.NEWSLETTER_SUBSCRIPTION ]: {
            url: '/newsletter/manage',
            tabName: __('Newsletter Subscription'),
            section: MyAccountTabsSection.THIRD_SECTION,
            isFullUrl: true,
        },
    };

    static isTabEnabled(props: MyAccountContainerProps, tabName: string): boolean {
        const { isWishlistEnabled, newsletterActive } = props;

        switch (tabName) {
        case MyAccountTabs.MY_WISHLIST:
            return isWishlistEnabled;
        case MyAccountTabs.NEWSLETTER_SUBSCRIPTION:
            return newsletterActive;
        default:
            return true;
        }
    }

    static navigateToSelectedTab(
        props: MyAccountContainerProps,
        state: Partial<MyAccountContainerState> = {},
    ): { activeTab: string } | null {
        const {
            match: {
                params: {
                    tab: historyActiveTab = '',
                } = {},
            } = {},
            isMobile,
            selectedTab,
        } = props;
        const { activeTab } = state;

        if (selectedTab && this.tabMap[ selectedTab ] && isSignedIn()) {
            return { activeTab: selectedTab };
        }

        // redirect to Dashboard, if user visited non-existent or disabled page
        const newActiveTab = this.tabMap[ historyActiveTab ] && MyAccountContainer.isTabEnabled(props, historyActiveTab)
            ? historyActiveTab
            : MyAccountTabs.MY_ACCOUNT;
        const { url: activeTabUrl } = this.tabMap[ newActiveTab ];

        if (historyActiveTab !== newActiveTab && activeTab !== MyAccountTabs.MY_ACCOUNT && isSignedIn() && !isMobile) {
            history.push(appendWithStoreCode(`${AccountPageUrl.ACCOUNT_URL}${activeTabUrl}`));
        }

        if (activeTab !== newActiveTab) {
            return { activeTab: newActiveTab };
        }

        return null;
    }

    state = {
        tabName: '',
        activeTab: '',
        stateSubHeading: '',
        isEditingActive: false,
        ...MyAccountContainer.navigateToSelectedTab(this.props),
    };

    containerFunctions: MyAccountContainerFunctions = {
        changeActiveTab: this.changeActiveTab.bind(this),
        changeTabName: this.changeTabName.bind(this),
        onSignIn: this.onSignIn.bind(this),
        onSignOut: this.onSignOut.bind(this),
        getMyWishlistSubHeading: this.getMyWishlistSubHeading.bind(this),
        setTabSubheading: this.setTabSubheading.bind(this),
        isTabEnabled: this.isTabEnabled.bind(this),
    };

    subHeadingRenderMap: Record<string, () => string> = {
        [ MyAccountTabs.MY_WISHLIST ]: this.getMyWishlistSubHeading.bind(this),
    };

    static getDerivedStateFromProps(
        props: MyAccountContainerProps,
        state: MyAccountContainerState,
    ): { activeTab: string } | null {
        return MyAccountContainer.navigateToSelectedTab(props, state);
    }

    componentDidMount(): void {
        const {
            updateMeta,
            toggleOverlayByKey,
        } = this.props;

        if (!isSignedIn()) {
            toggleOverlayByKey(Page.CUSTOMER_ACCOUNT);
        }

        updateMeta({ title: __('My account') });

        this.redirectIfNotSignedIn();
        this.onSignIn();
        this.updateBreadcrumbs();
        scrollToTop();
    }

    componentDidUpdate(prevProps: MyAccountContainerProps, prevState: MyAccountContainerState): void {
        const {
            wishlistItems: prevWishlistItems,
            IsSignedInFromState: prevIsSignedInFromState,
            headerState: { name: prevName },
        } = prevProps;

        const {
            wishlistItems,
            IsSignedInFromState: currIsSignedInFromState,
            isLocked,
            activeOverlay,
            headerState: { name },
        } = this.props;

        const { activeTab: prevActiveTab } = prevState;
        const { activeTab } = this.state;

        this.redirectIfNotSignedIn();

        if (isLocked) {
            this.handleLocked();
        }

        if (prevIsSignedInFromState !== currIsSignedInFromState) {
            this.changeMyAccountHeaderState();
        }

        if (prevActiveTab !== activeTab) {
            this.updateBreadcrumbs();
            this.changeMyAccountHeaderState();

            scrollToTop();
        }

        if (name !== prevName && name !== Page.CUSTOMER_ORDER && !activeOverlay) {
            this.changeMyAccountHeaderState();
        }

        if (Object.keys(wishlistItems).length !== Object.keys(prevWishlistItems).length) {
            this.changeMyAccountHeaderState();
        }

        if (!isSignedIn()) {
            this.changeMyAccountHeaderState();
        }
    }

    containerProps(): Pick<
    MyAccountComponentProps,
    'activeTab'
    | 'isEditingActive'
    | 'location'
    | 'match'
    | 'tabName'
    | 'tabMap'
    | 'subHeading'
    > {
        const { match } = this.props;
        const { activeTab, isEditingActive } = this.state;
        const { location } = history;

        return {
            activeTab,
            isEditingActive,
            location,
            match,
            tabName: this.getTabName(),
            subHeading: this.getSubHeading(),
            tabMap: this.tabsFilterEnabled(),
        };
    }

    // #region GETTERS
    getSubHeading(): string {
        const { activeTab, stateSubHeading } = this.state;

        const subHeadingFunc = this.subHeadingRenderMap[ activeTab ];

        if (!subHeadingFunc) {
            return stateSubHeading;
        }

        return subHeadingFunc();
    }

    getTabName(): string {
        const { location: { pathname } } = history;
        const { tabName: stateTabName, activeTab } = this.state;
        const { tabName, url } = MyAccountContainer.tabMap[ activeTab ];

        if (!pathname.includes(url)) {
            return stateTabName;
        }

        return tabName;
    }

    getMyWishlistSubHeading(): string {
        const count = this.getWishlistItemsCount();

        return ` (${count})`;
    }

    getWishlistItemsCount(): number {
        const { wishlistItems } = this.props;

        const { length } = Object.keys(wishlistItems);

        return length;
    }

    getMyWishlistHeaderTitle(): string {
        const count = this.getWishlistItemsCount();

        return `${count} ${count === 1 ? __('item') : __('items')}`;
    }
    // #endregion

    // #region HANDLE TABS
    setTabSubheading(subHeading: string): void {
        this.setState({ stateSubHeading: subHeading });
    }

    isTabEnabled(tabName: string): boolean {
        const { isWishlistEnabled, newsletterActive } = this.props;

        switch (tabName) {
        case MyAccountTabs.MY_WISHLIST:
            return isWishlistEnabled;
        case MyAccountTabs.NEWSLETTER_SUBSCRIPTION:
            return newsletterActive;
        default:
            return true;
        }
    }

    tabsFilterEnabled(): Record<string, MyAccountTab> {
        return Object.fromEntries(Object.entries(MyAccountContainer.tabMap)
            .filter(([tabName]) => MyAccountContainer.isTabEnabled(this.props, tabName)));
    }

    changeActiveTab(activeTab: string): void {
        const {
            [ activeTab ]: {
                url,
                isFullUrl = false,
            },
        } = this.tabsFilterEnabled();

        if (isFullUrl) {
            history.push(appendWithStoreCode(url));
        } else {
            history.push(appendWithStoreCode(`${AccountPageUrl.ACCOUNT_URL}${url}`));
        }

        this.changeMyAccountHeaderState();
    }

    handleCheckIfSelectedTab(): boolean | MyAccountTab | undefined {
        const {
            selectedTab,
        } = this.props;
        const { location: { pathname = '' } } = history;

        if (selectedTab) {
            return true;
        }

        return Object.values(MyAccountContainer.tabMap)
            .find(({ url }) => pathname.includes(url));
    }
    // #endregion

    // #region EVENT
    onSignOut(): void {
        const { toggleOverlayByKey } = this.props;

        this.setState({ activeTab: MyAccountTabs.MY_ACCOUNT });
        toggleOverlayByKey(Page.CUSTOMER_ACCOUNT);
        history.replace(appendWithStoreCode('/'));
    }

    onSignIn(): void {
        const {
            requestCustomerData,
        } = this.props;

        if (isSignedIn()) {
            requestCustomerData();
        }

        this.changeMyAccountHeaderState();
    }

    changeMyAccountHeaderState(): void {
        const { changeHeaderState } = this.props;
        const { activeTab } = this.state;
        const isActiveTabWishList = activeTab === MyAccountTabs.MY_WISHLIST;

        changeHeaderState({
            title: isActiveTabWishList ? this.getMyWishlistHeaderTitle() : __('My account'),
            name: isActiveTabWishList ? Page.CUSTOMER_WISHLIST : Page.CUSTOMER_ACCOUNT_PAGE,
            onBackClick: () => {
                history.push(appendWithStoreCode('/'));
            },
        });
    }

    changeTabName(newTabName: string): void {
        this.setState({ tabName: newTabName });
    }

    updateBreadcrumbs(): void {
        const { updateBreadcrumbs } = this.props;
        const { activeTab } = this.state;
        const { url, tabName, isFullUrl } = MyAccountContainer.tabMap[ activeTab ];
        const breadcrumbs = [];

        if (activeTab !== MyAccountTabs.MY_ACCOUNT) {
            breadcrumbs.push({
                url: isFullUrl ? url : `${AccountPageUrl.ACCOUNT_URL}${url}`,
                name: tabName,
            });
        }

        breadcrumbs.push({ name: __('My Account'), url: AccountPageUrl.ACCOUNT_URL });

        updateBreadcrumbs(breadcrumbs);
    }

    redirectIfNotSignedIn(): void {
        const {
            baseLinkUrl,
            showNotification,
        } = this.props;

        if (isSignedIn()) { // do nothing for signed-in users
            return;
        }

        if (this.handleCheckIfSelectedTab()) { // do redirect if it is customer url
            history.replace({ pathname: AccountPageUrl.LOGIN_URL });
        }

        const path = baseLinkUrl
            ? appendWithStoreCode(AccountPageUrl.LOGIN_URL)
            : replace(/\/customer\/account\/?.*/i, AccountPageUrl.LOGIN_URL);

        history.replace({ pathname: path });
        showNotification(NotificationType.INFO, __('Please, sign in to access this page contents!'));
    }

    handleLocked(): void {
        const {
            logout, updateIsLocked, baseLinkUrl, showNotification,
        } = this.props;

        const path = baseLinkUrl
            ? appendWithStoreCode(AccountPageUrl.LOGIN_URL)
            : replace(/\/customer\/account\/?.*/i, AccountPageUrl.LOGIN_URL);

        history.replace({ pathname: path, state: { isFromLocked: true } });
        showNotification(NotificationType.ERROR, LOCKED_ACCOUNT_ERROR_MESSAGE);
        logout();
        updateIsLocked(false);
    }
    // #endregion

    render(): ReactElement {
        return (
            <MyAccount
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default withReducers({
    OrderReducer,
})(connect(mapStateToProps, mapDispatchToProps)(MyAccountContainer));
