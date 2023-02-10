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

import { Location } from 'history';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import { NavigationAbstractContainer } from 'Component/NavigationAbstract/NavigationAbstract.container';
import { NavigationAbstractContainerState } from 'Component/NavigationAbstract/NavigationAbstract.type';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationState, NavigationType } from 'Store/Navigation/Navigation.type';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth/IsSignedIn';
import { scrollToTop } from 'Util/Browser';
import browserHistory from 'Util/History';
import { debounce } from 'Util/Request/Debounce';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import NavigationTabs from './NavigationTabs.component';
import { NavigationTabsMap } from './NavigationTabs.config';
import {
    NavigationTabsComponentProps,
    NavigationTabsContainerFunctions,
    NavigationTabsContainerMapDispatchProps,
    NavigationTabsContainerMapStateProps,
    NavigationTabsContainerProps,
    NavigationTabsContainerPropsKeys,
} from './NavigationTabs.type';

/** @namespace Component/NavigationTabs/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): NavigationTabsContainerMapStateProps => ({
    navigationState: state.NavigationReducer[ NavigationType.BOTTOM_NAVIGATION_TYPE ].navigationState,
    headerState: state.NavigationReducer[ NavigationType.TOP_NAVIGATION_TYPE ].navigationState,
    device: state.ConfigReducer.device,
    cartTotals: state.CartReducer.cartTotals,
    noMatch: state.NoMatchReducer.noMatch,
});

/** @namespace Component/NavigationTabs/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): NavigationTabsContainerMapDispatchProps => ({
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setNavigationState: (stateName) => dispatch(
        changeNavigationState(NavigationType.BOTTOM_NAVIGATION_TYPE, stateName),
    ),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(NavigationType.TOP_NAVIGATION_TYPE)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(NavigationType.BOTTOM_NAVIGATION_TYPE)),
});

export const DEFAULT_NAVIGATION_TABS_STATE = { name: NavigationTabsMap.MENU_TAB };

/** @namespace Component/NavigationTabs/Container */
export class NavigationTabsContainer extends NavigationAbstractContainer<
NavigationTabsContainerProps,
NavigationAbstractContainerState
> {
    default_state = DEFAULT_NAVIGATION_TABS_STATE;

    scrollPosition = 0;

    lastSeenMenu = 0;

    routeMap: Record<string, NavigationState> = {
        '/customer/account': { name: NavigationTabsMap.ACCOUNT_TAB },
        '/sales/order/history': { name: NavigationTabsMap.ACCOUNT_TAB },
        '/downloadable/customer/products': { name: NavigationTabsMap.ACCOUNT_TAB },
        '/customer/address': { name: NavigationTabsMap.ACCOUNT_TAB },
        '/newsletter/manage': { name: NavigationTabsMap.ACCOUNT_TAB },
        '/sales/order/view': { name: NavigationTabsMap.ACCOUNT_TAB },
        '/wishlist': { name: NavigationTabsMap.ACCOUNT_TAB },
        '/checkout': { name: NavigationTabsMap.CHECKOUT_TAB },
        '/cart': { name: NavigationTabsMap.CART_TAB },
        '/': { name: NavigationTabsMap.HOME_TAB },
        '': { name: NavigationTabsMap.HOME_TAB },
    };

    containerFunctions: NavigationTabsContainerFunctions = {
        onMenuButtonClick: this.onMenuButtonClick.bind(this),
        onMyAccountButtonClick: this.onMyAccountButtonClick.bind(this),
        onMinicartButtonClick: this.onMinicartButtonClick.bind(this),
        onHomeButtonClick: this.onHomeButtonClick.bind(this),
    };

    componentDidMount(): void {
        this.handleNavVisibility();

        const SCROLL_DEBOUNCE_DELAY = 10;
        const { name } = this.getNavigationState();

        this.lastSeenMenu = name === NavigationTabsMap.MENU_TAB ? 0 : -1;
        window.addEventListener(
            'scroll',
            debounce(this.handleScroll.bind(this), SCROLL_DEBOUNCE_DELAY) as EventListenerOrEventListenerObject,
        );

        super.componentDidMount();
    }

    componentDidUpdate(prevProps: NavigationTabsContainerProps): void {
        const { navigationState: { isHidden } } = this.props;
        const { navigationState: { isHidden: prevHidden } } = prevProps;

        if (isHidden !== prevHidden) {
            this.handleNavVisibility();
        }
    }

    containerProps(): Pick<NavigationTabsComponentProps, NavigationTabsContainerPropsKeys> {
        const { device, navigationState, cartTotals } = this.props;

        return { device, navigationState, cartTotals };
    }

    handleNavVisibility(): void {
        const { navigationState: { isHidden } } = this.props;

        if (isHidden) {
            document.documentElement.classList.add('hiddenNavigationTabs');

            return;
        }

        document.documentElement.classList.remove('hiddenNavigationTabs');
    }

    hideNavigationTabs(): void {
        document.documentElement.classList.add('hideOnScroll');
    }

    showNavigationTabs(): void {
        document.documentElement.classList.remove('hideOnScroll');
    }

    handleNavVisibilityOnScroll(windowY: number): void {
        const ERROR_TOP_OFFSET = 10;
        const ERROR_BOTTOM_OFFSET = 20;
        const TOP_MIN_OFFSET = 70;

        const doc = document.body;
        const offset = window.innerHeight + window.pageYOffset;
        const height = doc.scrollHeight;

        if (windowY < TOP_MIN_OFFSET) {
            // We are on top
            this.showNavigationTabs();

            return;
        }

        if (offset >= (height - ERROR_BOTTOM_OFFSET)) {
            // We are on the bottom
            this.showNavigationTabs();

            return;
        }

        // Scroll is less then min offset
        if (Math.abs(windowY - this.scrollPosition) < ERROR_TOP_OFFSET) {
            return;
        }

        if (windowY < this.scrollPosition) {
            // Scrolling UP
            this.showNavigationTabs();
        } else {
            // Scrolling DOWN
            this.hideNavigationTabs();
        }
    }

    handleScroll(): void {
        const windowY = window.pageYOffset;

        this.handleNavVisibilityOnScroll(windowY);
        this.scrollPosition = windowY;
    }

    onMenuButtonClick(): void {
        const { navigationState: { name } } = this.props;

        // TODO: resolve issue when coming from CMS page

        if (name === NavigationTabsMap.MENU_TAB) { // if we already are in menu
            browserHistory.push(appendWithStoreCode('/menu'));
        } else if (this.lastSeenMenu <= 0) { // if we have not yet seen menu
            browserHistory.push(appendWithStoreCode('/menu'));
        } else { // otherwise go to last remembered category
            browserHistory.go(-this.lastSeenMenu);
        }

        this.lastSeenMenu = 0;
    }

    onMinicartButtonClick(): void {
        const { pathname } = location;

        if (pathname !== appendWithStoreCode(`/${Page.CART}`)) {
            scrollToTop();
            browserHistory.push(appendWithStoreCode(`/${Page.CART}`));
        }
    }

    onMyAccountButtonClick(): void {
        const { pathname } = location;
        const url = appendWithStoreCode(isSignedIn() ? `${AccountPageUrl.ACCOUNT_URL}` : AccountPageUrl.LOGIN_URL);

        if (pathname !== url) {
            browserHistory.push(url);
        }
    }

    preserveState(name: string, newName: string): void {
        const { noMatch } = this.props;

        if (noMatch) {
            this.lastSeenMenu = -1;

            return;
        }

        if (this.lastSeenMenu === -1) {
            return;
        }

        if (newName !== NavigationTabsMap.MENU_TAB) {
            this.lastSeenMenu++;
        }

        if (newName === NavigationTabsMap.MENU_TAB && name === NavigationTabsMap.MENU_TAB) {
            this.lastSeenMenu = 0;
        }
    }

    handleMobileRouteChange(history: Location): { prevPathname: string } {
        const {
            setNavigationState,
            navigationState: { name },
        } = this.props;

        const { pathname } = history;

        // Find the new state name
        const newNavigationState = this.getNavigationState();
        const { name: newName } = newNavigationState;

        // Update the state if new name is set
        if (name !== newName) {
            setNavigationState(newNavigationState);
        }

        this.preserveState(name, newName);

        return { prevPathname: pathname };
    }

    onHomeButtonClick(): void {
        const {
            hideActiveOverlay,
        } = this.props;

        const { pathname } = location;

        browserHistory.push(appendWithStoreCode('/'));
        hideActiveOverlay();

        if (pathname === appendWithStoreCode('/') || pathname === '/') {
            scrollToTop({ behavior: 'smooth' });
        }
    }

    render(): ReactElement {
        return (
            <NavigationTabs
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTabsContainer);
