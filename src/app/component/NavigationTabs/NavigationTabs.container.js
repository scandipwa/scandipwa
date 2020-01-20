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

import { NavigationAbstractContainer } from 'Component/NavigationAbstract/NavigationAbstract.container';
import { BOTTOM_NAVIGATION_TYPE, TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation';
import { DEFAULT_HEADER_STATE } from 'Component/Header/Header.container';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay';
import { history as browserHistory } from 'Route';

import NavigationTabs, {
    ACCOUNT_TAB,
    CART_TAB,
    HOME_TAB,
    MENU_TAB,
    CHECKOUT_TAB
} from './NavigationTabs.component';

export const mapStateToProps = state => ({
    navigationState: state.NavigationReducer[BOTTOM_NAVIGATION_TYPE].navigationState,
    headerState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState,
    cartTotals: state.CartReducer.cartTotals
});

export const mapDispatchToProps = dispatch => ({
    showOverlay: overlayKey => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setNavigationState: stateName => dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, stateName)),
    setHeaderState: stateName => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(BOTTOM_NAVIGATION_TYPE))
});

export const DEFAULT_NAVIGATION_TABS_STATE = { name: MENU_TAB };

export class NavigationTabsContainer extends NavigationAbstractContainer {
    default_state = DEFAULT_NAVIGATION_TABS_STATE;

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

        const { name } = this.getNavigationState(location.pathname);
        this.lastSeenMenu = name === MENU_TAB ? 0 : -1;

        super.componentDidMount();
    }

    componentDidUpdate() {
        this.handleNavVisibility();
    }

    handleNavVisibility() {
        const { navigationState: { isHidden } } = this.props;

        if (isHidden) {
            document.body.classList.add('hiddenNavigationTabs');
            return;
        }

        document.body.classList.remove('hiddenNavigationTabs');
    }

    onMenuButtonClick() {
        if (this.lastSeenMenu <= 0) {
            browserHistory.push('/menu');
        } else {
            browserHistory.go(-this.lastSeenMenu);
            this.lastSeenMenu = 0;
        }
    }

    onMinicartButtonClick() {
        browserHistory.push('/cart');
    }

    onMyAccountButtonClick() {
        browserHistory.push('/my-account');
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
        const newNavigationState = this.getNavigationState(pathname);
        const { name: newName } = newNavigationState;

        console.log(newName, name);

        // Update the state if new name is set
        if (name !== newName) {
            setNavigationState(newNavigationState);
        }

        this.preserveState(name, newName);

        return { prevPathname: pathname };
    }

    onHomeButtonClick() {
        const {
            hideActiveOverlay,
            setHeaderState,
            setNavigationState
        } = this.props;

        const { pathname } = location;

        browserHistory.push('/');
        hideActiveOverlay();

        if (pathname === '/') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        if (name !== DEFAULT_HEADER_STATE) {
            setHeaderState(DEFAULT_HEADER_STATE);
            setNavigationState({ name: HOME_TAB });
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
