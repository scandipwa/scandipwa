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

import { connect } from 'react-redux';

import { CART, MY_ACCOUNT } from 'Component/Header/Header.config';
import { NavigationAbstractContainer } from 'Component/NavigationAbstract/NavigationAbstract.container';
import { history as browserHistory } from 'Route';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { BOTTOM_NAVIGATION_TYPE, TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { debounce } from 'Util/Request';
import { appendWithStoreCode } from 'Util/Url';

import NavigationTabs from './NavigationTabs.component';
import {
    ACCOUNT_TAB,
    CART_TAB,
    CHECKOUT_TAB, HOME_TAB,
    MENU_TAB
} from './NavigationTabs.config';

export const mapStateToProps = (state) => ({
    navigationState: state.NavigationReducer[BOTTOM_NAVIGATION_TYPE].navigationState,
    headerState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState,
    cartTotals: state.CartReducer.cartTotals
});

export const mapDispatchToProps = (dispatch) => ({
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setNavigationState: (stateName) => dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, stateName)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(BOTTOM_NAVIGATION_TYPE))
});

export const DEFAULT_NAVIGATION_TABS_STATE = { name: MENU_TAB };

export class NavigationTabsContainer extends NavigationAbstractContainer {
    default_state = DEFAULT_NAVIGATION_TABS_STATE;

    scrollPosition = 0;

    routeMap = {
        '/my-account': { name: ACCOUNT_TAB },
        '/checkout': { name: CHECKOUT_TAB, isHidden: true },
        '/cart': { name: CART_TAB },
        '/': { name: HOME_TAB }
    };

    containerFunctions = {
        onMenuButtonClick: this.onMenuButtonClick.bind(this),
        onMyAccountButtonClick: this.onMyAccountButtonClick.bind(this),
        onMinicartButtonClick: this.onMinicartButtonClick.bind(this),
        onHomeButtonClick: this.onHomeButtonClick.bind(this)
    };

    componentDidMount() {
        this.handleNavVisibility();

        const SCROLL_DEBOUNCE_DELAY = 10;
        const { name } = this.getNavigationState();
        this.lastSeenMenu = name === MENU_TAB ? 0 : -1;
        window.addEventListener('scroll', debounce(this.handleScroll, SCROLL_DEBOUNCE_DELAY));

        super.componentDidMount();
    }

    componentDidUpdate(prevProps) {
        this.handleNavVisibility();
        this.handleVisibleOnScrollChange(prevProps);
    }

    handleNavVisibility() {
        const { navigationState: { isHidden } } = this.props;

        if (isHidden) {
            document.documentElement.classList.add('hiddenNavigationTabs');
            return;
        }

        document.documentElement.classList.remove('hiddenNavigationTabs');
    }

    handleVisibleOnScrollChange(prevProps) {
        const { navigationState: { isVisibleOnScroll } } = this.props;
        const { navigationState: { isVisibleOnScroll: prevIsVisible } } = prevProps;

        if (isVisibleOnScroll !== prevIsVisible) {
            this.scrollPosition = window.scrollY;
            document.documentElement.classList.remove('hideOnScroll');
        }
    }

    handleNavVisibilityOnScroll(windowY) {
        const ERROR_OFFSET = 10;
        const TOP_MIN_OFFSET = 100;
        const BOTTOM_MIN_OFFSET = 100;

        const doc = document.body;
        const offset = doc.scrollTop + window.innerHeight;
        const height = doc.offsetHeight;

        if (windowY < TOP_MIN_OFFSET) {
            // We are on top
            document.documentElement.classList.remove('hideOnScroll');
            return;
        }

        if (offset >= height - BOTTOM_MIN_OFFSET) {
            // We are on the bottom
            document.documentElement.classList.remove('hideOnScroll');
            return;
        }

        // Scroll is less then min offset
        if (Math.abs(windowY - this.scrollPosition) < ERROR_OFFSET) {
            return;
        }

        if (windowY < this.scrollPosition) {
            // Scrolling UP
            document.documentElement.classList.remove('hideOnScroll');
        } else {
            // Scrolling DOWN
            document.documentElement.classList.add('hideOnScroll');
        }
    }

    handleScroll = () => {
        const { navigationState: { isVisibleOnScroll } } = this.props;
        if (!isVisibleOnScroll) {
            return;
        }

        const windowY = window.scrollY;
        this.handleNavVisibilityOnScroll(windowY);
        this.scrollPosition = windowY;
    };

    onMenuButtonClick() {
        const { navigationState: { name } } = this.props;

        // TODO: resolve issue when coming from CMS page

        if (name === MENU_TAB) { // if we already are in menu
            browserHistory.push(appendWithStoreCode('/menu'));
        } else if (this.lastSeenMenu <= 0) { // if we have not yet seen menu
            browserHistory.push(appendWithStoreCode('/menu'));
        } else { // otherwise go to last remembered category
            browserHistory.go(-this.lastSeenMenu);
        }

        this.lastSeenMenu = 0;
    }

    onMinicartButtonClick() {
        const { pathname } = location;

        if (pathname !== appendWithStoreCode(`/${ CART }`)) {
            browserHistory.push(appendWithStoreCode(`/${ CART }`));
        }
    }

    onMyAccountButtonClick() {
        const { pathname } = location;

        if (pathname !== appendWithStoreCode(`/${ MY_ACCOUNT }`)) {
            browserHistory.push(appendWithStoreCode(`/${ MY_ACCOUNT }`));
        }
    }

    preserveState(name, newName) {
        if (this.lastSeenMenu === -1) {
            return;
        }

        if (newName !== MENU_TAB) {
            this.lastSeenMenu++;
        }

        if (newName === MENU_TAB && name === MENU_TAB) {
            this.lastSeenMenu = 0;
        }
    }

    handleMobileRouteChange(history) {
        const {
            // hideActiveOverlay,
            setNavigationState,
            navigationState: { name }
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

    onHomeButtonClick() {
        const {
            hideActiveOverlay
        } = this.props;

        const { pathname } = location;

        browserHistory.push(appendWithStoreCode('/'));
        hideActiveOverlay();

        if (
            pathname === appendWithStoreCode('/')
            || pathname === '/'
        ) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    render() {
        return (
            <NavigationTabs
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTabsContainer);
