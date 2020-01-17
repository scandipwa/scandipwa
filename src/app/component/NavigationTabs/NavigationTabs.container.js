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
    MENU_TAB
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

export class NavigationTabsContainer extends NavigationAbstractContainer {
    default_state = { name: MENU_TAB };

    routeMap = {
        '/my-account': { name: ACCOUNT_TAB },
        '/cart': { name: CART_TAB },
        '/': { name: HOME_TAB }
    };

    containerFunctions = {
        onMenuButtonClick: this.onMenuButtonClick.bind(this),
        onMyAccountButtonClick: this.onMyAccountButtonClick.bind(this),
        onMinicartButtonClick: this.onMinicartButtonClick.bind(this),
        onHomeButtonClick: this.onHomeButtonClick.bind(this)
    };

    lastSeenMenu = 0;

    onMenuButtonClick() {
        if (this.lastSeenMenu === 0) {
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

        // Update the state if new name is set
        if (name !== newName) {
            setNavigationState(newNavigationState);
        }

        if (newName !== MENU_TAB) {
            this.lastSeenMenu++;
        }

        if (newName === MENU_TAB && name === MENU_TAB) {
            this.lastSeenMenu = 0;
        }

        // hideActiveOverlay();

        return { prevPathname: pathname };
    }

    // handleMobileRouteChange(history) {
    //     const {
    //         navigationState: { name }
    //     } = this.props;

    //     if (name === MENU_TAB) {
    //         this.lastSeenMenu = 0;
    //     } else {
    //         this.lastSeenMenu += 1;
    //     }

    //     super.handleMobileRouteChange(history);
    // }

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
